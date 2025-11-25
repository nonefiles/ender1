"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

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
            src={heroSlides[currentSlide].image || "/placeholder.svg"}
            alt={t(heroSlides[currentSlide].titleKey)}
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
                {t(heroSlides[currentSlide].titleKey)}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl mb-8"
              >
                {t(heroSlides[currentSlide].descriptionKey)}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/gonullu-ol" prefetch={false}>
                  <Button size="lg" className="bg-[#671615] hover:bg-[#571414] w-full sm:w-auto">
                    {t("navigation.volunteer")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/projeler" prefetch={false}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                  >
                    {t("navigation.projects")}
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
        aria-label={t("homepage.hero.prevSlide")}
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
        aria-label={t("homepage.hero.nextSlide")}
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
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={t("homepage.hero.goToSlide", { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  )
}