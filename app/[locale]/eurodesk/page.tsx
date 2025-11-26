"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  MapPin,
  Users,
  BookOpen,
  Globe,
  GraduationCap,
  Euro,
  Calendar,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Search,
  Heart,
  Target,
  Award,
} from "lucide-react"

function PageHeader() {
  const t = useTranslations("eurodesk")

  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Award className="h-6 w-6" />
            <span className="font-semibold">{t("officialContactPoint")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
        >
          {t("heroTitle")}
          <br />
          <span className="text-yellow-300">{t("heroSubtitle")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          {t("heroDescription")}
        </motion.p>
      </div>
    </section>
  )
}

function AboutSection() {
  const t = useTranslations("eurodesk")

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop"
              alt="ENDER ekibi danışmanlık verirken"
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{t("aboutTitle")}</h2>
            <p className="text-gray-600 text-lg mb-4">{t("aboutDescription1")}</p>
            <p className="text-gray-600 text-lg mb-4">{t("aboutDescription2")}</p>
            <p className="text-gray-600 text-lg mb-6">{t("aboutDescription3")}</p>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-600">{t("erasmusProjects")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2024</div>
                <div className="text-sm text-gray-600">{t("eurodeskAccreditation")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">{t("supportedYouth")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const t = useTranslations("eurodesk")

  const eurodeskServices = [
    {
      id: 1,
      title: t("services.englishClubs"),
      description: t("services.englishClubsDesc"),
      icon: <BookOpen className="h-8 w-8 text-blue-500 mb-4" />,
    },
    {
      id: 2,
      title: t("services.workshops"),
      description: t("services.workshopsDesc"),
      icon: <Calendar className="h-8 w-8 text-blue-500 mb-4" />,
    },
    {
      id: 3,
      title: t("services.groupTherapy"),
      description: t("services.groupTherapyDesc"),
      icon: <Users className="h-8 w-8 text-blue-500 mb-4" />,
    },
    {
      id: 4,
      title: t("services.culturalTrips"),
      description: t("services.culturalTripsDesc"),
      icon: <Globe className="h-8 w-8 text-blue-500 mb-4" />,
    },
    {
      id: 5,
      title: t("services.seminars"),
      description: t("services.seminarsDesc"),
      icon: <GraduationCap className="h-8 w-8 text-blue-500 mb-4" />,
    },
    {
      id: 6,
      title: t("services.projectConsultancy"),
      description: t("services.projectConsultancyDesc"),
      icon: <Euro className="h-8 w-8 text-blue-500 mb-4" />,
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
          {t("services.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          {t("services.description")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eurodeskServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TargetGroupsSection() {
  const t = useTranslations("eurodesk")

  const targetGroups = [
    {
      id: 1,
      title: t("targetGroups.students"),
      description: t("targetGroups.studentsDesc"),
      icon: <GraduationCap className="h-10 w-10 mb-4" style={{ color: "#671615" }} />,
    },
    {
      id: 2,
      title: t("targetGroups.specialNeeds"),
      description: t("targetGroups.specialNeedsDesc"),
      icon: <Heart className="h-10 w-10 mb-4" style={{ color: "#671615" }} />,
    },
    {
      id: 3,
      title: t("targetGroups.volunteers"),
      description: t("targetGroups.volunteersDesc"),
      icon: <Users className="h-10 w-10 mb-4" style={{ color: "#671615" }} />,
    },
    {
      id: 4,
      title: t("targetGroups.youthWorkers"),
      description: t("targetGroups.youthWorkersDesc"),
      icon: <Target className="h-10 w-10 mb-4" style={{ color: "#671615" }} />,
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-gray-900"
        >
          {t("targetGroups.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          {t("targetGroups.description")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targetGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
            >
              {group.icon}
              <h3 className="text-xl font-bold mb-3 text-gray-900">{group.title}</h3>
              <p className="text-gray-600">{group.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const t = useTranslations("team")

  const teamMembers = [
    {
      id: "1",
      name: "Abdulsamet Kezer",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "2",
      name: "Safa Okay",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "3",
      name: "Mahmut Talha Nurlan",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "4",
      name: "Beyza Nur Acıl",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "5",
      name: "Ceyda Gülendam Doğan",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "6",
      name: "Tuğba Karadaş",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "7",
      name: "Kader Doğru",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "8",
      name: "Alperen Şanlıtürk",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "9",
      name: "Dilara Kaşlıoğlu",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "10",
      name: "Enes Can Değirmenci",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      id: "11",
      name: "Rahime Efna Erdem",
      icon: <Users className="h-10 w-10 text-white" />,
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
          {t('pageTitle')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          {t('pageDescription')}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500">
                  {member.icon}
                </div>
              </div>
              <h3 className="text-sm font-bold mb-2 text-gray-900 text-center">{member.name}</h3>
              <p className="font-medium text-center text-xs" style={{ color: "#671615" }}>
                {t(`members.${member.id}.role`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const t = useTranslations("eurodesk")

  const faqItems = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
  ]

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
          {t("faq.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto"
        >
          {t("faq.description")}
        </motion.p>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center">
                <Search className="h-5 w-5 mr-3" style={{ color: "#671615" }} />
                {item.question}
              </h3>
              <p className="text-gray-600 pl-8">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const t = useTranslations("eurodesk")

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
          {t("contact.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto"
        >
          {t("contact.description")}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-black">{t("contact.contactInfo")}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">Niyazi Mısri Mah. Niyazi Sok. 67/4, Arzum İş Merkezi, 4 Nolu Ofis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">+90 545 814 9628</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">+90 539 952 5689</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">embracethebarriers@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">www.engelleriasin.org</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 mt-8 text-black">{t("contact.workingHours")}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">{t("contact.mondayFriday")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">{t("contact.saturday")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" style={{ color: "#671615" }} />
                  <span className="text-black">{t("contact.sunday")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-md h-full">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{t("contact.socialMedia")}</h3>
              <div className="flex space-x-4 mb-8">
                <a
                  href="mailto:embracethebarriers@gmail.com"
                  className="p-3 bg-gray-100 rounded-full hover:bg-red-100 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6 text-red-600" />
                </a>
                <a
                  href="https://www.engelleriasin.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Website"
                >
                  <Globe className="h-6 w-6 text-blue-600" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-gray-100 rounded-full hover:bg-pink-100 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-pink-600" />
                </a>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t("contact.malatya")}</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.4!2d38.3!3d38.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNiyazi+Mısri+Mah.+Niyazi+Sok.+67/4,+Arzum+İş+Merkezi,+4+Nolu+Ofis!5e0!3m2!1str!2str!4v1635000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const t = useTranslations("eurodesk")

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          {t("cta.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          {t("cta.description")}
        </motion.p>
      </div>
    </section>
  )
}

export default function EurodeskPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <AboutSection />
      <ServicesSection />
      <TargetGroupsSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
    </div>
  )
}