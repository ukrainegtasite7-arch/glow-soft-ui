import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  nickname: string;
  role: 'user' | 'vip' | 'moderator' | 'admin';
  is_banned: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Register user
export const registerUser = async (nickname: string, password: string) => {
  try {
    const passwordHash = await hashPassword(password);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          nickname,
          password_hash: passwordHash,
          role: 'user'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    // Set session
    localStorage.setItem('skoropad_user', JSON.stringify(data));
    return { user: data, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Login user
export const loginUser = async (nickname: string, password: string) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', nickname)
      .single();

    if (error) throw new Error('Користувача не знайдено');
    
    if (user.is_banned) {
      throw new Error('Ваш акаунт заблоковано');
    }

    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Невірний пароль');
    }

    // Set session
    localStorage.setItem('skoropad_user', JSON.stringify(user));
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('skoropad_user');
};

// Get current user
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('skoropad_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Check if user has permission
export const hasPermission = (user: User | null, requiredRole: string[]): boolean => {
  if (!user || user.is_banned) return false;
  return requiredRole.includes(user.role);
};