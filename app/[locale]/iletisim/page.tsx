"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, Building2, Globe, Users, Award, Flag } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations("contact")
  const common = useTranslations("common")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacy: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type: 'contact' }),
      });

      if (response.ok) {
        alert(t("form.successAlert"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          privacy: false
        });
      } else {
        alert(t("form.errorAlert"));
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error);
      alert(t("form.errorAlert"));
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const contactInfo = {
    address: t("address"),
    phone: "+90 539 952 56 89",
    email: "embracethebarriers@gmail.com",
    emailAlt: "engelleriasin44@gmail.com",
    whatsapp: "+90 539 952 56 89",
    website: "https://www.engelleriasin.org/",
    workingHours: [
      { day: t("weekdays"), time: "09:00 - 18:00" },
      { day: t("saturday"), time: "10:00 - 14:00" },
      { day: t("sunday"), time: t("closed") },
    ],
  }

  const departments = [
    {
      id: 1,
      name: "Abdulsamet Kezer",
      email: "abdulsametkezer4@gmail.com",
      phone: "+905399525689",
      responsible: "Kurucu & Dernek Başkanı",
      address: t("address"),
      icon: <Building2 className="h-6 w-6 text-blue-600" />,
    },
    {
      id: 2,
      name: "Safa Okay",
      email: "safaokay27@gmail.com",
      phone: "+905458149628",
      responsible: "Kurucu Ortak & Dernek Başkan Yardımcısı",
      address: t("address"),
      icon: <Globe className="h-6 w-6 text-purple-600" />,
    },
    {
      id: 3,
      name: "Mahmut Talha Nurlan",
      email: "talhanurlan@gmail.com",
      phone: "+905534860320",
      responsible: "Kurucu Ortak & Proje Yürütücüsü",
      address: t("address"),
      icon: <Users className="h-6 w-6 text-green-600" />,
    },
  ]

  const formFields = [
    { name: "name", label: t("form.name"), type: "text", placeholder: t("form.namePlaceholder"), required: true },
    { name: "email", label: t("form.email"), type: "email", placeholder: t("form.emailPlaceholder"), required: true },
    { name: "phone", label: t("form.phone"), type: "tel", placeholder: t("form.phonePlaceholder") },
    {
      name: "subject",
      label: t("form.subject"),
      type: "text",
      placeholder: t("form.subjectPlaceholder"),
      required: true,
    },
    {
      name: "message",
      label: t("form.message"),
      type: "textarea",
      placeholder: t("form.messagePlaceholder"),
      required: true,
    },
  ]

  const faqItems = [
    {
      question: t("faq.1.q"),
      answer: t("faq.1.a"),
    },
    {
      question: t("faq.2.q"),
      answer: t("faq.2.a"),
    },
    {
      question: t("faq.3.q"),
      answer: t("faq.3.a"),
    },
    {
      question: t("faq.4.q"),
      answer: t("faq.4.a"),
    },
    {
      question: t("faq.5.q"),
      answer: t("faq.5.a"),
    },
  ]

  const achievements = [
    {
      title: t("achievements.1.title"),
      description: t("achievements.1.desc"),
      icon: <Award className="h-8 w-8 text-blue-600" />,
    },
    {
      title: t("achievements.2.title"),
      description: t("achievements.2.desc"),
      icon: <Flag className="h-8 w-8 text-green-600" />,
    },
    {
      title: t("achievements.3.title"),
      description: t("achievements.3.desc"),
      icon: <Users className="h-8 w-8 text-purple-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=400&fit=crop')",
          }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("pageTitle")}</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              {t("pageSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Adres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">{t("addressTitle")}</h3>
              <p className="text-gray-600 font-medium">{contactInfo.address}</p>
              <p className="text-sm text-gray-500 mt-2">{t("city")}</p>
            </motion.div>

            {/* Telefon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">{t("phoneTitle")}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-600 font-medium hover:text-blue-600">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* E-posta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">{t("emailTitle")}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 font-medium hover:text-blue-600">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Globe className="h-4 w-4 text-purple-500" />
                  <a
                    href={contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-medium hover:text-purple-600"
                  >
                    {t("web")}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Çalışma Saatleri */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md mt-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-6 text-black">{t("workingHoursTitle")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              {contactInfo.workingHours.map((hour, index) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-black font-medium">
                    {hour.day}: <span className="font-normal text-gray-600">{hour.time}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Başarılarımız */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900"
          >
            {t("achievementsTitle")}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Harita Bölümü - Malatya */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-96 rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.4!2d38.3!3d38.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNiyazi+Mısri+Mah.+Niyazi+Sok.+67/4,+Arzum+İş+Merkezi,+4+Nolu+Ofis!5e0!3m2!1str!2str!4v1635000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Departmanlar Bölümü */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900"
          >
            {t("departmentsTitle")}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{dept.name}</h3>
                    <p className="text-gray-600 text-xs font-medium">{dept.responsible}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                    <a href={`mailto:${dept.email}`} className="text-gray-600 hover:text-blue-600 text-sm break-all">
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                    <a href={`tel:${dept.phone}`} className="text-gray-600 hover:text-blue-600 text-sm">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{dept.address}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim Formu */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center text-gray-900"
            >
              {t("form.title")}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleChange}
                        rows={4}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}

                <div className="flex items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    {t("form.privacy")}
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  {t("form.submit")}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SSS Bölümü */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900"
          >
            {t("faqTitle")}
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}