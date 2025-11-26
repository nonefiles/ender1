"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Heart,
  BookOpen,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Globe,
  Languages,
  Accessibility,
  UserCheck,
  Loader2,
} from "lucide-react"

// --- Type Definitions ---

type ApplicationStatus = 'ongoing' | 'underReview' | 'approved' | 'rejected' | 'completed';

type ApplicationCategory =
  | 'disabilityRights'
  | 'internationalProjects'
  | 'psychology'
  | 'sportsRehabilitation'
  | 'languageEducation'
  | 'cultureArts';

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

interface ApplicationDetails {
  dates?: string;
  coverage?: string;
  target?: string;
  applicationForm?: string;
  note?: string;
  mobilities?: string[];
  participants?: string;
  about?: string;
  eligibility?: string[];
  priority?: string[];
  role?: string;
  expectations?: string[];
  activities?: string;
}

interface Application {
  id: number;
  title: string;
  description: string;
  category: ApplicationCategory;
  applicationDeadline?: string;
  startDate?: string;
  completionDate?: string;
  location: string;
  maxParticipants?: number | null;
  currentApplications?: number;
  totalApplications?: number;
  acceptedApplications?: number;
  status: ApplicationStatus;
  requirements?: string[];
  benefits?: string[];
  details?: ApplicationDetails;
  contactPerson: ContactPerson;
}

interface ApplicationStatusConfig {
  color: string;
  icon: React.ReactNode;
  label: string;
}

// --- Components ---

const getApplicationStatuses = (t: any): Record<ApplicationStatus, ApplicationStatusConfig> => ({
  ongoing: {
    color: "bg-blue-100 text-blue-800",
    icon: <Clock className="h-3 w-3" />,
    label: t("statuses.ongoing"),
  },
  underReview: {
    color: "bg-purple-100 text-purple-800",
    icon: <AlertCircle className="h-3 w-3" />,
    label: t("statuses.underReview"),
  },
  approved: {
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle className="h-3 w-3" />,
    label: t("statuses.approved"),
  },
  rejected: {
    color: "bg-red-100 text-red-800",
    icon: <XCircle className="h-3 w-3" />,
    label: t("statuses.rejected"),
  },
  completed: {
    color: "bg-gray-100 text-gray-800",
    icon: <CheckCircle className="h-3 w-3" />,
    label: t("statuses.completed"),
  },
})

const getCategoryTranslations = (t: any): Record<string, string> => ({
  disabilityRights: t("categories.disabilityRights"),
  internationalProjects: t("categories.internationalProjects"),
  psychology: t("categories.psychology"),
  sportsRehabilitation: t("categories.sportsRehabilitation"),
  languageEducation: t("categories.languageEducation"),
  cultureArts: t("categories.cultureArts"),
})

interface ApplicationCardProps {
  application: Application;
  isCompleted?: boolean;
}

