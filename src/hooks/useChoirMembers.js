import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const VOICE_GROUP_ORDER = ['Soprano', 'Alto', 'Tenor', 'Bass'];

export function useChoirMembers() {
    const [conductor, setConductor] = useState(null);
    const [membersByVoice, setMembersByVoice] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMembers() {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('choir_members')
                .select(`
                    id,
                    first_name,
                    last_name,
                    voice_group,
                    photo_url,
                    instagram_url,
                    linkedin_url,
                    youtube_url,
                    spotify_url,
                    tiktok_url,
                    x_url,
                    join_date,
                    choir_member_roles (
                        roles ( name )
                    )
                `)
                .eq('is_active', true)
                .order('first_name');
            let currentData = data || [];

            if (fetchError) {
                console.warn(fetchError.message);
                // Mock veriyi geçici olarak ekliyoruz ki Supabase kapalıyken şefi görebilelim.
                currentData = [{
                    id: 'conductor-mock',
                    first_name: 'Abdurrahim',
                    last_name: 'Pekacar',
                    photo_url: 'abdurrahim-pekacar', // Manifest.json'daki id ile eşleşmeli
                    instagram_url: '',
                    choir_member_roles: [{ roles: { name: 'Şef' } }]
                }];
            }

            const conductorMember = currentData.find(m =>
                m.choir_member_roles?.some(r => r.roles?.name === 'Şef')
            ) || null;

            const regularMembers = currentData.filter(m => m !== conductorMember);

            const grouped = VOICE_GROUP_ORDER.reduce((acc, group) => {
                const groupMembers = regularMembers.filter(m => m.voice_group === group);
                if (groupMembers.length > 0) acc[group] = groupMembers;
                return acc;
            }, {});

            setConductor(conductorMember);
            setMembersByVoice(grouped);
            setLoading(false);
        }

        fetchMembers();
    }, []);

    return { conductor, membersByVoice, loading, error };
}
