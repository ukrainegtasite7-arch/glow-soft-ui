import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    discord_contact: '',
    telegram_contact: '',
    images: [] as string[]
  });

  const categories = {
    'automobiles': {
      name: 'Автомобілі',
      subcategories: [
        'sale', 'trucks', 'vinyls', 'parts', 'numbers', 'car-rental', 'truck-rental'
      ]
    },
    'clothing': {
      name: 'Одяг',
      subcategories: ['sale', 'accessories', 'backpacks']
    },
    'real-estate': {
      name: 'Нерухомість',
      subcategories: ['business', 'apartments', 'houses', 'greenhouses']
    },
    'other': {
      name: 'Інше',
      subcategories: ['misc']
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Увійдіть в акаунт для створення оголошення');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('advertisements')
        .insert([{
          user_id: user.id,
          category: formData.category,
          subcategory: formData.subcategory,
          title: formData.title,
          description: formData.description,
          discord_contact: formData.discord_contact,
          telegram_contact: formData.telegram_contact,
          images: formData.images,
          is_vip: user.role === 'vip'
        }]);

      if (error) throw error;

      toast.success('Оголошення створено успішно!');
      navigate('/');
    } catch (error) {
      toast.error('Помилка при створенні оголошення');
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
              className="mb-6"
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
                  <Label htmlFor="category">Категорія</Label>
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
                  <Label htmlFor="subcategory">Підкатегорія</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                    disabled={!formData.category}
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Оберіть підкатегорію" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category && categories[formData.category]?.subcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Назва оголошення</Label>
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
                <Label htmlFor="description">Опис оголошення</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-2xl min-h-32"
                  placeholder="Детальний опис вашого оголошення"
                  required
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

              <div className="space-y-2">
                <Label>Фото (до 10 штук)</Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Перетягніть фото сюди або натисніть для вибору</p>
                  <p className="text-sm text-muted-foreground mt-2">Максимум 10 фото</p>
                </div>
              </div>

              {user.role === 'vip' && (
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
                  <p className="text-accent font-medium">
                    🌟 VIP статус активний! Ваше оголошення буде виділено та показано зверху.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full btn-accent rounded-2xl"
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