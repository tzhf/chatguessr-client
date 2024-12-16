export const useSupabase = () => {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase

  if (!supabase) {
    throw new Error('Supabase client not initialized. Make sure the plugin is properly set up.')
  }

  return supabase
}

// Old logic, using a plugin prevents "Multiple GoTrueClient instances detected in the same browser context" error
// import { createClient } from '@supabase/supabase-js'

// export const useSupabase = () => {
//   const config = useRuntimeConfig()
//   return createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
// }
