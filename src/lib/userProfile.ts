import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

/**
 * Get user profile by user ID
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return { error };
  }
};

/**
 * Create user profile (usually called by trigger, but can be used manually)
 */
export const createUserProfile = async (
  userId: string,
  email: string,
  fullName?: string
): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        email,
        full_name: fullName || null,
        role: 'user',
      });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    return { error };
  }
};

/**
 * Check if user is admin
 */
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const profile = await getUserProfile(userId);
    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

