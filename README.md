# Genesi Nova Korosu

🎶 **[www.genesinovachoir.com](https://www.genesinovachoir.com/)** adresinden web sitemizi ziyaret edebilirsiniz!

## 🎵 Hakkında

Çocukluğumdan beri müziğin içindeyim ve çok sesli koro faaliyetlerinde bulunuyorum. **Genesi Nova**, bu tutkumu dijital dünyaya taşıdığım ve kendi koromuz için özel olarak geliştirdiğim bir platformdur. Sitemiz, koromuzun vizyonunu yansıtmak, etkinliklerimizi duyurmak ve müzikal yolculuğumuzu (dinletiler, podcastler vb.) müzikseverlerle paylaşmak için tasarlandı. 

Modern, şık ve animasyonlu bir arayüz ile ziyaretçilere sadece bilgi değil, aynı zamanda görsel ve işitsel bir deneyim sunmayı hedefliyoruz.

## 🚀 Kullanılan Teknolojiler

Bu proje, modern web geliştirme standartlarına uygun olarak inşa edilmiştir ve güvenilir bir altyapı kullanılarak barındırılmaktadır.

*   **Frontend:**
    *   **React (Vite):** Hızlı derleme süreleri ve optimize edilmiş bir SPA (Single Page Application) deneyimi için.
    *   **Tailwind CSS:** Kapsamlı ve duyarlı (responsive) tasarım gereksinimleri için yardımcı (utility-first) sınıflar.
    *   **Framer Motion:** Akıcı sayfa geçişleri ve etkileşimli kullanıcı arayüzü animasyonları için.
    *   **React Router DOM:** Sayfalar arası dinamik istemci tarafı (client-side) yönlendirme için.
    *   **Lucide React:** Modern ikon seti entegrasyonu için.

*   **Backend & Veritabanı:**
    *   **Supabase:** PostgreSQL tabanlı, açık kaynaklı Backend-as-a-Service çözümü. Gerçek zamanlı veritabanı, kimlik doğrulama (Auth) ve dosya depolama (Storage) hizmetleri için kullanılmaktadır.

*   **Hosting & CI/CD:**
    *   **Hostinger:** Web sitesinin güvenilir ve hızlı bir şekilde yayınlanması için kullanılan barındırma platformu.

## ⚙️ Sistem Nasıl Çalışıyor? (Otomasyon ve İletişim)

Web sitemiz sadece statik bir tanıtım sayfası değil, aynı zamanda dinamik bir sistem üzerinde çalışmaktadır:

1.  **Dinamik İçerik Yönetimi:** Koromuzun podcast yayınları, ses kayıtları ve konser takvimi gibi içerikleri modern arayüz üzerinden düzenli olarak sunulmaktadır.
2.  **Otomatize İletişim Akışı:** Ziyaretçilerin "Bize Ulaşın" veya benzeri formlar üzerinden gönderdikleri mesajlar **Supabase** veritabanına kaydedilir.
3.  **Sistem Entegrasyonu:** Supabase veritabanı ve **Hostinger** altyapısı sayesinde kayıt altına alınan bu mesajlar ve bildirimler otomatize bir şekilde işlenir; böylece koro yönetimine veya ilgili kişilere hızlı ve kesintisiz bilgi akışı sağlanır.

## 🔒 Güvenlik ve Veri Gizliliği

Bu proje yapılandırılırken **veri güvenliği** birinci öncelik olarak ele alınmıştır.

*   **Veri Sızıntısı (Data Leak) Yok:** Proje kodlarında herhangi bir veritabanı şifresi, API anahtarı veya servis token'ı **kesinlikle bulunmamaktadır** (hardcoded olarak yazılmamıştır).
*   **Çevre Değişkenleri:** Supabase bağlantıları ve diğer tüm hassas ayarlar (örn. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) sadece `.env` (Environment Variables) dosyaları üzerinden yönetilir. 
*   **Git Konfigürasyonu:** Hassas verileri içeren `.env` dosyaları `.gitignore` aracılığıyla kontrol altında tutulmakta olup GitHub gibi platformlara sızması engellenmiştir. Supabase "Row Level Security (RLS)" (Satır Seviyesi Güvenlik) politikaları ile veritabanı erişimleri hem oturum açmış kullanıcılar hem de anonim ziyaretçiler için sıkı şekilde sınırlandırılmıştır.

## 💻 Kurulum (Geliştiriciler İçin)

Eğer projeyi yerel bilgisayarınızda çalıştırmak isterseniz aşağıdaki adımları izleyebilirsiniz:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/genesinovachoir/genovasite.git
    cd genovasite
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Çevre Değişkenlerini Ayarlayın:**
    *   Kök dizinde `.env` adında bir dosya oluşturun.
    *   Supabase panelinizden aldığınız bilgileri bu dosyaya ekleyin:
    ```env
    VITE_SUPABASE_URL=sizin_supabase_url_adresiniz
    VITE_SUPABASE_ANON_KEY=sizin_supabase_anon_anahtarınız
    ```

4.  **Uygulamayı Çalıştırın:**
    ```bash
    npm run dev
    ```
    Tarayıcınızda `http://localhost:xxxx` adresine giderek siteyi görüntüleyebilirsiniz.

---
*Müzikle ve sevgiyle kalın!* 🎵
