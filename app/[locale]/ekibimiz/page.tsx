"use client"

import { motion } from "framer-motion"
import {
  Users,
  Award,
  HeartHandshake,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Instagram
} from "lucide-react"
import { ChevronRight } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

// NOTE: Normally images would come from a CMS or API. 
// Here we map images to IDs for demo purposes.
const memberImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
  3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
  4: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
  5: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
  6: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop"
}

export default function TeamPage() {
  const t = useTranslations("team")

  const leadershipTeam = [
    {
      id: 1,
      name: "Abdulsamet Kezer",
      role: t("members.1.role"),
      bio: t("members.1.bio"),
      image: memberImages[1],
      email: "abdulsametkezer4@gmail.com",
      phone: "+905399525689",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      id: 2,
      name: "Safa Okay",
      role: t("members.2.role"),
      bio: t("members.2.bio"),
      image: memberImages[2],
      email: "safaokay27@gmail.com",
      phone: "+905458149628",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      id: 3,
      name: "Mahmut Talha Nurlan",
      role: t("members.3.role"),
      bio: t("members.3.bio"),
      image: memberImages[3],
      email: "talhanurlan@gmail.com",
      phone: "+905534860320",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    }
  ]

  const coordinators = [
    { id: 4, name: "Beyza Nur Acıl", role: t("members.4.role"), image: memberImages[4] },
    { id: 5, name: "Ceyda Gülendam Doğan", role: t("members.5.role"), image: memberImages[5] },
    { id: 6, name: "Tuğba Karadaş", role: t("members.6.role"), image: memberImages[6] }
  ]

  const workingGroups = [
    {
      name: t("groups.project"),
      icon: Award,
      coordinator: "Kader Doğru",
      members: ["Ahmet Samed Yıldırım", "Emre Ersin"]
    },
    {
      name: t("groups.english"),
      icon: GraduationCap,
      coordinator: "Alperen Şanlıtürk",
      members: ["Esra Ök", "Süveybe Rana", "Berivan"]
    },
    {
      name: t("groups.psychology"),
      icon: HeartHandshake,
      coordinator: "Dilara Kaşlıoğlu",
      members: ["Ali Yapıcı", "Gizem Karagöz", "Nisanur"]
    },
    {
      name: t("groups.special"),
      icon: Users,
      coordinator: "Enes Can Değirmenci",
      members: ["Berk Emin Güneri", "Salih Turhan"]
    },
    {
      name: t("groups.volunteer"),
      icon: MapPin,
      coordinator: "Rahime Efna Erdem",
      members: ["Tuanna", "Meryem Elif Nurlan"]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t("pageTitle")}
        description={t("pageDescription")}
        imageUrl="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&h=400&fit=crop"
      />
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-4xl font-bold mb-4 text-center text-gray-900">
            {t("leadershipTitle")}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto text-center">
            {t("leadershipSubtitle")}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {leadershipTeam.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} showDetails />
            ))}
          </div>

          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-3xl font-bold mb-12 text-center text-gray-900">
            {t("coordinatorsTitle")}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coordinators.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-4xl font-bold mb-4 text-center text-gray-900">
            {t("workingGroupsTitle")}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
            {t("workingGroupsSubtitle")}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workingGroups.map((group, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-50 rounded-lg"><group.icon className="h-8 w-8 text-[#671615]" /></div>
                  <div className="flex-1"><h3 className="text-xl font-bold text-gray-900 mb-1">{group.name}</h3></div>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">{t("groups.coordinator")}</p>
                  <p className="text-[#671615] font-medium">{group.coordinator}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">{t("groups.members")}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.members.map((member, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{member}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function TeamCard({ member, index, showDetails = false }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 py-8">
        <div className="p-4 bg-white rounded-full shadow-md"><Users className="h-12 w-12 text-[#671615]" /></div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 text-gray-900">{member.name}</h3>
        <p className="text-[#671615] font-medium text-sm mb-1">{member.role}</p>
        {showDetails && member.bio && <p className="text-gray-600 text-xs line-clamp-3 mb-3">{member.bio}</p>}
        {showDetails && member.email && (
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex items-center gap-2 mb-2"><Mail className="h-3 w-3 text-[#671615]" /><span className="text-xs text-gray-600">{member.email}</span></div>
            <div className="flex items-center gap-2 mb-3"><Phone className="h-3 w-3 text-[#671615]" /><span className="text-xs text-gray-600">{member.phone}</span></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}