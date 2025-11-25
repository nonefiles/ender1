"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ProjectsSection() {
  const t = useTranslations()

  const projects = [
    {
      id: 1,
      title: t("homepage.projects.featured.1.title"),
      description: t("homepage.projects.featured.1.description"),
      image: "/event-images/Volunteering.JPG",
    },
    {
      id: 2,
      title: t("homepage.projects.featured.2.title"),
      description: t("homepage.projects.featured.2.description"),
      image: "/event-images/cesitlilik.jpg",
    },
    {
      id: 3,
      title: t("homepage.projects.featured.3.title"),
      description: t("homepage.projects.featured.3.description"),
      image: "/event-images/PSYCHOCAMP.jpg",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("homepage.projects.title")}</h2>
          <p className="text-xl text-gray-600">{t("homepage.projects.subtitle")}</p>
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
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{project.description}</p>
                <Link href="/projeler" className="w-full" prefetch={false}>
                  <Button variant="outline" className="group/btn mt-auto w-full bg-transparent">
                    {t("homepage.projects.seeDetails")}
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