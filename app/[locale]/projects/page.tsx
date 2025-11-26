"use client"
import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Users, Heart, BookOpen, ChevronRight, Calendar, GraduationCap, Mail, Phone } from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  category: string
  location: string
  beneficiaries: string
  status: string
  startDate: string
  endDate?: string
  image: string
  tags: string[]
  progress: number
}

interface ProjectCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
}

const getProjectCategories = (t) => [
  t("categories.all"),
  t("categories.youthWorkerMobility"),
  t("categories.youthExchange"),
  t("categories.europeanSolidarityCorps"),
  t("categories.socialInclusion"),
  t("categories.internationalPartnership"),
  t("categories.europeanSolidarityCorps2"),
  t("categories.capacityBuilding"),
]

const getCategoryTranslations = (t) => ({
  "Gençlik Çalışanları Hareketliliği": t("categories.youthWorkerMobility"),
  "Gençlik Değişimi": t("categories.youthExchange"),
  "European Solidarity Corps": t("categories.europeanSolidarityCorps"),
  "Sosyal İçerme": t("categories.socialInclusion"),
  "Uluslararası Ortaklık": t("categories.internationalPartnership"),
  "Avrupa Dayanışma Korunun": t("categories.europeanSolidarityCorps2"),
  "Kapasitesi Geliştirme": t("categories.capacityBuilding"),
})

const getStatusTranslations = (t) => ({
  Tamamlandı: t("statuses.completed"),
  "Devam Ediyor": t("statuses.ongoing"),
  Aktif: t("statuses.active"),
})

