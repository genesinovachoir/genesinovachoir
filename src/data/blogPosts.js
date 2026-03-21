import manifest from '../lib/media/manifest.json';

const choirImg = manifest['choir-hero'];
const podcastImg = manifest['podcast-hero'];
const blogSmall = manifest['blog-hero'];

/**
 * Blog posts with bilingual content and SEO slugs.
 * Slug is language-independent (same in both TR and EN).
 */
export const POSTS = [
    {
        id: 1,
        slug: 'echoes-from-the-past-the-making-of-our-new-album',
        title: "Echoes from the Past: The Making of Our New Album",
        titleTr: "Geçmişten Yankılar: Yeni Albümümüzün Hazırlığı",
        excerpt: "Journey with us as we explore the ancient acoustics that inspired our latest collection of polyphonic arrangements.",
        excerptTr: "Yeni polifonik aranjman koleksiyonumuza ilham veren kadim akustikleri birlikte keşfedelim.",
        category: "Behind the Scenes",
        categoryTr: "Sahne Arkası",
        image: choirImg,
        date: "Dec 15, 2024",
        dateTr: "15 Ara 2024",
        readTime: "5 min read",
        readTimeTr: "5 dk okuma",
        author: {
            name: "Sarah Jenkins",
            initials: "SJ",
            avatarColor: "#a89080",
            instagram: "https://instagram.com/sarahjenkins",
            twitter: "https://twitter.com/sarahjenkins"
        },
        content: `<p>When we first stepped inside the ancient chapel in Cappadocia, the air itself seemed to hum with centuries of devotion. The natural reverb — a product of volcanic rock carved by wind and water over millennia — gave every whisper a cathedral-like grandeur.</p>
<p>This was the beginning of our journey into sonic archaeology. We spent three weeks recording in underground cities, Byzantine churches, and natural caves, capturing impulse responses that would later shape our album's unique soundscape.</p>
<p>The process was both scientific and deeply spiritual. We used measurement microphones alongside our voices, singing ancient hymns in spaces where similar melodies had resonated for over a thousand years.</p>`,
        contentTr: `<p>Kapadokya'daki kadim şapele ilk adım attığımızda, havanın kendisi yüzyıllık bir adanmışlıkla uğulduyor gibiydi. Rüzgâr ve suyun binlerce yıl boyunca oyduğu volkanik kayaların yarattığı doğal yankılanma, her fısıltıya katedral benzeri bir ihtişam katıyordu.</p>
<p>Bu, sonik arkeoloji yolculuğumuzun başlangıcıydı. Üç hafta boyunca yeraltı şehirlerinde, Bizans kiliselerinde ve doğal mağaralarda kayıt yaptık; albümümüzün benzersiz ses manzarasını şekillendirecek impuls yanıtlarını yakaladık.</p>
<p>Süreç hem bilimsel hem de derinden ruhani idi. Ölçüm mikrofonlarını seslerimizle birlikte kullandık, benzer melodilerin bin yılı aşkın süredir yankılandığı mekânlarda kadim ilahiler söyledik.</p>`,
        metaDescription: "Journey into sonic archaeology — exploring ancient acoustics that inspired Genesi Nova's polyphonic arrangements.",
        metaDescriptionTr: "Sonik arkeoloji yolculuğu — Genesi Nova'nın polifonik aranjmanlarına ilham veren kadim akustiklerin keşfi."
    },
    {
        id: 2,
        slug: 'the-science-of-harmony-why-we-love-chords',
        title: "The Science of Harmony: Why We Love Chords",
        titleTr: "Armoni Bilimi: Akorları Neden Seviyoruz?",
        excerpt: "A deep dive into the psychoacoustics of harmony and why certain chord progressions trigger such powerful emotional responses.",
        excerptTr: "Armoninin psikoakustiğine ve belirli akor ilerlemelerinin neden bu kadar güçlü duygusal tepkiler yarattığına derin bir bakış.",
        category: "Music Theory",
        categoryTr: "Müzik Teorisi",
        image: podcastImg,
        date: "Dec 02, 2024",
        dateTr: "02 Ara 2024",
        readTime: "8 min read",
        readTimeTr: "8 dk okuma",
        author: {
            name: "Dr. Alan Grant",
            initials: "AG",
            avatarColor: "#8a9ba8",
            instagram: "https://instagram.com/alangrant",
            twitter: "https://twitter.com/alangrant"
        },
        content: `<p>Why does a major seventh chord feel like a sunset, while a diminished chord sends a chill down your spine? The answer lies in the fascinating intersection of physics, biology, and culture.</p>
<p>Our auditory cortex processes harmonic relationships mathematically. When two notes share simple frequency ratios — like the perfect fifth (3:2) — our brains register consonance. More complex ratios create tension, dissonance, and the urge for resolution.</p>
<p>But there's more to it than pure mathematics. Cultural conditioning plays an enormous role. What sounds "sad" in Western music might evoke completely different emotions in Middle Eastern or East Asian traditions.</p>`,
        contentTr: `<p>Majör yedili bir akor neden gün batımı gibi hissettirir, küçültülmüş bir akor ise sırtınızdan aşağı bir ürperti gönderir? Cevap, fiziğin, biyolojinin ve kültürün büyüleyici kesişiminde yatıyor.</p>
<p>İşitsel korteksimiz armonik ilişkileri matematiksel olarak işler. İki nota basit frekans oranlarını paylaştığında — tam beşli (3:2) gibi — beynimiz konsonans algılar. Daha karmaşık oranlar gerilim, disonans ve çözülme ihtiyacı yaratır.</p>
<p>Ama mesele saf matematikten ibaret değil. Kültürel koşullanma muazzam bir rol oynar. Batı müziğinde "hüzünlü" olan bir ses, Orta Doğu veya Doğu Asya geleneklerinde tamamen farklı duygular uyandırabilir.</p>`,
        metaDescription: "A deep dive into the psychoacoustics of harmony — why certain chords trigger powerful emotional responses.",
        metaDescriptionTr: "Armoninin psikoakustiğine derin bir bakış — belirli akorların neden güçlü duygusal tepkiler yarattığı."
    },
    {
        id: 3,
        slug: 'vocal-health-101-for-touring-choirs',
        title: "Vocal Health 101 for Touring Choirs",
        titleTr: "Turne Yapan Korolar İçin Ses Sağlığı Rehberi",
        excerpt: "Essential tips and warm-up routines that keep our voices crystal clear during our intense touring schedule.",
        excerptTr: "Yoğun turne programımız boyunca seslerimizi kristal berraklığında tutan temel ipuçları ve ısınma rutinleri.",
        category: "Education",
        categoryTr: "Eğitim",
        image: blogSmall,
        date: "Nov 28, 2024",
        dateTr: "28 Kas 2024",
        readTime: "4 min read",
        readTimeTr: "4 dk okuma",
        author: {
            name: "Elena Fisher",
            initials: "EF",
            avatarColor: "#b4a89a",
            instagram: "https://instagram.com/elenafisher",
            twitter: "https://twitter.com/elenafisher"
        },
        content: `<p>Touring is thrilling but brutal on the voice. After years of performing across Europe and Turkey, our choir has developed a battle-tested vocal health protocol that we swear by.</p>
<p>Hydration is non-negotiable. We carry steam inhalers on every bus ride and maintain a strict "no whispering" policy — whispering actually strains your vocal cords more than normal speech.</p>
<p>Our warm-up routine begins 90 minutes before every performance: lip trills, sirens, resonance exercises, and finally, gentle ensemble tuning that doubles as a meditation.</p>`,
        contentTr: `<p>Turne heyecan verici ama ses için zorlu. Avrupa ve Türkiye genelinde yıllarca performans sergiledikten sonra, koromuz her koşulda işe yarayan bir ses sağlığı protokolü geliştirdi.</p>
<p>Hidrasyon tartışmasız. Her otobüs yolculuğunda buhar inhaler taşıyoruz ve katı bir "fısıldama yasağı" uyguluyoruz — fısıldamak ses tellerinizi normal konuşmadan daha fazla zorlar.</p>
<p>Isınma rutinimiz her performanstan 90 dakika önce başlar: dudak trilleri, sirenler, rezonans egzersizleri ve son olarak bir meditasyon görevi gören nazik topluluk akort çalışması.</p>`,
        metaDescription: "Essential vocal health tips and warm-up routines for touring choirs — a guide by Genesi Nova.",
        metaDescriptionTr: "Turne yapan korolar için temel ses sağlığı ipuçları ve ısınma rutinleri — Genesi Nova rehberi."
    },
    {
        id: 4,
        slug: 'interview-the-future-of-choral-music',
        title: "Interview: The Future of Choral Music",
        titleTr: "Röportaj: Koro Müziğinin Geleceği",
        excerpt: "We sat down with contemporary composer Eric Whitacre to discuss where choral music is heading in the digital age.",
        excerptTr: "Çağdaş besteci Eric Whitacre ile koro müziğinin dijital çağda nereye gittiğini konuştuk.",
        category: "Interviews",
        categoryTr: "Röportajlar",
        image: choirImg,
        date: "Nov 15, 2024",
        dateTr: "15 Kas 2024",
        readTime: "12 min read",
        readTimeTr: "12 dk okuma",
        author: {
            name: "Genesi Team",
            initials: "GT",
            avatarColor: "#9a8a7a",
            instagram: "https://instagram.com/genesinovachoir",
            twitter: "https://twitter.com/genesinovachoir"
        },
        content: `<p>"The future of choral music is not about perfection — it's about connection," says Eric Whitacre, the Grammy-winning composer who has redefined what a choir can be in the 21st century.</p>
<p>When we sat down with Whitacre in his London studio, his Virtual Choir project had just surpassed 25,000 individual voice submissions from over 120 countries. The conversation ranged from AI-assisted composition to the irreplaceable intimacy of live ensemble singing.</p>
<p>"Technology is a tool, not a replacement," he emphasizes. "A choir standing shoulder to shoulder, breathing together, tuning to each other's overtones — that's something no algorithm can replicate."</p>`,
        contentTr: `<p>"Koro müziğinin geleceği mükemmeliyetçilik değil, bağlantı üzerine kurulu," diyen Eric Whitacre, 21. yüzyılda koronun ne olabileceğini yeniden tanımlayan Grammy ödüllü bir bestecidir.</p>
<p>Whitacre ile Londra stüdyosunda bir araya geldiğimizde, Sanal Koro projesi 120'den fazla ülkeden 25.000'den fazla bireysel ses kaydını aşmıştı. Sohbet, yapay zekâ destekli besteden canlı topluluk şarkısının vazgeçilmez samimiyetine kadar uzandı.</p>
<p>"Teknoloji bir araçtır, ikame değil," diye vurgular. "Omuz omuza duran, birlikte nefes alan, birbirlerinin üst tonlarına akort olan bir koro — bunu hiçbir algoritma taklit edemez."</p>`,
        metaDescription: "A conversation with Eric Whitacre on the future of choral music, virtual choirs, and the irreplaceable power of live singing.",
        metaDescriptionTr: "Eric Whitacre ile koro müziğinin geleceği, sanal korolar ve canlı şarkının yeri doldurulamaz gücü üzerine bir sohbet."
    }
];

/**
 * Get a post by its slug
 */
export const getPostBySlug = (slug) => POSTS.find((p) => p.slug === slug);

/**
 * Get localized post fields based on language
 */
export const getLocalizedPost = (post, lang) => {
    if (!post) return null;
    const isTr = lang === 'tr';
    return {
        ...post,
        localTitle: isTr ? post.titleTr : post.title,
        localExcerpt: isTr ? post.excerptTr : post.excerpt,
        localCategory: isTr ? post.categoryTr : post.category,
        localDate: isTr ? post.dateTr : post.date,
        localReadTime: isTr ? post.readTimeTr : post.readTime,
        localContent: isTr ? post.contentTr : post.content,
        localMetaDescription: isTr ? post.metaDescriptionTr : post.metaDescription,
    };
};
