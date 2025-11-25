"use client"
import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Users, Calendar, ChevronRight, X } from "lucide-react"
import { Link } from "@/i18n/routing"

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

const stkProjects: Project[] = [
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

function SearchPageContent() {
  const t = useTranslations("search")
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<Project[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const lowerQuery = query.toLowerCase()

    // Search through projects
    const results = stkProjects.filter((project) => {
      return (
        project.name.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.category.toLowerCase().includes(lowerQuery) ||
        project.location.toLowerCase().includes(lowerQuery) ||
        project.beneficiaries.toLowerCase().includes(lowerQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      )
    })

    setSearchResults(results)
    setIsSearching(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-600">{t("description")}</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative max-w-3xl">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="w-full pl-12 pr-12 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-[#671615] focus:ring-2 focus:ring-[#671615]/20 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </form>

        {/* Search Results */}
        {initialQuery && (
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              {searchResults.length > 0 ? (
                <>
                  <span className="font-semibold text-[#671615]">{searchResults.length}</span> {t("resultsFound")}{" "}
                  <span className="font-semibold">"{initialQuery}"</span>
                </>
              ) : (
                <>
                  {t("noResults")} <span className="font-semibold">"{initialQuery}"</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {searchResults.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-none">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-[#671615] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {project.status}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">{project.name}</CardTitle>
                    <Badge className="mt-2 bg-[#671615] text-white w-fit">{project.category}</Badge>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-2">
                    <CardDescription className="text-gray-600 line-clamp-3">{project.description}</CardDescription>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-[#671615]" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-[#671615]" />
                        <span className="line-clamp-1">{project.beneficiaries}</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <Calendar className="h-4 w-4 mr-2 text-[#671615]" />
                        <span>
                          {project.startDate} - {project.endDate || "Devam ediyor"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-gray-50 text-gray-700 border-gray-200 px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href="/projeler">
                      <Button
                        variant="outline"
                        className="w-full border-[#671615] text-[#671615] hover:bg-[#671615]/10 mt-4 bg-transparent"
                      >
                        {t("viewDetails")}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : initialQuery ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t("noResultsTitle")}</h3>
              <p className="text-gray-600 mb-6">{t("noResultsDescription")}</p>
              <Link href="/projeler">
                <Button className="bg-[#671615] hover:bg-[#581412] text-white">
                  {t("browseProjects")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t("startSearching")}</h3>
            <p className="text-gray-600">{t("startSearchingDescription")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xl text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  )
}
