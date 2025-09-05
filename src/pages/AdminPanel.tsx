import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Ban, Shield, Crown, Trash2, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { hasPermission } from '@/lib/auth';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !hasPermission(user, ['admin', 'moderator'])) {
      navigate('/');
      return;
    }
    
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch users
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Fetch advertisements
      const { data: adsData } = await supabase
        .from('advertisements')
        .select(`
          *,
          users (nickname, role)
        `)
        .order('created_at', { ascending: false });

      // Fetch logs (admin only)
      if (user?.role === 'admin') {
        const { data: logsData } = await supabase
          .from('admin_logs')
          .select(`
            *,
            users!admin_logs_admin_id_fkey (nickname),
            target_user:users!admin_logs_target_user_id_fkey (nickname)
          `)
          .order('created_at', { ascending: false });
        
        setLogs(logsData || []);
      }

      setUsers(usersData || []);
      setAdvertisements(adsData || []);
    } catch (error) {
      toast.error('Помилка завантаження даних');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (targetUserId: string, action: string, newRole?: string) => {
    try {
      let updateData = {};
      
      if (action === 'ban') {
        updateData = { is_banned: true };
      } else if (action === 'unban') {
        updateData = { is_banned: false };
      } else if (action === 'role' && newRole) {
        updateData = { role: newRole };
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', targetUserId);

      if (error) throw error;

      // Log the action
      await supabase
        .from('admin_logs')
        .insert([{
          admin_id: user.id,
          action: `${action}${newRole ? `_${newRole}` : ''}`,
          target_user_id: targetUserId,
          details: { action, newRole }
        }]);

      toast.success('Дію виконано успішно');
      fetchData();
    } catch (error) {
      toast.error('Помилка виконання дії');
    }
  };

  const handleDeleteAd = async (adId: string) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .delete()
        .eq('id', adId);

      if (error) throw error;

      // Log the action
      await supabase
        .from('admin_logs')
        .insert([{
          admin_id: user.id,
          action: 'delete_advertisement',
          details: { advertisement_id: adId }
        }]);

      toast.success('Оголошення видалено');
      fetchData();
    } catch (error) {
      toast.error('Помилка видалення оголошення');
    }
  };

  const filteredAds = advertisements.filter(ad =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || !hasPermission(user, ['admin', 'moderator'])) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Доступ заборонено</h1>
          <p className="text-muted-foreground">У вас немає прав для доступу до адмін панелі</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
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
              Адмін <span className="bg-gradient-primary bg-clip-text text-transparent">панель</span>
            </h1>

            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Користувачі</TabsTrigger>
                <TabsTrigger value="ads">Оголошення</TabsTrigger>
                <TabsTrigger value="stats">Статистика</TabsTrigger>
                {user.role === 'admin' && <TabsTrigger value="logs">Логи</TabsTrigger>}
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Управління користувачами</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((targetUser) => (
                        <div key={targetUser.id} className="flex items-center justify-between p-4 border rounded-2xl">
                          <div>
                            <p className="font-medium">{targetUser.nickname}</p>
                            <p className="text-sm text-muted-foreground">
                              Роль: {targetUser.role} | 
                              Статус: {targetUser.is_banned ? 'Заблокований' : 'Активний'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {user.role === 'admin' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUserAction(targetUser.id, 'role', 'vip')}
                                  disabled={targetUser.role === 'vip'}
                                >
                                  <Crown className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUserAction(targetUser.id, 'role', 'moderator')}
                                  disabled={targetUser.role === 'moderator' || targetUser.role === 'admin'}
                                >
                                  <Shield className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant={targetUser.is_banned ? "default" : "destructive"}
                              onClick={() => handleUserAction(
                                targetUser.id, 
                                targetUser.is_banned ? 'unban' : 'ban'
                              )}
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ads" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Управління оголошеннями</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Пошук оголошень..."
                        className="pl-10 rounded-2xl"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredAds.map((ad) => (
                        <div key={ad.id} className="flex items-center justify-between p-4 border rounded-2xl">
                          <div className="flex-1">
                            <p className="font-medium">{ad.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Автор: {ad.users?.nickname} | 
                              Категорія: {ad.category}/{ad.subcategory}
                              {ad.is_vip && <span className="ml-2 text-accent">⭐ VIP</span>}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {ad.description.substring(0, 100)}...
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {/* TODO: View ad details */}}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteAd(ad.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Користувачі</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{users.length}</p>
                      <p className="text-sm text-muted-foreground">Всього користувачів</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Оголошення</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{advertisements.length}</p>
                      <p className="text-sm text-muted-foreground">Всього оголошень</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>VIP користувачі</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {users.filter(u => u.role === 'vip').length}
                      </p>
                      <p className="text-sm text-muted-foreground">VIP статус</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {user.role === 'admin' && (
                <TabsContent value="logs" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Логи дій</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {logs.map((log) => (
                          <div key={log.id} className="p-4 border rounded-2xl">
                            <p className="font-medium">
                              {log.users?.nickname} виконав дію: {log.action}
                            </p>
                            {log.target_user && (
                              <p className="text-sm text-muted-foreground">
                                Цільовий користувач: {log.target_user.nickname}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {new Date(log.created_at).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPanel;