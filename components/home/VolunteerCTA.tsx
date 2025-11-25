"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/routing"

export function VolunteerCTA() {
  const t = useTranslations()

  return (
    <section className="py-20 bg-[#671615] text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("homepage.volunteerCTA.title")}</h2>
          <p className="text-xl mb-8">{t("homepage.volunteerCTA.description")}</p>
          <Link href="/gonullu-ol">
            <Button size="lg" className="bg-white text-[#671615] hover:bg-gray-100">
              {t("homepage.volunteerCTA.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}