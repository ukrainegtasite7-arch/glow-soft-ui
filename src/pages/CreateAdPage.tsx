import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const CreateAdPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([]);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    discord_contact: '',
    telegram_contact: '',
    price: ''
  });

  const categories = {
    'automobiles': {
      name: 'Автомобілі',
      subcategories: [
        { value: 'sale', name: 'Продаж Автомобілі' },
        { value: 'trucks', name: 'Продаж вантажівок' },
        { value: 'vinyls', name: 'Продаж Вініли' },
        { value: 'parts', name: 'Продаж Деталі' },
        { value: 'numbers', name: 'Продаж Номера' },
        { value: 'car-rental', name: 'Оренда автомобіля' },
        { value: 'truck-rental', name: 'Оренда вантажівок' }
      ]
    },
    'clothing': {
      name: 'Одяг',
      subcategories: [
        { value: 'sale', name: 'Продаж одягу' },
        { value: 'accessories', name: 'Продаж аксесуарів' },
        { value: 'backpacks', name: 'Продаж рюкзаків' }
      ]
    },
    'real-estate': {
      name: 'Нерухомість',
      subcategories: [
        { value: 'business', name: 'Продаж бізнесу' },
        { value: 'apartments', name: 'Продаж квартир' },
        { value: 'houses', name: 'Продаж приватних будинків' },
        { value: 'greenhouses', name: 'Оренда теплиць' }
      ]
    },
    'other': {
      name: 'Інше',
      subcategories: [
        { value: 'misc', name: 'Різне' }
      ]
    }
  };

  const handleFileUpload = async (file: File) => {
    if (images.length >= 10) {
      toast.error('Максимум 10 зображень');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Можна завантажувати лише зображення');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Розмір файлу не повинен перевищувати 5MB');
      return;
    }

    const newUploadingImages = [...uploadingImages];
    newUploadingImages.push(true);
    setUploadingImages(newUploadingImages);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('advertisement-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('advertisement-images')
        .getPublicUrl(fileName);

      setImages([...images, publicUrl]);
      toast.success('Зображення завантажено успішно!');
    } catch (error: any) {
      toast.error('Помилка завантаження: ' + error.message);
    } finally {
      const newUploadingImages = [...uploadingImages];
      newUploadingImages.pop();
      setUploadingImages(newUploadingImages);
    }
  };

  const handleImageAdd = () => {
    if (images.length < 10) {
      const imageUrl = prompt('Введіть URL зображення:');
      if (imageUrl && imageUrl.trim()) {
        setImages([...images, imageUrl.trim()]);
      }
    } else {
      toast.error('Максимум 10 зображень');
    }
  };

  const handleImageRemove = async (index: number) => {
    const imageUrl = images[index];
    // If it's a Supabase storage URL, try to delete it
    if (imageUrl.includes('supabase.co/storage')) {
      try {
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        await supabase.storage
          .from('advertisement-images')
          .remove([fileName]);
      } catch (error) {
        console.warn('Failed to delete image from storage:', error);
      }
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Увійдіть в акаунт для створення оголошення');
      return;
    }

    if (!formData.category || !formData.subcategory || !formData.title || !formData.description) {
      toast.error('Заповніть всі обов\'язкові поля');
      return;
    }

    if (!formData.discord_contact && !formData.telegram_contact) {
      toast.error('Вкажіть хоча б один контакт (Discord або Telegram)');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('create_advertisement', {
        p_user_id: user.id,
        p_category: formData.category,
        p_subcategory: formData.subcategory,
        p_title: formData.title,
        p_description: formData.description,
        p_images: images,
        p_discord: formData.discord_contact || null,
        p_telegram: formData.telegram_contact || null,
        p_is_vip: user.role === 'vip' || user.role === 'admin' || user.role === 'moderator',
        p_price: formData.price ? parseFloat(formData.price) : null
      });

      if (error) throw error;

      toast.success('Оголошення створено успішно!');
      navigate('/');
    } catch (error: any) {
      toast.error('Помилка при створенні оголошення: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Увійдіть в акаунт</h1>
          <p className="text-muted-foreground">Для створення оголошення потрібно увійти в акаунт</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>

            <h1 className="text-3xl font-bold mb-8">
              Створити <span className="bg-gradient-primary bg-clip-text text-transparent">оголошення</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Категорія *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Оберіть категорію" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categories).map(([key, cat]) => (
                        <SelectItem key={key} value={key}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Підкатегорія *</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                    disabled={!formData.category}
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Оберіть підкатегорію" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category && categories[formData.category as keyof typeof categories]?.subcategories.map((sub) => (
                        <SelectItem key={sub.value} value={sub.value}>{sub.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">Ваш нікнейм</Label>
                <Input
                  value={user.nickname}
                  disabled
                  className="rounded-2xl bg-muted"
                />
                {user.role === 'vip' && (
                  <p className="text-sm text-accent">⭐ VIP статус - ваше оголошення буде виділено</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Назва оголошення *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="rounded-2xl"
                  placeholder="Введіть назву оголошення"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Опис оголошення *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-2xl min-h-32"
                  placeholder="Детальний опис вашого оголошення"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Ціна (грн)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="rounded-2xl"
                  placeholder="Вкажіть ціну (необов'язково)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="discord">Discord контакт</Label>
                  <Input
                    id="discord"
                    value={formData.discord_contact}
                    onChange={(e) => setFormData({ ...formData, discord_contact: e.target.value })}
                    className="rounded-2xl"
                    placeholder="username#1234"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram контакт</Label>
                  <Input
                    id="telegram"
                    value={formData.telegram_contact}
                    onChange={(e) => setFormData({ ...formData, telegram_contact: e.target.value })}
                    className="rounded-2xl"
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Зображення (до 10 штук)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Зображення ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl border"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150x100?text=Помилка';
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleImageRemove(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {/* Loading placeholders for uploading images */}
                  {uploadingImages.map((_, index) => (
                    <div key={`uploading-${index}`} className="relative">
                      <div className="w-full h-24 bg-muted rounded-xl border animate-pulse flex items-center justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground animate-spin" />
                      </div>
                    </div>
                  ))}
                  
                  {(images.length + uploadingImages.length) < 10 && (
                    <>
                      {/* File upload button */}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file);
                              e.target.value = '';
                            }
                          }}
                        />
                        <div className="h-24 rounded-xl border-dashed border-2 border-border hover:border-accent flex flex-col items-center justify-center hover:scale-105 transition-transform bg-background hover:bg-muted">
                          <Upload className="w-5 h-5 mb-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Завантажити</span>
                        </div>
                      </label>
                      
                      {/* URL input button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="h-24 rounded-xl border-dashed hover:scale-105 transition-transform flex flex-col"
                        onClick={handleImageAdd}
                      >
                        <Plus className="w-5 h-5 mb-1" />
                        <span className="text-xs">URL</span>
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Завантажте зображення з комп'ютера або введіть URL. Максимальний розмір файлу: 5MB
                </p>
              </div>

              <Button
                type="submit"
                className="w-full btn-accent rounded-2xl hover:scale-105 transition-transform"
                disabled={loading}
              >
                {loading ? 'Створення...' : 'Створити оголошення'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateAdPage;