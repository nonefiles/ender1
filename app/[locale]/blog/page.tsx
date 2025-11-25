"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, ChevronRight, ArrowLeft, BookOpen, Lightbulb, Plane, Coffee, Heart, User, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

interface BlogPost {
  id: number
  date: string
  category: string
  title: string
  excerpt: string
  content: string
  author: string
  readTime: string
  icon?: string
}

export default function BlogPage() {
  const t = useTranslations("blog")
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const blogCategories = ["all", "experience", "tips", "culture", "lifestyle"]

  const blogData: BlogPost[] = [
    {
      id: 1,
      date: "2 Kasım 2025",
      category: "tips",
      title: t("posts.1.title"),
      excerpt: t("posts.1.excerpt"),
      content: t("posts.1.content"),
      author: t("posts.1.author"),
      readTime: `7 ${t("readTime")}`,
      icon: "lightbulb"
    },
    {
      id: 2,
      date: "1 Kasım 2025",
      category: "experience",
      title: t("posts.2.title"),
      excerpt: t("posts.2.excerpt"),
      content: t("posts.2.content"),
      author: t("posts.2.author"),
      readTime: `10 ${t("readTime")}`,
      icon: "heart"
    }
  ]

  const openModal = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const filteredPosts = selectedCategoryKey === "all"
    ? blogData
    : blogData.filter((post) => post.category === selectedCategoryKey)

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'experience': return "from-pink-100 to-pink-200 text-pink-800"
      case 'tips': return "from-yellow-100 to-yellow-200 text-yellow-800"
      case 'culture': return "from-purple-100 to-purple-200 text-purple-800"
      case 'lifestyle': return "from-blue-100 to-blue-200 text-blue-800"
      default: return "from-gray-100 to-gray-200 text-gray-800"
    }
  }

  const getIconComponent = (icon?: string) => {
    switch(icon) {
      case 'plane': return <Plane className="h-12 w-12 text-[#671615]" />
      case 'lightbulb': return <Lightbulb className="h-12 w-12 text-[#671615]" />
      case 'heart': return <Heart className="h-12 w-12 text-[#671615]" />
      case 'coffee': return <Coffee className="h-12 w-12 text-[#671615]" />
      default: return <BookOpen className="h-12 w-12 text-[#671615]" />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="flex items-center text-[#671615] hover:bg-[#671615]/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("backButton")}
              </Button>
            </div>
            
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t("pageTitle")}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("pageDescription")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {blogCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategoryKey === category ? "default" : "outline"}
                  onClick={() => setSelectedCategoryKey(category)}
                  className={`text-sm transition-all flex items-center ${
                    selectedCategoryKey === category
                      ? 'bg-[#671615] hover:bg-[#581412] text-white'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {t(`categories.${category}`)}
                </Button>
              ))}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <div key={post.id} className="h-full">
                    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-none">
                      <div className="relative h-32 bg-gradient-to-br from-[#671615]/10 to-[#671615]/5 flex items-center justify-center">
                        {getIconComponent(post.icon)}
                        <div className="absolute top-3 right-3">
                          <Badge className={`bg-gradient-to-r ${getCategoryColor(post.category)}`}>
                            {t(`categoryLabels.${post.category}`)}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-[#671615]" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-[#671615]" />
                            {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4 pt-2">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <User className="h-4 w-4 mr-1 text-[#671615]" />
                          <span>{post.author}</span>
                        </div>
                        
                        <CardDescription className="text-gray-600 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>

                        <Button
                          variant="outline"
                          className="w-full border-[#671615] text-[#671615] hover:bg-[#671615]/10 mt-4"
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal(post)
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-500 mb-4">{t("noPosts")}</h3>
                <p className="text-gray-400">{t("tryOtherCategories")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div className="w-2 h-2 bg-[#671615] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-500">{selectedPost.date}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {selectedPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{selectedPost.title}</h2>
                  <div className="flex items-center text-gray-600 mb-6">
                    <User className="h-5 w-5 mr-2 text-[#671615]" />
                    <span className="font-medium">{selectedPost.author}</span>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors ml-4" aria-label={t("close")}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedPost.content}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{t("share")}</span>
                  <Button variant="outline" size="sm" className="text-[#671615] border-[#671615]">
                    <Heart className="h-4 w-4 mr-1" /> {t("like")}
                  </Button>
                </div>
                <Button onClick={closeModal} className="bg-[#671615] hover:bg-[#571414]">{t("close")}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}