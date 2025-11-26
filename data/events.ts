export interface EventItem {
  id: number
  day: string
  month: string
  title: string
  location: string
  time: string
  description: string
  image?: string
  detailedDescription?: string
  requirements?: string[]
  contactInfo?: string
}

export const events: EventItem[] = [
  {
    id: 1,
    day: "13",
    month: "Eki",
    title: "Erasmus + kampı",
    location: "Ankara",
    time: "10:00 - 17:00",
    description: "Erasmus+ programı hakkında bilgilendirme ve deneyim paylaşımı.",
    image: "/event-images/erasmus.jpg"
  },
  {
    id: 2,
    day: "14",
    month: "Eki",
    title: "Kano etkinliği",
    location: "Ankara Göleti",
    time: "14:00 - 18:00",
    description: "Doğayla iç içe keyifli bir kano deneyimi.",
    image: "/event-images/kano.jpg"
  },
  {
    id: 3,
    day: "15",
    month: "Eki",
    title: "Etkili LinkedIn kullanımı",
    location: "Çevrimiçi",
    time: "19:00 - 21:00",
    description: "İş dünyasında fark yaratmak için LinkedIn'i etkili kullanma teknikleri.",
    image: "/event-images/linkedin.png"
  },
  {
    id: 4,
    day: "16",
    month: "Eki",
    title: "Çanta boyama etkinliği",
    location: "Sanat Atölyesi",
    time: "13:00 - 16:00",
    description: "Kendi çantanı kendin boya, yaratıcılığını konuştur!",
    image: "/event-images/boyama.jpg"
  },
  {
    id: 5,
    day: "17",
    month: "Eki",
    title: "At binme etkinliği",
    location: "Ankara Binicilik Kulübü",
    time: "11:00 - 16:00",
    description: "At binme deneyimi ve temel binicilik eğitimi.",
    image: "/event-images/atbinme.jpg"
  },
  {
    id: 6,
    day: "18",
    month: "Eki",
    title: "CV ve motivasyon mektubu eğitimi",
    location: "Kariyer Merkezi",
    time: "14:00 - 16:00",
    description: "Etkili CV ve motivasyon mektubu yazma teknikleri.",
    image: "/event-images/cv.jpg"
  },
  {
    id: 7,
    day: "26",
    month: "Eki",
    title: "Avrupa fırsatları",
    location: "Ankara",
    time: "13:00 - 17:00",
    description: "Avrupa'da eğitim ve kariyer fırsatları hakkında bilgilendirme.",
    image: "/event-images/depremzedeler.jpg"
  },
  {
    id: 8,
    day: "15",
    month: "Eyl",
    title: "Engelsiz Spor Günü",
    location: "İstanbul Olimpiyat Parkı",
    time: "10:00 - 16:00",
    description: "Engelli bireyler için düzenlenen spor etkinlikleri ve yarışmalar.",
    detailedDescription: "Engelsiz Spor Günü'nde farklı engel gruplarına yönelik çeşitli spor aktiviteleri düzenlenecektir. Katılımcılar tekerlekli sandalye basketbolu, goalball, boccia gibi branşlarda etkinliklere katılabilirler.",
    requirements: [
      "Etkinlik ücretsizdir.",
      "Spor kıyafetleri ve su mataranızı getirmeyi unutmayın.",
      "Kayıt için önceden başvuru gereklidir.",
      "Etkinlik alanı tekerlekli sandalye erişimine uygundur."
    ],
    contactInfo: "Detaylı bilgi ve kayıt için: spor@engelleriasin.org",
    image: "https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
  },
  {
    id: 9,
    day: "10",
    month: "Eki",
    title: "Engelsiz Eğitim Semineri",
    location: "Ankara Üniversitesi Kongre Merkezi",
    time: "13:00 - 17:00",
    description: "Engelli bireylerin eğitim hakkı ve kapsayıcı eğitim uygulamaları konulu seminer.",
    detailedDescription: "Bu seminerde engelli bireylerin eğitim hakkı, kapsayıcı eğitim modelleri ve başarı örnekleri ele alınacaktır. Alanında uzman akademisyenler ve eğitimciler deneyimlerini paylaşacaktır.",
    requirements: [
      "Etkinlik ücretsizdir.",
      "Katılım belgesi verilecektir.",
      "İşaret dili tercümanı bulunacaktır.",
      "Mekan erişilebilirdir."
    ],
    contactInfo: "Kayıt ve bilgi için: egitim@engelleriasin.org",
    image: "https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
  },
  {
    id: 10,
    day: "25",
    month: "Ara",
    title: "Engelsiz Yaşam Festivali",
    location: "İstanbul Kongre Merkezi",
    time: "11:00 - 19:00",
    description: "Engelsiz Yaşam Festivali'nde birbirinden renkli etkinlikler sizleri bekliyor!",
    detailedDescription: "Engelsiz Yaşam Festivali'nde sergiler, konserler, atölye çalışmaları ve söyleşilerle dolu dopdolu bir program sizleri bekliyor. Tüm gün sürecek etkinliklerde hem eğlenecek hem de farkındalık kazanacaksınız.",
    requirements: [
      "Etkinlik ücretsizdir.",
      "Tüm etkinlik alanları erişilebilirdir.",
      "İşitme engelli katılımcılar için işaret dili tercümanı bulunacaktır.",
      "Görme engelli katılımcılar için betimlemeli anlatım yapılacaktır."
    ],
    contactInfo: "Bilgi için: festival@engelleriasin.org",
    image: "https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
  }
]
