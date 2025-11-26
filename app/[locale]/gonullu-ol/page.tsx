"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Mail, Phone, User, Briefcase, Users, Heart, Upload } from "lucide-react"
import { useTranslations } from "next-intl"

export default function VolunteerPage() {
  const t = useTranslations("volunteer")
  
  // State tipini güncelledik: cv alanı File | null olabilir
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    occupation: string;
    skills: string;
    message: string;
    cv: File | null; // Yeni eklenen alan
  }>({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    skills: "",
    message: "",
    cv: null, // Başlangıç değeri
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    // Dosya girişi kontrolü
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: fileInput.files ? fileInput.files[0] : null,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = new FormData();
    data.append('type', 'volunteer'); // Form tipini belirtiyoruz
    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          occupation: "", 
          skills: "", 
          message: "",
          cv: null 
        });
      } else {
        alert('Form gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      alert('Form gönderilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-[#671615] text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">{t("title")}</CardTitle>
            <CardDescription className="text-white/90">
              {t("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{t("successTitle")}</h3>
                <p className="text-black mb-8">
                  {t("successMessage")}
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-[#671615] hover:bg-[#571414]">
                  {t("newApplication")}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-black">
                      {t("form.name")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-black">
                      {t("form.email")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-black">
                      {t("form.phone")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="occupation" className="block text-sm font-medium text-black">
                      {t("form.occupation")}
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="occupation"
                        name="occupation"
                        type="text"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="skills" className="block text-sm font-medium text-black">
                    {t("form.skills")}
                  </label>
                  <Input
                    id="skills"
                    name="skills"
                    type="text"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                {/* CV Upload Field - Yeni Eklenen Alan */}
                <div className="space-y-2">
                  <label htmlFor="cv" className="block text-sm font-medium text-black">
                    CV (Dosya Yükleme)
                  </label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="pl-10 pt-2 file:text-sm file:font-medium file:text-white file:bg-[#671615] file:rounded-md file:border-0 file:mr-4 file:px-4 file:py-1 hover:file:bg-[#571414]"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Kabul edilen formatlar: PDF, DOC, DOCX</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-black">
                    {t("form.message")} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#671615] hover:bg-[#571414] h-12 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-[#671615]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#671615]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{t("benefits.1.title")}</h3>
            <p className="text-black">{t("benefits.1.desc")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-[#671615]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-[#671615]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{t("benefits.2.title")}</h3>
            <p className="text-black">{t("benefits.2.desc")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-[#671615]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#671615]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{t("benefits.3.title")}</h3>
            <p className="text-black">{t("benefits.3.desc")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}