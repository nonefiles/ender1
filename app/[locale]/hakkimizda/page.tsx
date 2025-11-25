"use client"
import { motion } from "framer-motion"
import {
  Users,
  HeartHandshake,
  Target,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  Accessibility,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail, Phone } from "lucide-react"
import { useTranslations } from "next-intl"

function TimelineItems({ t }) {
  return [
    {
      year: "2022",
      title: t("timeline.items.2022.title"),
      description: t("timeline.items.2022.description"),
      icon: <Calendar className="h-6 w-6 text-[#671615]" />,
    },
    {
      year: "2023",
      title: t("timeline.items.2023.title"),
      description: t("timeline.items.2023.description"),
      icon: <GraduationCap className="h-6 w-6 text-[#671615]" />,
    },
    {
      year: "2024",
      title: t("timeline.items.2024_1.title"),
      description: t("timeline.items.2024_1.description"),
      icon: <Award className="h-6 w-6 text-[#671615]" />,
    },
    {
      year: "2024",
      title: t("timeline.items.2024_2.title"),
      description: t("timeline.items.2024_2.description"),
      icon: <MapPin className="h-6 w-6 text-[#671615]" />,
    },
    {
      year: "2025",
      title: t("timeline.items.2025.title"),
      description: t("timeline.items.2025.description"),
      icon: <Accessibility className="h-6 w-6 text-[#671615]" />,
    },
  ]
}

function MissionVision() {
  const t = useTranslations("about")

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Misyon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-6">
              <Accessibility className="h-10 w-10 text-[#671615] mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">{t("mission.title")}</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{t("mission.description")}</p>
          </motion.div>

          {/* Vizyon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-6">
              <BookOpen className="h-10 w-10 text-[#671615] mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">{t("vision.title")}</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{t("vision.description")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const t = useTranslations("about")

  const values = [
    {
      icon: <HeartHandshake className="h-8 w-8 text-[#671615] mb-4" />,
      title: t("values.solidarity.title"),
      description: t("values.solidarity.description"),
    },
    {
      icon: <Users className="h-8 w-8 text-[#671615] mb-4" />,
      title: t("values.inclusivity.title"),
      description: t("values.inclusivity.description"),
    },
    {
      icon: <Target className="h-8 w-8 text-[#671615] mb-4" />,
      title: t("values.transformation.title"),
      description: t("values.transformation.description"),
    },
    {
      icon: <Award className="h-8 w-8 text-[#671615] mb-4" />,
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-gray-900"
        >
          {t("values.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          {t("values.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              {value.icon}
              <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const t = useTranslations("about")
  const timelineItems = TimelineItems({ t })

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-center text-gray-900"
        >
          {t("timeline.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto"
        >
          {t("timeline.subtitle")}
        </motion.p>

        <div className="relative">
          {/* Timeline çizgisi */}
          <div className="absolute left-1/2 h-full w-1 -ml-[1px] bg-gradient-to-b from-[#671615] via-[#8b2e2c] to-[#a94642]" />

          {/* Timeline ögeleri */}
          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="w-5/12 pr-8 text-right">
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center -ml-6">
                      {item.icon}
                    </div>
                    <div className="w-1/12 text-center ml-4">
                      <span className="text-lg font-bold text-gray-900">{item.year}</span>
                    </div>
                    <div className="w-5/12" />
                  </>
                ) : (
                  <>
                    <div className="w-5/12" />
                    <div className="w-1/12 text-center mr-4">
                      <span className="text-lg font-bold text-gray-900">{item.year}</span>
                    </div>
                    <div className="relative z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center -mr-6">
                      {item.icon}
                    </div>
                    <div className="w-5/12 pl-8">
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const t = useTranslations("about")

  const stats = [
    { number: "10+", label: t("stats.projects") },
    { number: "3+", label: t("stats.years") },
    { number: "6", label: t("stats.team") },
    { number: "2", label: t("stats.accreditations") },
  ]

  return (
    <section className="py-20 px-6 bg-[#671615] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16"
        >
          {t("stats.title")}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <h3 className="text-5xl font-bold mb-2">{stat.number}</h3>
              <p className="text-lg opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const t = useTranslations("about")

  const teamMembers = [
    {
      name: t("team.members.abdulsamet.name"),
      role: t("team.members.abdulsamet.role"),
      description: t("team.members.abdulsamet.description"),
      email: "abdulsametkezer4@gmail.com",
    },
    {
      name: t("team.members.safa.name"),
      role: t("team.members.safa.role"),
      description: t("team.members.safa.description"),
      email: "safaokay27@gmail.com",
    },
    {
      name: t("team.members.talha.name"),
      role: t("team.members.talha.role"),
      description: t("team.members.talha.description"),
      email: "talhanurlan@gmail.com",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-center text-gray-900"
        >
          {t("team.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto"
        >
          {t("team.subtitle")}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
              <p className="text-[#671615] font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.description}</p>
              <a href={`mailto:${member.email}`} className="text-[#671615] hover:underline text-sm">
                <Mail className="inline-block w-4 h-4 mr-1" />
                {t("team.contact")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const t = useTranslations("about")

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6 text-gray-900"
        >
          {t("cta.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          {t("cta.description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="bg-[#671615] hover:bg-[#52110f]">
            {t("cta.joinProjects")}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#671615] text-[#671615] hover:bg-[#f7e8e8] bg-transparent"
          >
            {t("cta.contact")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Mail className="h-8 w-8 text-[#671615] mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">{t("cta.contactInfo.email")}</h4>
            <p className="text-gray-600 text-sm">embracethebarriers@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Phone className="h-8 w-8 text-[#671615] mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">{t("cta.contactInfo.phone")}</h4>
            <p className="text-gray-600 text-sm">+90 545 814 96 28</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <MapPin className="h-8 w-8 text-[#671615] mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">{t("cta.contactInfo.address")}</h4>
            <p className="text-gray-600 text-sm">{t("cta.contactInfo.addressText")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PageHeader({ title, description, imageUrl }) {
  return (
    <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl opacity-90 leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const t = useTranslations("about")

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={t("pageHeader.title")}
        description={t("pageHeader.description")}
        imageUrl="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=400&fit=crop"
      />
      <MissionVision />
      <ValuesSection />
      <TimelineSection />
      <StatsSection />
      <TeamSection />
      <CTASection />
    </div>
  )
}