function ApplicationCard({ application, isCompleted = false }: ApplicationCardProps) {
  const t = useTranslations("applications")
  const applicationStatuses = getApplicationStatuses(t)
  const categoryTranslations = getCategoryTranslations(t)

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // DÜZELTME: API 'name' bekliyor, bu yüzden state anahtarını 'fullName' yerine 'name' yaptık
  const [applicationForm, setApplicationForm] = useState({
    name: "", 
    email: "",
    phone: "",
    experience: "",
    motivation: "",
  })

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: 'application',
          ...applicationForm,
          applicationTitle: application.title,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setShowSuccess(true)

      setTimeout(() => {
        setApplicationForm({
          name: "",
          email: "",
          phone: "",
          experience: "",
          motivation: "",
        })
        setIsApplying(false)
        setShowSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "disabilityRights":
        return "from-red-100 to-red-200"
      case "internationalProjects":
        return "from-blue-100 to-blue-200 text-blue-800"
      case "psychology":
        return "from-green-100 to-green-200 text-green-800"
      case "sportsRehabilitation":
        return "from-orange-100 to-orange-200 text-orange-800"
      case "languageEducation":
        return "from-yellow-100 to-yellow-200 text-yellow-800"
      case "cultureArts":
        return "from-pink-100 to-pink-200 text-pink-800"
      default:
        return "from-gray-100 to-gray-200 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "disabilityRights":
        return <Accessibility className="h-4 w-4" />
      case "internationalProjects":
        return <Globe className="h-4 w-4" />
      case "psychology":
        return <Heart className="h-4 w-4" />
      case "sportsRehabilitation":
        return <UserCheck className="h-4 w-4" />
      case "languageEducation":
        return <Languages className="h-4 w-4" />
      case "cultureArts":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const contactPerson = application.contactPerson || { name: "", email: "", phone: "" }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-2">
            <Badge className={`bg-gradient-to-r ${getCategoryColor(application.category)} flex items-center gap-1`}>
              {getCategoryIcon(application.category)}
              {categoryTranslations[application.category] || application.category}
            </Badge>
            <Badge className={`${applicationStatuses[application.status]?.color} flex items-center gap-1`}>
              {applicationStatuses[application.status]?.icon}
              {applicationStatuses[application.status]?.label}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">{application.title}</CardTitle>
          <CardDescription className="text-gray-600 line-clamp-3 mt-2">{application.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
              <span>{application.location}</span>
            </div>

            {!isCompleted ? (
              <>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                  <span>
                    {t("applicationDeadline")}: {application.applicationDeadline}
                  </span>
                </div>
                {application.maxParticipants && (
                  <>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                      <span>
                        {application.currentApplications || 0} {t("applications")} / {application.maxParticipants}{" "}
                        {t("people")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(((application.currentApplications || 0) / application.maxParticipants) * 100, 100)}%`,
                          backgroundColor: "#571213",
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                  <span>
                    {t("completion")}: {application.completionDate}
                  </span>
                </div>
                {application.maxParticipants && (
                  <>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                      <span>
                        {application.maxParticipants} {t("people")} {t("accepted")}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {!isCompleted && application.requirements && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-800">{t("requirements")}:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {application.requirements.slice(0, 2).map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0"
                      style={{ backgroundColor: "#571213" }}
                    ></span>
                    {req}
                  </li>
                ))}
                {application.requirements.length > 2 && (
                  <li className="font-medium" style={{ color: "#571213" }}>
                    {t("moreRequirements", { count: application.requirements.length - 2 })}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center text-xs text-gray-600">
              <User className="h-3 w-3 mr-1" />
              <span>{contactPerson.name}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Mail className="h-3 w-3 mr-1" />
              <span>{contactPerson.email}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Phone className="h-3 w-3 mr-1" />
              <span>{contactPerson.phone}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 text-white hover:opacity-90" style={{ backgroundColor: "#571213" }}>
                  <Eye className="h-4 w-4 mr-2" />
                  {t("viewDetails")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{application.title}</DialogTitle>
                  <DialogDescription className="text-base">{application.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{t("details")}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                        <span>{application.location}</span>
                      </div>
                      {!isCompleted && application.startDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                          <span>
                            {t("start")}: {application.startDate}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                        <span>
                          {isCompleted ? t("completion") : t("applicationDeadline")}:{" "}
                          {isCompleted ? application.completionDate : application.applicationDeadline}
                        </span>
                      </div>
                      {application.maxParticipants && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                          <span>
                            {t("quota")}: {application.maxParticipants} {t("people")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {application.details && (
                    <>
                      {application.details.mobilities && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Hareketlilikler</h3>
                          <ul className="space-y-2">
                            {application.details.mobilities.map((mobility: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                                  style={{ backgroundColor: "#571213" }}
                                ></span>
                                <span>{mobility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {application.details.participants && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Katılımcı Bilgisi</h3>
                          <p className="text-gray-700">{application.details.participants}</p>
                        </div>
                      )}

                      {application.details.coverage && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Karşılanan Masraflar</h3>
                          <p className="text-gray-700">{application.details.coverage}</p>
                        </div>
                      )}

                      {application.details.about && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Program Hakkında</h3>
                          <p className="text-gray-700">{application.details.about}</p>
                        </div>
                      )}

                      {application.details.target && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Hedef Kitle</h3>
                          <p className="text-gray-700">{application.details.target}</p>
                        </div>
                      )}

                      {application.details.activities && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Aktiviteler</h3>
                          <p className="text-gray-700">{application.details.activities}</p>
                        </div>
                      )}

                      {application.details.eligibility && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Kimler Başvurabilir?</h3>
                          <ul className="space-y-2">
                            {application.details.eligibility.map((item: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                                  style={{ backgroundColor: "#571213" }}
                                ></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {application.details.priority && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Öncelikli Başvuru Sahipleri</h3>
                          <ul className="space-y-2">
                            {application.details.priority.map((item: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {application.details.role && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Rol</h3>
                          <p className="text-gray-700">{application.details.role}</p>
                        </div>
                      )}

                      {application.details.expectations && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Beklentiler</h3>
                          <ul className="space-y-2">
                            {application.details.expectations.map((item: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                                  style={{ backgroundColor: "#571213" }}
                                ></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {application.details.dates && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Tarihler</h3>
                          <p className="text-gray-700">{application.details.dates}</p>
                        </div>
                      )}

                      {application.details.note && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-800">{application.details.note}</p>
                        </div>
                      )}

                      {!isCompleted && application.details.applicationForm && (
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
                          <h3 className="font-semibold mb-2">Başvuru Formu</h3>
                          <a
                            href={application.details.applicationForm}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            {application.details.applicationForm}
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {application.requirements && !isCompleted && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">{t("requirements")}</h3>
                      <ul className="space-y-2">
                        {application.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                              style={{ backgroundColor: "#571213" }}
                            ></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {application.benefits && application.benefits.length > 0 && !isCompleted && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">{t("benefits")}</h3>
                      <ul className="space-y-2">
                        {application.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-semibold">{t("contact")}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                        <span>{contactPerson.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                        <a href={`mailto:${contactPerson.email}`} className="text-blue-600 hover:underline">
                          {contactPerson.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" style={{ color: "#571213" }} />
                        <a href={`tel:${contactPerson.phone}`} className="text-blue-600 hover:underline">
                          {contactPerson.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {!isCompleted && application.status === "ongoing" && (
              <Dialog open={isApplying} onOpenChange={setIsApplying}>
                <DialogTrigger asChild>
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    {t("apply")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{application.title}</DialogTitle>
                    <DialogDescription>{t("applicationFormDescription")}</DialogDescription>
                  </DialogHeader>

                  {showSuccess ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("applicationReceived")}</h3>
                      <p className="text-gray-600">{t("applicationSuccess", { title: application.title })}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t("fullName")}</Label>
                        <Input
                          id="name"
                          placeholder={t("fullNamePlaceholder")}
                          required
                          value={applicationForm.name}
                          onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("email")}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            required
                            value={applicationForm.email}
                            onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("phone")}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder={t("phonePlaceholder")}
                            required
                            value={applicationForm.phone}
                            onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">{t("experience")}</Label>
                        <Textarea
                          id="experience"
                          placeholder={t("experiencePlaceholder")}
                          rows={3}
                          value={applicationForm.experience}
                          onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation">{t("motivation")}</Label>
                        <Textarea
                          id="motivation"
                          placeholder={t("motivationPlaceholder")}
                          rows={4}
                          required
                          value={applicationForm.motivation}
                          onChange={(e) => setApplicationForm({ ...applicationForm, motivation: e.target.value })}
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsApplying(false)}>
                          {t("cancel")}
                        </Button>
                        <Button
                          type="submit"
                          className="text-white hover:opacity-90"
                          style={{ backgroundColor: "#571213" }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("submitting")}
                            </>
                          ) : (
                            t("submitApplication")
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface StatsSectionProps {
  applications: Application[];
  isCompleted?: boolean;
}

function StatsSection({ applications, isCompleted = false }: StatsSectionProps) {
  const t = useTranslations("applications")

  const totalApplications = applications.reduce((sum: number, app: Application) => {
    const value = isCompleted ? app.totalApplications : app.currentApplications
    return sum + (value || 0)
  }, 0)

  const totalPositions = applications.reduce((sum: number, app: Application) => {
    const value = isCompleted ? app.acceptedApplications : app.maxParticipants
    return sum + (value || 0)
  }, 0)

  const activeApplications = isCompleted
    ? applications.length
    : applications.filter((app: Application) => app.status === "ongoing").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="text-3xl font-bold mb-2" style={{ color: "#571213" }}>
            {totalApplications || "-"}
          </div>
          <div className="text-gray-700 font-medium">{t("totalApplications")}</div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">{totalPositions || "-"}</div>
          <div className="text-gray-700 font-medium">
            {isCompleted ? t("acceptedApplications") : t("targetParticipants")}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-2">{activeApplications}</div>
          <div className="text-gray-700 font-medium">
            {isCompleted ? t("completedPrograms") : t("activeApplications")}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default function ENDERApplicationsPage() {
  const t = useTranslations("applications")

  const items = t.raw("items") as { ongoing: Record<string, Application>, completed: Record<string, Application> }
  
  const ongoingApplications = items?.ongoing ? Object.values(items.ongoing) : []
  const completedApplications = items?.completed ? Object.values(items.completed) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full mr-4">
              <Accessibility className="h-12 w-12" style={{ color: "#571213" }} />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{t("pageTitle")}</h1>
              <p className="text-xl font-semibold" style={{ color: "#571213" }}>
                {t("pageSubtitle")}
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">{t("pageDescription")}</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" style={{ color: "#571213" }} />
                      <span className="text-sm font-semibold text-gray-700">{t("eurodeskContactPoint")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-semibold text-gray-700">{t("qualityLabel")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">{t("activeProjects")}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="mb-6 max-w-2xl mx-auto opacity-90">
                      <strong>{t("ourMission")}</strong> {t("mission")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="ongoing" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t("ongoingApplications")}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {t("completedApplications")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-8">
            <StatsSection applications={ongoingApplications} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {ongoingApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} isCompleted={false} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-8">
            <StatsSection applications={completedApplications} isCompleted={true} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {completedApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} isCompleted={true} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="text-white" style={{ background: "linear-gradient(to right, #571213, #2563eb)" }}>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">{t("contactUs")}</h2>
              <p className="mb-6 max-w-2xl mx-auto opacity-90">{t("contactDescription")}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">embracethebarriers@gmail.com</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">+905458149628</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Malatya, Türkiye</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}