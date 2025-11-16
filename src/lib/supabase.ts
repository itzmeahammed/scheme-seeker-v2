import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = 'https://twenyhxuvpmltqcovsot.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZW55aHh1dnBtbHRxY292c290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMDA4ODQsImV4cCI6MjA3Njc3Njg4NH0.KtEixiPoXEgYUw-xft4LA2shQKDhZ6ds3QlGe7MJmaI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const authHelpers = {
  signUp: async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  },

  verifyOtp: async (token: string, type: 'signup' | 'recovery' | 'email_change') => {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type
    })
    return { data, error }
  },

  resendVerification: async (email: string) => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email
    })
    return { data, error }
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}
