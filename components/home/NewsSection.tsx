"use client"

import { useTranslations } from "next-intl"
import type { EventItem } from "@/data/events"
import { Link } from "@/i18n/routing"
import { motion } from "framer-motion"
import { ChevronRight, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsSectionProps {
  events: EventItem[]
}

export function NewsSection({ events }: NewsSectionProps) {
  const t = useTranslations()

  const news = [
    { 
      id: 1, 
      date: t("homepage.news.items.1.date"), 
      categoryType: "announcement", 
      title: t("homepage.news.items.1.title") 
    },
    { 
      id: 2, 
      date: t("homepage.news.items.2.date"), 
      categoryType: "announcement", 
      title: t("homepage.news.items.2.title") 
    },
    { 
      id: 3, 
      date: t("homepage.news.items.3.date"), 
      categoryType: "event", 
      title: t("homepage.news.items.3.title") 
    },
    { 
      id: 4, 
      date: t("homepage.news.items.4.date"), 
      categoryType: "announcement", 
      title: t("homepage.news.items.4.title") 
    }
  ]

  // Create localized events list manually for the homepage
  const upcomingEvents = [
    {
      id: 1,
      title: t("events.items.1.title"),
      location: t("events.items.1.location"),
      time: t("events.items.1.time"),
      day: t("events.items.1.day"),
      month: t("events.items.1.month"),
    },
    {
      id: 2,
      title: t("events.items.2.title"),
      location: t("events.items.2.location"),
      time: t("events.items.2.time"),
      day: t("events.items.2.day"),
      month: t("events.items.2.month"),
    },
    {
      id: 3,
      title: t("events.items.3.title"),
      location: t("events.items.3.location"),
      time: t("events.items.3.time"),
      day: t("events.items.3.day"),
      month: t("events.items.3.month"),
    },
    {
      id: 4,
      title: t("events.items.4.title"),
      location: t("events.items.4.location"),
      time: t("events.items.4.time"),
      day: t("events.items.4.day"),
      month: t("events.items.4.month"),
    },
  ]

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case "news":
        return t("homepage.news.categories.news")
      case "announcement":
        return t("homepage.news.categories.announcement")
      case "event":
        return t("homepage.news.categories.event")
      default:
        return type
    }
  }

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "news":
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
      case "announcement":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white"
      case "event":
        return "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News Cards */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t("homepage.news.title")}</h2>
              <Link href="/haberler">
                <Button variant="outline" size="sm">
                  {t("homepage.news.seeAll")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#671615]/20"
                >
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.categoryType)}`}
                    >
                      {getCategoryLabel(item.categoryType)}
                    </span>
                  </div>

                  <div className="pr-20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-[#671615] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#671615] transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <Link href="/haberler">
                      <div className="flex items-center text-[#671615] font-medium text-sm hover:underline">
                        {t("homepage.news.readDetails")}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-[#671615]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Events Timeline */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t("homepage.news.eventsTitle")}</h2>
              <Link href="/etkinlikler">
                <Button variant="outline" size="sm">
                  {t("homepage.news.allEvents")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#671615]/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-center bg-[#671615] text-white rounded-lg p-3 min-w-[70px]">
                      <div className="text-2xl font-bold">{event.day}</div>
                      <div className="text-sm">{event.month}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm gap-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.time}
                        </span>
                      </div>
                      <Link href="/etkinlikler">
                        <Button variant="link" className="p-0 h-auto text-[#671615] mt-2">
                          {t("homepage.news.details")}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}