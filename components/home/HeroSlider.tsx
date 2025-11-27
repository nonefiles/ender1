"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "@/i18n/routing"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

// Mock data - gerçek uygulamada API'den gelecek
const heroSlides = [
  {
    id: 1,
    image: "/event-images/hero1.jpg",
    titleKey: "homepage.hero.slide1.title",
    descriptionKey: "homepage.hero.slide1.description",
  },
  {
    id: 2,
    image: "/event-images/hero2.jpg",
    titleKey: "homepage.hero.slide2.title",
    descriptionKey: "homepage.hero.slide2.description",
  },
  {
    id: 3,
    image: "/event-images/hero3.jpg",
    titleKey: "homepage.hero.slide3.title",
    descriptionKey: "homepage.hero.slide3.description",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations()

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev: number) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Otomatik geçiş ve manuel müdahalede sürenin sıfırlanması
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 10000) // Süre 10 saniyeye çıkarıldı
    return () => clearInterval(interval)
  }, [nextSlide, currentSlide])

  return (
    <div className="relative h-[89vh] w-full overflow-hidden bg-black group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Arkaplan Resmi ve Zoom Efekti */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }} // Animasyon süresi slayt süresine uygun olarak uzatıldı
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image || "/placeholder.svg"}
              alt={t(heroSlides[currentSlide].titleKey)}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gelişmiş Gradient Overlay */}
          {/* Mobilde alttan yukarı, Masaüstünde soldan sağa karartma */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent sm:bg-gradient-to-r sm:from-black/90 sm:via-black/50 sm:to-transparent" />

          {/* İçerik Alanı */}
          <div className="absolute inset-0 flex items-end sm:items-center pb-20 sm:pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl text-white">
                {/* Başlık Animasyonu */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
                    {t(heroSlides[currentSlide].titleKey)}
                  </h1>
                </motion.div>

                {/* Açıklama Animasyonu */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                    {t(heroSlides[currentSlide].descriptionKey)}
                  </p>
                </motion.div>

                {/* Butonlar Animasyonu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/gonullu-ol" prefetch={false}>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-[#671615] hover:bg-[#571414] text-white border-0 py-6 text-base sm:text-lg px-8 shadow-lg shadow-red-900/20"
                    >
                      {t("navigation.volunteer")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/projeler" prefetch={false}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white hover:text-black py-6 text-base sm:text-lg px-8 transition-all"
                    >
                      {t("navigation.projects")}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigasyon Kontrolleri (Masaüstünde sağ alt, Mobilde gizli/basit) */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-4 z-20">
        <div className="flex gap-2">
            <button
                onClick={prevSlide}
                className="p-4 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm group-hover:border-white/60"
                aria-label={t("homepage.hero.prevSlide")}
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="p-4 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm group-hover:border-white/60"
                aria-label={t("homepage.hero.nextSlide")}
            >
                <ChevronRight className="h-6 w-6" />
            </button>
        </div>
      </div>

      {/* Mobilde ok tuşları (Basit ve kenarlarda) */}
      <button
        onClick={prevSlide}
        className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white z-20"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white z-20"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* İlerleme Göstergeleri (Çizgi şeklinde) */}
      <div className="absolute bottom-8 left-4 md:left-8 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group py-2" // Tıklama alanını artırmak için padding
            aria-label={t("homepage.hero.goToSlide", { number: index + 1 })}
          >
            <div 
                className={cn(
                    "h-1 rounded-full transition-all duration-500 ease-out",
                    index === currentSlide ? "w-12 bg-[#671615]" : "w-6 bg-white/50 group-hover:bg-white/80"
                )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
