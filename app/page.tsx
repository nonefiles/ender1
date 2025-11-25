"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, ChevronRight, Calendar, MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react"
import { events, EventItem } from "@/data/events"

// Mock data - gerçek uygulamada API'den gelecek
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop",
    title: "Eğitimde Eşitlik İçin",
    description: "Dezavantajlı çocuklara kaliteli eğitim fırsatları sunuyoruz",
    primaryCTA: "Gönüllü Ol",
    secondaryCTA: "Projeler"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop",
    title: "Toplumsal Değişim",
    description: "Sürdürülebilir projelerle topluma değer katıyoruz",
    primaryCTA: "Gönüllü Ol",
    secondaryCTA: "Projeler"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=800&fit=crop",
    title: "Birlikte Daha Güçlüyüz",
    description: "Her bağış ve gönüllülük, umudun tohumu",
    primaryCTA: "Gönüllü Ol",
    secondaryCTA: "Projeler"
  }
]

const projects = [
  {
    id: 1,
    title: "BRIDGE: Building Resources for Inclusive Development, Guidance and Engagement for Disabled People",
    description: "2025 yılı 1. başvuru döneminde Gençlik Çalışanları Hareketliliği kapsamında başvurusunu yaptığımız 2025-1-TR01-KA153-YOU-000298857 numaralı projemiz onaylandı! Engelli bireyler için kapsayıcı gelişim, rehberlik ve katılım kaynakları oluşturmaya odaklanan bu proje ile gençlik çalışanlarının kapasitelerini artırmayı hedefliyoruz.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Gençlik Değişimi - Toplumsal Dönüşüm",
    description: "2025-1-TR01-KA154-YOU-000301604 numaralı Gençlik Değişimi projesi partner olarak onaylanmıştır. Bu proje kapsamında gençler arasında kültürlerarası diyalog ve toplumsal katılımı güçlendirmeye odaklanıyoruz.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "European Solidarity Corps - Kalite Etiketi",
    description: "2024-1-TR01-ESC50-QLA-000296489 numaralı European Solidarity Corps Kalite Etiketi akreditasyonumuz onaylanmıştır. Bu akreditasyon ile gönüllülük projelerinde daha geniş bir ağda yer almaktayız.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop"
  }
]

const blogPosts = [
  {
    id: 1,
    title: "Gönüllülüğün Toplumsal Etkisi",
    excerpt: "Gönüllü çalışmalarının bireysel ve toplumsal yarar üzerindeki etkilerini inceliyoruz. Araştırmalar gösteriyor ki gönüllülük hem yapan hem de yararlanıcı için olumlu sonuçlar doğuruyor.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
    date: "15 Ağustos 2025"
  },
  {
    id: 2,
    title: "Sürdürülebilir Kalkınma Hedefleri",
    excerpt: "BM Sürdürülebilir Kalkınma Hedefleri çerçevesinde yürüttüğümüz projeler ve elde ettiğimiz başarıları detaylarıyla paylaşıyoruz.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
    date: "10 Ağustos 2025"
  },
  {
    id: 3,
    title: "Dijital Eşitsizliği Kapatmak",
    excerpt: "Teknoloji erişimindeki adaletsizliklere karşı aldığımız önlemler ve dijital uçurumu kapatma çalışmalarımızın sonuçları.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
    date: "5 Ağustos 2025"
  }
]

// News data
const news = [
  { id: 1, date: "1 Eylül", category: "Haber", title: "Yeni eğitim merkezi açıldı" },
  { id: 2, date: "28 Ağu", category: "Duyuru", title: "Gönüllü eğitim programı başvuruları" },
  { id: 3, date: "25 Ağu", category: "Etkinlik", title: "Çevre temizliği organizasyonu" },
  { id: 4, date: "22 Ağu", category: "Haber", title: "Burs programı sonuçları açıklandı" }
]

