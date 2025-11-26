"use client"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description: string
  imageUrl?: string
}

const PageHeader = ({
  title,
  description,
  imageUrl = "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=400&fit=crop", // Genel bir varsayılan resim
}: PageHeaderProps) => {
  return (
    <section className="relative h-[40vh] bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default PageHeader
