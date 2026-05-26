import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co'

const supabaseKey = 'PASTE_YOUR_PUBLISHABLE_KEY'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

export async function fetchDentistsByCity(city) {

  const { data, error } = await supabase
    .from('dentists')
    .select('*')
    .eq('city', city)
    .order('rating', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}
