"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail, Linkedin, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
  email: string;
  phone: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  contactLabel: string;
}

/**
 * Ekip üyesinin detaylarını daire içinde görsel ve modern kart ile gösteren bileşen.
 * @component
 */
export default function TeamMemberCard({ member, index, contactLabel }: TeamMemberCardProps) {
  const primaryColor = "#671615"; // Kurumsal Bordo
  const lightColor = "#fef2f2"; // Açık Bordo tonu

  return (
    // Daha belirgin gölge, beyaz zemin
    <Card className="flex flex-col border-none shadow-xl rounded-xl overflow-hidden dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="relative flex flex-col items-center justify-center p-0 pt-10 pb-16" style={{ backgroundColor: lightColor }}>
        
        {/* Dairesel Görsel Bölümü */}
        <div className="relative w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden z-10">
          <Image
            src={member.image || "/placeholder-user.jpg"}
            alt={`${member.name} - ${member.role}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "/placeholder-user.jpg";
            }}
          />
        </div>

        {/* Rol Bandı (Görselin hemen altında) */}
        <div className="absolute bottom-0 w-full py-2 text-center bg-gray-100 dark:bg-gray-700 shadow-inner">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {member.role}
            </p>
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-6 text-center">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 mb-3">
          {member.name}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm italic line-clamp-4">
          {member.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex flex-col items-center p-6 border-t border-gray-100 dark:border-gray-700">
        
        {/* Sosyal Medya İkonları */}
        <div className="flex space-x-3 mb-4">
          {member.linkedin && member.linkedin !== '#' && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className={`text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white hover:bg-[${primaryColor}] rounded-full`}>
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`}>
              <Button variant="ghost" size="icon" className={`text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white hover:bg-[${primaryColor}] rounded-full`}>
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          )}
        </div>
        
        {/* İletişim Butonu */}
        <Button 
          style={{ backgroundColor: primaryColor }} 
          className="text-white hover:bg-[#852a2a] dark:bg-gray-700 dark:hover:bg-gray-600 font-medium rounded-full shadow-md w-full"
        >
          {contactLabel} <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}