const stkProjects = [
  // Onaylanmış ve Devam Eden Projeler
  {
    id: 1,
    name: "BRIDGE: Building Resources for Inclusive Development, Guidance and Engagement for Disabled People",
    description:
      "2025 yılı 1. başvuru döneminde Gençlik Çalışanları Hareketliliği kapsamında başvurusunu yaptığımız 2025-1-TR01-KA153-YOU-000298857 numaralı projemiz onaylandı! Engelli bireyler için kapsayıcı gelişim, rehberlik ve katılım kaynakları oluşturmaya odaklanan bu proje ile gençlik çalışanlarının kapasitelerini artırmayı hedefliyoruz.",
    category: "Gençlik Çalışanları Hareketliliği",
    location: "Uluslararası",
    beneficiaries: "Gençlik Çalışanları ve Engelli Bireyler",
    status: "Devam Ediyor",
    startDate: "2025",
    endDate: "2026",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    tags: ["Gençlik Çalışanları", "Kapsayıcılık", "Engelli Hakları"],
    progress: 75,
  },
  {
    id: 2,
    name: "Gençlik Değişimi - Toplumsal Dönüşüm",
    description:
      "2025-1-TR01-KA154-YOU-000301604 numaralı Gençlik Değişimi projesi partner olarak onaylanmıştır. Bu proje kapsamında gençler arasında kültürlerarası diyalog ve toplumsal katılımı güçlendirmeye odaklanıyoruz.",
    category: "Gençlik Değişimi",
    location: "Türkiye ve Ortaklar",
    beneficiaries: "18-30 yaş arası gençler",
    status: "Devam Ediyor",
    startDate: "2025",
    endDate: "2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    tags: ["Kültürlerarası Diyalog", "Gençlik Katılımı", "Sosyal Değişim"],
    progress: 60,
  },
  {
    id: 3,
    name: "European Solidarity Corps - Kalite Etiketi",
    description:
      "2024-1-TR01-ESC50-QLA-000296489 numaralı European Solidarity Corps Kalite Etiketi akreditasyonumuz onaylanmıştır. Bu akreditasyon ile gönüllülük projelerinde daha geniş bir ağda yer almaktayız.",
    category: "European Solidarity Corps",
    location: "Avrupa",
    beneficiaries: "Gönüllüler ve Toplum",
    status: "Aktif",
    startDate: "2024",
    endDate: "Sürekli",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    tags: ["Gönüllülük", "Dayanışma", "Avrupa Projesi"],
    progress: 100,
  },
  {
    id: 4,
    name: "Sosyal İçerme ve Katılım Projesi",
    description:
      "2024-3-TR01-KA154-YOU-000273889 ve 2024-3-TR01-KA154-YOU-000287249 numaralı projeler kapsamında dezavantajlı grupların toplumsal katılımını artırmaya yönelik çalışmalar yürütülmektedir.",
    category: "Sosyal İçerme",
    location: "Malatya ve İl geneli",
    beneficiaries: "Dezavantajlı Gruplar",
    status: "Devam Ediyor",
    startDate: "2024",
    endDate: "2025",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop",
    tags: ["Sosyal İçerme", "Eşitlik", "Toplumsal Katılım"],
    progress: 80,
  },
  {
    id: 5,
    name: "Uluslararası Ortaklık Projesi - Polonya",
    description:
      "2025-1-PL01-KA152-YOU-000302153 ve 2024-3-PL01-KA153-YOU-000283666 numaralı Polonya koordinatörlüğündeki projelerde partner olarak yer alıyoruz. Gençlik alanında uluslararası işbirlikleri geliştiriyoruz.",
    category: "Uluslararası Ortaklık",
    location: "Polonya - Türkiye",
    beneficiaries: "Gençler ve Gençlik Çalışanları",
    status: "Devam Ediyor",
    startDate: "2024-2025",
    endDate: "2025-2026",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    tags: ["Uluslararası İşbirliği", "Gençlik", "Ortaklık"],
    progress: 70,
  },
  {
    id: 6,
    name: "Avrupa Dayanışma Korunun (ESC) Gönüllülük Projesi",
    description:
      "2024-3-TR01-KA210-YOU-000285989 numaralı ESC projesi kapsamında gençlerin gönüllülük deneyimi yaşamaları ve toplumsal fayda yaratmaları sağlanmaktadır. Proje koordinatörlüğümüz altında yürütülmektedir.",
    category: "Avrupa Dayanışma Korunun",
    location: "Malatya, Türkiye",
    beneficiaries: "18-30 yaş gönüllüler",
    status: "Devam Ediyor",
    startDate: "2024",
    endDate: "2025",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    tags: ["Gönüllülük", "ESC", "Toplumsal Etki"],
    progress: 85,
  },
  // Tamamlanmış Projeler
  {
    id: 7,
    name: "Gençlik Çalışanları Kapasitesi Geliştirme",
    description:
      "2024-1-TR01-KA152-YOU-000217945 numaralı proje tamamlanmıştır. Gençlik çalışanlarının mesleki kapasitelerinin artırılması ve engelli bireylerle çalışma becerilerinin geliştirilmesi hedeflenmiştir.",
    category: "Kapasitesi Geliştirme",
    location: "Türkiye",
    beneficiaries: "Gençlik Çalışanları",
    status: "Tamamlandı",
    startDate: "2024",
    endDate: "2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    tags: ["Kapasitesi Geliştirme", "Mesleki Gelişim", "Eğitim"],
    progress: 100,
  },
  {
    id: 8,
    name: "Uluslararası Gençlik Ortaklığı - Polonya",
    description:
      "2023-3-PL01-KA152-YOU-000183478 numaralı Polonya koordinatörlüğündeki proje başarıyla tamamlanmıştır. Kültürlerarası öğrenme ve gençlik katılımı konularında deneyim kazanılmıştır.",
    category: "Uluslararası Ortaklık",
    location: "Polonya-Türkiye",
    beneficiaries: "Gençler ve Eğitimciler",
    status: "Tamamlandı",
    startDate: "2023",
    endDate: "2024",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    tags: ["Kültürlerarası Öğrenme", "Gençlik Katılımı", "İşbirliği"],
    progress: 100,
  },
  {
    id: 9,
    name: "İlk Koordinatörlük Projesi - Gençlik Değişimi",
    description:
      "2023-2-TR01-KA155-YOU-000179493 numaralı ilk koordinatörlük projemiz başarıyla sürdürülmektedir. Engelsiz yaşam ve toplumsal farkındalık konularında gençlik değişimi gerçekleştirilmektedir.",
    category: "Gençlik Değişimi",
    location: "Türkiye ve Avrupa",
    beneficiaries: "Genç Yetişkinler",
    status: "Devam Ediyor",
    startDate: "2023",
    endDate: "2025",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    tags: ["İlk Proje", "Koordinatörlük", "Engelsiz Yaşam"],
    progress: 90,
  },
]

