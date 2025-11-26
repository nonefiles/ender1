"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, MapPin, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// --- TYPES ---

export type EventItem = {
  id: number
  day: string
  month: string
  category: "upcoming" | "past"
  image?: string
}

// --- MOCK DATA ---
// Metinler translation dosyalarından çekildiği için burada sadece yapısal veriler var.
const events: EventItem[] = [
  {
    id: 1,
    day: "13",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/erasmus.jpg"
  },
  {
    id: 2,
    day: "14",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/kano.jpg"
  },
  {
    id: 3,
    day: "15",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/linkedin.png"
  },
  {
    id: 4,
    day: "16",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/boyama.jpg"
  },
  {
    id: 5,
    day: "17",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/atbinme.jpg"
  },
  {
    id: 6,
    day: "18",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/cv.jpg"
  },
  {
    id: 7,
    day: "26",
    month: "Eki",
    category: "upcoming",
    image: "/event-images/depremzedeler.jpg"
  },
  {
    id: 8,
    day: "15",
    month: "Eyl",
    category: "past",
    image: "https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
  },
  {
    id: 9,
    day: "10",
    month: "Eki",
    category: "past",
    image: "https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
  },
  {
    id: 10,
    day: "25",
    month: "Ara",
    category: "upcoming",
    image: "https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
  }
]

// --- HELPERS ---
const formatDate = (day: string, month: string, t: any) => {
  return `${day} ${t(`months.${month}`)} 2025`
}

// --- COMPONENTS ---

function CategoryFilters({ selectedCategory, setSelectedCategory, t }: { selectedCategory: string, setSelectedCategory: (cat: string) => void, t: any }) {
  const eventCategories = [
    { key: "all", label: t("categories.all") },
    { key: "upcoming", label: t("categories.upcoming") },
    { key: "past", label: t("categories.past") }
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {eventCategories.map((category) => (
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
  )
}

function EventCard({ event, onViewDetails, t }: { event: EventItem, onViewDetails: (e: EventItem) => void, t: any }) {
  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-none">
        <div className="relative h-48 w-full">
          <img
            src={event.image || "/placeholder.jpg"}
            alt={t(`items.${event.id}.title`)}
            className="w-full h-full object-cover absolute inset-0"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
            }}
          />
          <div className="absolute top-3 right-3">
             <Badge className="bg-white/90 text-black hover:bg-white">
               {event.category === 'upcoming' ? t("badges.upcoming") : t("badges.completed")}
             </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-2 text-[#671615]" />
            {formatDate(event.day, event.month, t)}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
            {t(`items.${event.id}.title`)}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-[#671615]" />
              <span className="line-clamp-1">{t(`items.${event.id}.location`)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-[#671615]" />
              <span>{t(`items.${event.id}.time`)}</span>
            </div>
          </div>

          <CardDescription className="text-gray-600 line-clamp-3">
            {t(`items.${event.id}.description`)}
          </CardDescription>

          <Button
            variant="outline"
            className="w-full border-[#671615] text-[#671615] hover:bg-[#671615]/10 mt-4"
            onClick={() => onViewDetails(event)}
          >
            {t("readMore")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// 3. MAIN PAGE COMPONENT
export default function EventsPage() {
  // Düzeltme: Çeviri anahtarını "eurodesk.events" olarak güncelledim
  const t = useTranslations("eurodesk.events");
  
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (event: EventItem) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sayfa içeriği, layout.tsx'teki global navbar'ın altına gelecektir */}
      <div className="container mx-auto py-12 px-4">
        <div className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t("pageTitle")}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("pageDescription")}
              </p>
            </div>

            <CategoryFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              t={t}
            />

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-500 mb-4">{t("noEvents")}</h3>
                <p className="text-gray-400">{t("noEventsDescription")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pop-up (Modal) - Çeviri Entegre Edildi */}
      {selectedEvent && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md p-6 rounded-lg bg-white">
            <DialogHeader className="text-center mb-4">
              <DialogTitle className="text-2xl font-bold text-gray-900">{t(`items.${selectedEvent.id}.title`)}</DialogTitle>
              <DialogDescription className="text-gray-600 pt-2">{t(`items.${selectedEvent.id}.description`)}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-gray-700">
               <div className="flex items-center text-sm p-3 bg-gray-50 rounded-lg">
                 <Calendar className="h-5 w-5 mr-3 text-[#671615]" />
                 <div>
                   <strong className="block text-xs text-gray-500 uppercase tracking-wide">{t("modal.requirements")}</strong>
                   <span>{formatDate(selectedEvent.day, selectedEvent.month, t)} - {t(`items.${selectedEvent.id}.time`)}</span>
                 </div>
               </div>
               <div className="flex items-center text-sm p-3 bg-gray-50 rounded-lg">
                 <MapPin className="h-5 w-5 mr-3 text-[#671615]" />
                 <div>
                   <strong className="block text-xs text-gray-500 uppercase tracking-wide">{t("modal.location")}</strong>
                   <span>{t(`items.${selectedEvent.id}.location`)}</span>
                 </div>
               </div>
            </div>
            <DialogFooter className="flex justify-center pt-2">
              <Button onClick={() => setIsModalOpen(false)} className="bg-[#671615] hover:bg-[#581412] text-white w-full sm:w-auto">
                {t("modal.close")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}