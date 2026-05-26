import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateHeroContent() {
  const { data, error } = await supabase
    .from('site_content')
    .update({
      data: {
        eyebrow: "TRUSTON",
        title: "TRUSTON",
        title_accent: "",
        subtitle: "Build Your Legacy"
      }
    })
    .eq('key', 'home.hero')
    .select();

  if (error) {
    console.error('Error updating:', error);
  } else {
    console.log('Updated successfully:', data);
  }
}

updateHeroContent();
