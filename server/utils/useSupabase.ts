import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  return createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY)
}