function CategoryFilters({ selectedCategory, setSelectedCategory }) {
  const t = useTranslations("projects")
  const projectCategories = getProjectCategories(t)

  const categoryIcons = {
    [t("categories.youthWorkerMobility")]: <Users className="h-4 w-4 mr-1" />,
    [t("categories.youthExchange")]: <Heart className="h-4 w-4 mr-1" />,
    [t("categories.europeanSolidarityCorps")]: <MapPin className="h-4 w-4 mr-1" />,
    [t("categories.socialInclusion")]: <Users className="h-4 w-4 mr-1" />,
    [t("categories.internationalPartnership")]: <BookOpen className="h-4 w-4 mr-1" />,
    [t("categories.europeanSolidarityCorps2")]: <Heart className="h-4 w-4 mr-1" />,
    [t("categories.capacityBuilding")]: <GraduationCap className="h-4 w-4 mr-1" />,
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {projectCategories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => setSelectedCategory(category)}
          className={`text-sm transition-all flex items-center ${
            selectedCategory === category
              ? "bg-[#671615] hover:bg-[#581412] text-white"
              : "border-gray-300 hover:bg-gray-50 text-gray-700"
          }`}
        >
          {category !== t("categories.all") && categoryIcons[category]}
          {category}
        </Button>
      ))}
    </div>
  )
}

