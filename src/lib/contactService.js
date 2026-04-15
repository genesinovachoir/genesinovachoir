import { supabase } from './supabaseClient';

const RATE_LIMIT_KEY = 'genesi_contact_last_submit';
const RATE_LIMIT_MS = 60_000; // 60 saniye bekleme süresi

export async function submitContactMessage({
    name,
    email,
    subject,
    message
}) {

    // --- Rate Limit (client-side) ---
    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (last && Date.now() - parseInt(last) < RATE_LIMIT_MS) {
        const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - parseInt(last))) / 1000);
        return { success: false, error: `Lütfen ${remaining} saniye bekleyin.` };
    }

    // --- Validasyon ---
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return { success: false, error: 'Missing required fields' };
    }

    if (name.trim().length > 200) {
        return { success: false, error: 'Name too long' };
    }

    if (message.trim().length > 5000) {
        return { success: false, error: 'Message too long' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
        return { success: false, error: 'Invalid email format' };
    }

    try {

        const { error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name: name.trim(),
                    email: email.trim(),
                    subject: subject?.trim() || null,
                    message: message.trim()
                }
            ]);

        if (error) {
            console.error('Contact insert error:', error);
            return { success: false, error: 'Submission failed. Please try again.' };
        }

        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
        return { success: true };

    } catch (err) {
        console.error('Unexpected contact error:', err);
        return { success: false, error: 'Unexpected error. Please try again.' };
    }
}
