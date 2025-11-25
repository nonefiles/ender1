"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image?: string
  date: string
  slug: string
}

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations()

  const blogPosts = [
    {
      id: 1,
      title: t("blog.posts.1.title"),
      excerpt: t("blog.posts.1.excerpt"),
      date: "2 Kasım 2025",
      slug: "aile-ici-siddet"
    },
    {
      id: 2,
      title: t("blog.posts.2.title"),
      excerpt: t("blog.posts.2.excerpt"),
      date: "1 Kasım 2025",
      slug: "masal-terapi"
    }
  ]

  const openModal = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto" // Cleanup on unmount
    }
  }, [])

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">{t("homepage.blog.title")}</h2>
          <p className="text-xl text-black">{t("homepage.blog.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-center h-48 bg-[#671615]/10">
                <BookOpen className="h-16 w-16 text-[#671615]" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-black">{post.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">{post.excerpt}</p>
                <div className="mt-auto flex gap-2">
                  <div
                    onClick={() => openModal(post)}
                    className="p-0 h-auto font-medium text-[#671615] justify-start flex items-center cursor-pointer hover:underline"
                  >
                    {t("homepage.blog.readMore")}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
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
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="flex items-center justify-center h-48 bg-[#671615]/10 rounded-t-2xl">
                  <BookOpen className="h-20 w-20 text-[#671615]" />
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                  aria-label={t("homepage.blog.close")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="text-sm text-gray-500 mb-2">{selectedPost.date}</div>
                <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
                <div className="prose max-w-none">
                  {/* Use translation key dynamically */}
                  <p className="text-gray-700 whitespace-pre-line">
                    {t(`blog.posts.${selectedPost.id}.content`)}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <Link href="/blog">
                    <Button className="bg-[#671615] hover:bg-[#571414] flex items-center">
                      {t("navigation.blog")}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={closeModal}>
                    {t("homepage.blog.close")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}