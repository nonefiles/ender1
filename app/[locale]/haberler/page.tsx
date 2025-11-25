"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, ChevronRight, Newspaper, Megaphone, Globe, Users, Heart } from "lucide-react"
import { useTranslations } from "next-intl"

interface NewsItem {
  id: number
  date: string
  category: string
  title: string
  excerpt: string
  content: string
  icon?: string
}

export default function NewsPage() {
  const t = useTranslations("news")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const newsCategories = [
    { key: "all", label: t("categories.all") },
    { key: "News", label: t("categories.News") },
    { key: "Announcement", label: t("categories.Announcement") },
    { key: "Event", label: t("categories.Event") }
  ]

  // News data populated from translations
  const newsData: NewsItem[] = [
    {
      id: 1,
      date: "9 Ağustos 2025",
      category: "News",
      title: t("items.1.title"),
      excerpt: t("items.1.excerpt"),
      content: t("items.1.content"),
      icon: "globe"
    },
    {
      id: 2,
      date: "28 Eylül 2025",
      category: "Announcement",
      title: t("items.2.title"),
      excerpt: t("items.2.excerpt"),
      content: t("items.2.content"),
      icon: "users"
    },
    {
      id: 3,
      date: "Ekim 2025",
      category: "Event",
      title: t("items.3.title"),
      excerpt: t("items.3.excerpt"),
      content: t("items.3.content"),
      icon: "globe"
    },
    {
      id: 4,
      date: "Ekim 2025",
      category: "Event",
      title: t("items.4.title"),
      excerpt: t("items.4.excerpt"),
      content: t("items.4.content"),
      icon: "users"
    }
  ]

  const openModal = (news: NewsItem) => {
    setSelectedNews(news)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const filteredNews = selectedCategory === "all"
    ? newsData
    : newsData.filter((news) => news.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'News': return "from-blue-100 to-blue-200 text-blue-800"
      case 'Announcement': return "from-green-100 to-green-200 text-green-800"
      case 'Event': return "from-purple-100 to-purple-200 text-purple-800"
      default: return "from-gray-100 to-gray-200 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    return t(`categories.${category}`)
  }

  const getIconComponent = (icon?: string) => {
    switch(icon) {
      case 'globe': return <Globe className="h-12 w-12 text-[#671615]" />
      case 'users': return <Users className="h-12 w-12 text-[#671615]" />
      case 'heart': return <Heart className="h-12 w-12 text-[#671615]" />
      default: return <Newspaper className="h-12 w-12 text-[#671615]" />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t("pageTitle")}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("pageDescription")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {newsCategories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`text-sm transition-all flex items-center ${
                    selectedCategory === category.key
                      ? 'bg-[#671615] hover:bg-[#581412] text-white'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <div key={news.id} className="h-full">
                  <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-none">
                    <div className="relative h-32 bg-gradient-to-br from-[#671615]/10 to-[#671615]/5 flex items-center justify-center">
                      {getIconComponent(news.icon)}
                      <div className="absolute top-3 right-3">
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(news.category)}`}>
                          {getCategoryLabel(news.category)}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2 text-[#671615]" />
                        {news.date}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                        {news.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-2">
                      <CardDescription className="text-gray-600 line-clamp-3">
                        {news.excerpt}
                      </CardDescription>

                      <Button 
                        variant="outline"
                        className="w-full border-[#671615] text-[#671615] hover:bg-[#671615]/10 mt-4"
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(news)
                        }}
                      >
                        {t("readMore")}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Detail Modal */}
      {isModalOpen && selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#671615] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-500">{selectedNews.date}</span>
                    <Badge className={`ml-2 ${getCategoryColor(selectedNews.category)}`}>
                      {getCategoryLabel(selectedNews.category)}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedNews.title}</h2>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={t("close")}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{selectedNews.content}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <Button 
                  onClick={closeModal}
                  className="bg-[#671615] hover:bg-[#571414]"
                >
                  {t("close")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}