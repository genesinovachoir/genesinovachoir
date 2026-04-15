import { supabase } from './supabaseClient';

const RATE_LIMIT_KEY = 'genesi_subscribe_last_submit';
const RATE_LIMIT_MS = 30_000; // 30 saniye bekleme süresi

export async function subscribeUser({ email, name = null, source }) {

    // --- Rate Limit (client-side) ---
    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (last && Date.now() - parseInt(last) < RATE_LIMIT_MS) {
        return { success: false, error: 'Too many requests. Please wait.' };
    }

    // --- Validasyon ---
    if (!email) {
        return { success: false, error: 'Email required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
        return { success: false, error: 'Invalid email format' };
    }

    if (name && name.trim().length > 200) {
        return { success: false, error: 'Name too long' };
    }

    try {

        const { error } = await supabase
            .from('subscribers')
            .insert([
                {
                    email: email.trim(),
                    name: name?.trim() || null,
                    source
                }
            ]);

        if (error && error.code !== '23505') {
            console.error('Subscriber insert error:', error);
            return { success: false, error: 'Subscription failed. Please try again.' };
        }

        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
        return { success: true };

    } catch (err) {

        console.error('Unexpected subscriber error:', err);
        return { success: false, error: 'Unexpected error. Please try again.' };
    }
}
