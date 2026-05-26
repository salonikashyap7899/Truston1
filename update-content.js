import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateContent() {
  // First, try to update
  const { data: updateData, error: updateError } = await supabase
    .from('site_content')
    .update({
      data: {
        eyebrow: "TRUSTON",
        title: "TRUSTON",
        title_accent: "",
        subtitle: "Build Your Legacy",
        image_url: "",
        video_url: ""
      }
    })
    .eq('key', 'home.hero')
    .select();

  if (updateError && updateError.message.includes('not found')) {
    // If table doesn't exist, insert instead
    const { data: insertData, error: insertError } = await supabase
      .from('site_content')
      .insert({
        key: 'home.hero',
        label: 'Home — Hero',
        data: {
          eyebrow: "TRUSTON",
          title: "TRUSTON",
          title_accent: "",
          subtitle: "Build Your Legacy",
          image_url: "",
          video_url: ""
        }
      })
      .select();
    
    if (insertError) {
      console.error('Insert error:', insertError);
    } else {
      console.log('Inserted:', insertData);
    }
  } else if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('Updated:', updateData);
  }
}

updateContent().catch(console.error);
