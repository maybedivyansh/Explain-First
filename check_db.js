const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkColumn() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log('Checking for audio_url column...');
    const { data, error } = await supabase
        .from('documents')
        .select('audio_url')
        .limit(1);

    if (error) {
        console.error('Error:', error.message);
        if (error.code === 'PGRST204') { // Column not found error code (often)
            console.log('Column likely missing.');
        }
    } else {
        console.log('Column exists! Data:', data);
    }
}

checkColumn();