function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const t = useTranslations("projects")
  const categoryTranslations = getCategoryTranslations(t)
  const statusTranslations = getStatusTranslations(t)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Gençlik Çalışanları Hareketliliği":
        return "from-blue-100 to-blue-200 text-blue-800"
      case "Gençlik Değişimi":
        return "from-green-100 to-green-200 text-green-800"
      case "European Solidarity Corps":
        return "from-purple-100 to-purple-200 text-purple-800"
      case "Sosyal İçerme":
        return "from-red-100 to-red-200 text-red-800"
      case "Uluslararası Ortaklık":
        return "from-yellow-100 to-yellow-200 text-yellow-800"
      case "Avrupa Dayanışma Korunun":
        return "from-indigo-100 to-indigo-200 text-indigo-800"
      case "Kapasitesi Geliştirme":
        return "from-orange-100 to-orange-200 text-orange-800"
      default:
        return "from-gray-100 to-gray-200 text-gray-800"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-none">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.status === "Tamamlandı" && (
            <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {statusTranslations[project.status]}
            </div>
          )}
          {project.status === "Devam Ediyor" && (
            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {statusTranslations[project.status]}
            </div>
          )}
          {project.status === "Aktif" && (
            <div className="absolute top-3 right-3 bg-[#671615] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {statusTranslations[project.status]}
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">{project.name}</CardTitle>
              <Badge className={`mt-2 bg-gradient-to-r ${getCategoryColor(project.category)}`}>
                {categoryTranslations[project.category] || project.category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <CardDescription className="text-gray-600 line-clamp-3">{project.description}</CardDescription>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-[#671615]" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-[#671615]" />
              <span>{project.beneficiaries}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#671615]" />
              <span>
                {project.startDate} - {project.endDate || "Devam ediyor"}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-[#671615] h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
              </div>
              <span className="ml-2 text-xs">{project.progress}%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200 px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full border-[#671615] text-[#671615] hover:bg-[#671615]/10 mt-4 bg-transparent"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails(project)
            }}
          >
            {t("projectDetails")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ProjectsSection() {
  const t = useTranslations("projects")
  const projectCategories = getProjectCategories(t)
  const categoryTranslations = getCategoryTranslations(t)
  const statusTranslations = getStatusTranslations(t)

  const [selectedCategory, setSelectedCategory] = useState(t("categories.all"))
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const filteredProjects =
    selectedCategory === t("categories.all")
      ? stkProjects
      : stkProjects.filter((project) => categoryTranslations[project.category] === selectedCategory)

  const categoryIcons: Record<string, React.ReactNode> = {
    [t("categories.youthWorkerMobility")]: <Users className="w-4 h-4 mr-2" />,
    [t("categories.youthExchange")]: <Heart className="w-4 h-4 mr-2" />,
    [t("categories.europeanSolidarityCorps")]: <MapPin className="w-4 h-4 mr-2" />,
    [t("categories.socialInclusion")]: <Users className="w-4 h-4 mr-2" />,
    [t("categories.internationalPartnership")]: <BookOpen className="w-4 h-4 mr-2" />,
    [t("categories.europeanSolidarityCorps2")]: <Heart className="w-4 h-4 mr-2" />,
    [t("categories.capacityBuilding")]: <GraduationCap className="w-4 h-4 mr-2" />,
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t("pageTitle")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("pageDescription")}</p>
        </div>

        <CategoryFilters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        {filteredProjects.length > 0 ? (
          <>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onViewDetails={openModal} />
              ))}
            </motion.div>

            {/* Project Detail Modal */}
            <AnimatePresence>
              {isModalOpen && selectedProject && (
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
                    className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h2>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#671615] text-white">
                              {categoryTranslations[selectedProject.category] || selectedProject.category}
                            </Badge>
                            {selectedProject.status === "Tamamlandı" && (
                              <Badge className="bg-green-600 text-white">
                                {statusTranslations[selectedProject.status]}
                              </Badge>
                            )}
                            {selectedProject.status === "Devam Ediyor" && (
                              <Badge className="bg-blue-600 text-white">
                                {statusTranslations[selectedProject.status]}
                              </Badge>
                            )}
                            {selectedProject.status === "Aktif" && (
                              <Badge className="bg-[#671615] text-white">
                                {statusTranslations[selectedProject.status]}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={closeModal}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={t("close")}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div>
                          <img
                            src={selectedProject.image || "/placeholder.svg"}
                            alt={selectedProject.name}
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{t("about")}</h3>
                            <p className="text-gray-700 whitespace-pre-line">{selectedProject.description}</p>
                          </div>

                          <div className="space-y-4 pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-[#671615] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">{t("location")}</p>
                                  <p>{selectedProject.location}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Users className="h-5 w-5 text-[#671615] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">{t("beneficiaries")}</p>
                                  <p>{selectedProject.beneficiaries}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Calendar className="h-5 w-5 text-[#671615] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-gray-500">{t("start")}</p>
                                  <p>{selectedProject.startDate}</p>
                                </div>
                              </div>
                              {selectedProject.endDate && (
                                <div className="flex items-start gap-2">
                                  <Calendar className="h-5 w-5 text-[#671615] mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">{t("end")}</p>
                                    <p>{selectedProject.endDate}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedProject.tags && selectedProject.tags.length > 0 && (
                        <div className="mt-8 pt-6 border-t">
                          <h3 className="text-lg font-semibold mb-4">{t("projectTags")}</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1 text-sm"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-500 mb-4">{t("noCategoryProjects")}</h3>
            <p className="text-gray-400">{t("checkOtherCategories")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function VolunteerCTA() {
  const t = useTranslations("projects")

  return (
    <section className="py-20 bg-[#671615] text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#671615] hover:bg-gray-100">
              <Mail className="mr-2 h-5 w-5" />
              {t("cta.contact")}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" />
              {t("cta.call")}
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-lg mb-4">{t("cta.contactUs")}</p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:embracethebarriers@gmail.com"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a href="mailto:engelleriasin44@gmail.com" className="text-white hover:text-gray-200 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://www.engelleriasin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <BookOpen className="h-6 w-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function STKProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectsSection />
      <VolunteerCTA />
    </div>
  )
}
