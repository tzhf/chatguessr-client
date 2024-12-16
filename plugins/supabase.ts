import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const client = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)

  return {
    provide: {
      supabase: client,
    },
  }
})
