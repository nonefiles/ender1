export interface Project {
  id: number;
  name: string;
  description: string;
  details: string;
  category: string;
  location: string;
  beneficiaries: string;
  status: string;
  startDate: string;
  endDate?: string;
  tags: string[];
  progress: number;
  partners?: string[];
  participants?: string;
  applicationCount?: number;
  imageUrl?: string;
}

export const stkProjects: Project[] = [
  {
    id: 1,
    name: 'Volunteering teams as a tool to support Inclusion eğitimi / European Shapers Alliance for Tomorrow',
    description: 'Gençlerin aktif vatandaşlık, liderlik ve Avrupa değerleri üzerine farkındalık kazandığı dolu dolu bir hafta geride kaldı! Türkiye Ulusal Ajansı tarafından fonlanan ve Erasmus+ programı kapsamında gerçekleştirilen bu proje, Avrupa\'nın farklı ülkelerinden gelen gençleri bir araya getirerek kültürlerarası diyalogu ve ortak gelecek vizyonunu güçlendirmeyi hedefledi.',
    details: 'Sözleşme No: 2024-1-TR01-KA151-YOU-000224504',
    category: "Gençlik Çalışanları Hareketliliği",
    location: 'Malaga İspanya',
    beneficiaries: "Gençler",
    status: "Aktif",
    startDate: '23 Ekim 2025',
    endDate: '30 Ekim 2025',
    tags: ["Eğitim", "Gönüllülük"],
    progress: 0,
    // Dosya adı: Volunteering teams as a tool to support Inclusion eğitimi.JPG
    imageUrl: "/projects-image/Volunteering teams as a tool to support Inclusion eğitimi.JPG", 
  },
  {
    id: 2,
    name: 'NEET\'ler İçin Geleceğe Köprü Projesi: İstanbul Çalıştayı',
    description: '18-30 yaş arası NEET (eğitimde, istihdamda veya eğitimde olmayan) gençlere özel düzenlenen projenin ikinci çalıştayı. Kapsanan Masraflar: Konaklama, Yeme - İçme, Seyahat Giderleri. Kendini geliştirmek isteyen tüm gençleri bu özel programa bekliyoruz!',
    details: 'Başvuru Formu: https://forms.gle/LwYFejzGr3ychKGL8, Son Başvuru Tarihi: 15 Kasım 2025',
    category: "Gençlik Çalıştayı",
    location: 'İstanbul',
    beneficiaries: "NEET Gençler",
    status: "Başvurular Açık",
    startDate: '25 Kasım 2025',
    endDate: '28 Kasım 2025',
    tags: ["Eğitim", "İstihdam"],
    progress: 0,
    // Dosya adı: neetgep.png
    imageUrl: "/projects-image/neetgep.png", 
  },
  {
    id: 3,
    name: 'Puppet Theater in Educational Work with Youth and Children',
    description: 'Erasmus+ eğitim kursu, yaratıcı drama ve sanat temelli öğrenme ile çocukların ve gençlerin duygusal, sosyal ve bilişsel gelişimini desteklemeyi amaçlamaktadır. Proje Amacı: Kukla tiyatrosunu yaratıcı ve eğitici bir yöntem olarak tanıtmak.',
    details: 'Hedef Kitle: Çocuklar ve gençlerle çalışan gençlik çalışanları, eğitmenler, öğretmenler veya gönüllüler.',
    category: "Erasmus+ Eğitim Kursu",
    location: 'Poznan Polonya',
    beneficiaries: "Çocuklar ve Gençler",
    status: "Aktif",
    startDate: '22 Ekim',
    endDate: '30 Ekim',
    tags: ["Yaratıcı Drama", "Sanat", "Eğitim"],
    progress: 0,
    // Dosya adı: Puppet Theater in Educational Work with Youth and Children.jpg
    imageUrl: "/projects-image/Puppet Theater in Educational Work with Youth and Children.jpg", 
  },
  {
    id: 4,
    name: 'Çeşitlilik İçinde Birlik: Dezavantajlı Gruplar İçin Çok Kültürlü Duyarlılık ve Uyum',
    description: 'Gençler arasında toplumsal farkındalık, empati ve sorumluluk bilincini güçlendirmeyi amaçlayan uluslararası bir girişimdir. Katılımcı gençler, nefret söylemi ve önyargıya karşı çözüm yolları geliştirecektir.',
    details: 'Ortaklar: Ürdün, Bulgaristan, Türkiye, Romanya, Belçika. Katılımcı Sayısı: Toplam: 25 genç (13 erkek, 12 kadın). Başvuru: 124.',
    category: "Uluslararası Girişim",
    location: 'Arapgir, Malatya',
    beneficiaries: "Dezavantajlı Gençler",
    status: "Aktif",
    startDate: '1 Temmuz 2025',
    endDate: '7 Temmuz 2025',
    tags: ["Toplumsal Farkındalık", "Empati", "Çok Kültürlü Duyarlılık"],
    progress: 0,
    partners: ["Ürdün", "Bulgaristan", "Türkiye", "Romanya", "Belçika"],
    participants: "25 genç (13 erkek, 12 kadın)",
    applicationCount: 124,
    // Dosya adı: çeşitlilik.jpg
    imageUrl: "/projects-image/çeşitlilik.jpg", 
  },
  {
    id: 5,
    name: 'PSYCHOCAMP (Psiko-Sosyal İhtiyaçlar İçin Kapsayıcı, Onarıcı, Koruyucu Aile Motivasyon Programı)',
    description: 'Engelleri Aşan Derneği koordinatörlüğünde, İspanya, Polonya, Türkiye ortaklığında yürütülen Erasmus+ Gençlik Projesidir. Amacı: Psiko-sosyal ihtiyaçları olan bireylerin bakım verenlerine yönelik destekleyici yaklaşımları güçlendirmek.',
    details: 'Proje No: 2024-3-TR01-KA210-YOU-000285989. Ortaklar: İspanya, Polonya, Türkiye. Katılımcı Sayısı: Toplam: 20 genç.',
    category: "Erasmus+ Gençlik Projesi",
    location: 'Cambados, İspanya; Malatya, Türkiye',
    beneficiaries: "Psiko-sosyal İhtiyaçları Olan Bireylerin Bakım Verenleri",
    status: "Aktif",
    startDate: '2 Kasım 2025',
    endDate: '7 Şubat 2026',
    tags: ["Psiko-Sosyal Destek", "Aile Motivasyon Programı"],
    progress: 0,
    partners: ["İspanya", "Polonya", "Türkiye"],
    participants: "20 genç",
    // ÖNEMLİ: .HEIC dosyasını .jpg yapıp yüklemelisiniz. Web tarayıcıları HEIC desteklemez.
    imageUrl: "/projects-image/PSYCHOCAMP.jpg", 
  },
  {
    id: 6,
    name: 'DiscoverEU: Young People Who Remove Borders',
    description: 'Görme Engelliler, Depremzede, İşitme Engelliler ve karma engelli grupları için rotalar. Rota 1: 16/09/2024 – 26/09/2024 (Kuzey Makedonya, Sırbistan, Türkiye). Rota 2: 10/07/2025 – 20/07/2025 (İspanya, Portekiz).',
    details: 'Rota ve Katılımcı Sayıları dosyada mevcuttur.',
    category: "DiscoverEU",
    location: "Avrupa Geneli",
    beneficiaries: "Engelli Gençler",
    status: "Aktif",
    startDate: '2024',
    endDate: '2025',
    tags: ["Seyahat", "Sosyal İçerme"],
    progress: 0,
    // Dosya adı: DiscoverEU.jpg
    imageUrl: "/projects-image/DiscoverEU.jpg", 
  },
  {
    id: 7,
    name: 'BRIDGE: Building Resources for Inclusive Development, Guidance and Engagement for Disabled People',
    description: '2025 yılı 1. başvuru döneminde Gençlik Çalışanları Hareketliliği kapsamında başvurusu yapılan projedir.',
    details: 'Proje No: 2025-1-TR01-KA153-YOU-000298857. Durumu: Onaylandı!',
    category: "Gençlik Çalışanları Hareketliliği",
    location: "Belirtilmemiş",
    beneficiaries: "Engelli Bireyler",
    status: "Onaylandı",
    startDate: '2025',
    endDate: undefined,
    tags: ["Kapasite Geliştirme", "Sosyal İçerme"],
    progress: 0,
    // Instagram URL'si
    imageUrl: "/projects-image/BRIDGE.jpg",
  },
];