// Use only the first 4 events for the homepage
const homePageEvents = events.slice(0, 4);

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }
  
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl mb-8"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/gonullu-ol" passHref prefetch={false}>
                  <Button size="lg" className="bg-[#671615] hover:bg-[#571414] w-full sm:w-auto">
                    {heroSlides[currentSlide].primaryCTA}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/projeler" passHref prefetch={false}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                  >
                    {heroSlides[currentSlide].secondaryCTA}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
        aria-label="Önceki slayt"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
        aria-label="Sonraki slayt"
      >
        <ArrowRight className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Slayt ${index + 1}'e git`}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projelerimiz</h2>
          <p className="text-xl text-gray-600">Toplumsal değişim için yürüttüğümüz projeler</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{project.description}</p>
                <Link href="/projeler" passHref className="w-full" prefetch={false}>
                  <Button variant="outline" className="group/btn mt-auto w-full">
                    Detayları Gör
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VolunteerCTA() {
  return (
    <section className="py-20 bg-[#671615] text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sen De Değişimin Parçası Ol
          </h2>
          <p className="text-xl mb-8">
            Gönüllü olarak toplumsal değişime katkıda bulun, yeni insanlarla tanış ve anlamlı deneyimler yaşa.
          </p>
          <Link href="/gonullu-ol" passHref prefetch={false}>
            <Button size="lg" className="bg-white text-[#671615] hover:bg-gray-100">
              Hemen Başvur
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Blog</h2>
          <p className="text-xl text-black">Yazılarımız ve deneyimlerimiz</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-black">{post.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">{post.excerpt}</p>
                <div 
                  onClick={() => openModal(post)}
                  className="p-0 h-auto font-medium text-[#671615] mt-auto justify-start flex items-center cursor-pointer hover:underline"
                >
                  Devamını Oku
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                  aria-label="Kapat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="text-sm text-gray-500 mb-2">{selectedPost.date}</div>
                <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{selectedPost.excerpt}</p>
                  <p className="text-gray-700">
                    Bu içerik örnek amaçlıdır. Gerçek içerik blog yazısı detay sayfasında yer alacaktır.
                    Eğer bu bir gerçek uygulama olsaydı, burada blog yazısının tam içeriğini görebilirdiniz.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button 
                    onClick={closeModal}
                    className="bg-[#671615] hover:bg-[#571414]"
                  >
                    Kapat
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface NewsItem {
  id: number;
  date: string;
  category: string;
  title: string;
  content?: string;
}

function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const openNewsModal = (newsItem: NewsItem) => {
    setSelectedNews({
      ...newsItem,
      content: `Bu ${newsItem.category.toLowerCase()} içeriği örnek amaçlıdır. Gerçek uygulamada burada ${newsItem.title} ile ilgili detaylı içerik yer alacaktır.`
    });
    setIsNewsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openEventModal = (event: EventItem) => {
    // Find the full event details from the shared events data
    const fullEvent = events.find(e => e.id === event.id) || event;
    setSelectedEvent({
      ...fullEvent,
      description: fullEvent.description || `Bu etkinlik ${fullEvent.day} ${fullEvent.month} tarihinde ${fullEvent.location} konumunda gerçekleşecektir. ${fullEvent.title} hakkında detaylı bilgi ve kayıt için lütfen bize ulaşın.`
    });
    setIsEventModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News Cards */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Haber & Duyurular</h2>
              <Link href="/haberler" passHref prefetch={false}>
                <Button variant="outline" size="sm">
                  Tümünü Gör
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              {news.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#671615]/20"
                  onClick={() => openNewsModal(item)}
                >
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.category === 'Haber' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' :
                      item.category === 'Duyuru' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
                      'bg-gradient-to-r from-purple-400 to-purple-600 text-white'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="pr-20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-[#671615] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#671615] transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-[#671615] font-medium text-sm hover:underline">
                      Detayları Oku
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-[#671615]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Events Timeline */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Yaklaşan Etkinlikler</h2>
              <Link href="/etkinlikler" passHref prefetch={false}>
                <Button variant="outline" size="sm">
                  Tüm Etkinlikler
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* News Detail Modal */}
            <AnimatePresence>
              {isNewsModalOpen && selectedNews && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={closeNewsModal}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-[#671615] rounded-full"></div>
                            <span className="text-sm font-medium text-gray-500">{selectedNews.date}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                              selectedNews.category === 'Haber' ? 'bg-blue-100 text-blue-800' :
                              selectedNews.category === 'Duyuru' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {selectedNews.category}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedNews.title}</h2>
                        </div>
                        <button
                          onClick={closeNewsModal}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Kapat"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="prose max-w-none">
                        <p className="text-gray-700 mb-6">{selectedNews.content}</p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <Button 
                          onClick={closeNewsModal}
                          className="bg-[#671615] hover:bg-[#571414]"
                        >
                          Kapat
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Event Detail Modal */}
            <AnimatePresence>
              {isEventModalOpen && selectedEvent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={closeEventModal}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-center bg-[#671615] text-white rounded-lg p-3 min-w-[70px]">
                              <div className="text-2xl font-bold">{selectedEvent.day}</div>
                              <div className="text-sm">{selectedEvent.month}</div>
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                              <div className="flex items-center text-gray-600 text-sm gap-4 mt-1">
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-[#671615]" />
                                  {selectedEvent.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-[#671615]" />
                                  {selectedEvent.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={closeEventModal}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Kapat"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="prose max-w-none">
                        <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Button 
                          variant="outline"
                          onClick={closeEventModal}
                        >
                          Kapat
                        </Button>
                        <Link href="/etkinlikleri" passHref prefetch={false}>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-[#671615] mt-2"
                          >
                            Detaylı Bilgi
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {homePageEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#671615]/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-center bg-[#671615] text-white rounded-lg p-3 min-w-[70px]">
                      <div className="text-2xl font-bold">{event.day}</div>
                      <div className="text-sm">{event.month}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm gap-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.time}
                        </span>
                      </div>
                      <Link href="/etkinlikler" passHref>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-[#671615] mt-2"
                        >
                          Detaylar
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <ProjectsSection />
      <VolunteerCTA />
      <BlogSection />
      <NewsSection />
    </div>
  )
}
