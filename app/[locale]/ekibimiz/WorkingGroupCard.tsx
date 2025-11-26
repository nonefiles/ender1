"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Icon, Globe, HeartHandshake, MapPin, GraduationCap, Award } from "lucide-react"; 
import React from "react";
import { LucideProps } from "lucide-react"; 

// Lucide Icon Map: String anahtarları gerçek ikon bileşenlerine eşleştirir.
const ICON_MAP: { [key: string]: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>> } = {
  Globe: Globe,
  HeartHandshake: HeartHandshake,
  MapPin: MapPin,
  GraduationCap: GraduationCap,
  Award: Award,
  // Eklenen tüm çalışma grubu ikonlarını buraya ekleyin
};

// WorkingGroup interface'ini string anahtarı kullanacak şekilde güncelle
interface WorkingGroup {
  name: string;
  description: string;
  iconKey: keyof typeof ICON_MAP; 
  coordinator: string;
  members: string[];
}

interface WorkingGroupCardProps {
  group: WorkingGroup;
  index: number;
}

/**
 * Çalışma gruplarının detaylarını belirgin ikonlar ve modern kart ile gösteren bileşen.
 * @component
 */
export default function WorkingGroupCard({ group, index }: WorkingGroupCardProps) {
  const IconComponent = ICON_MAP[group.iconKey];
  const primaryColor = "#671615"; // Kurumsal Bordo

  if (!IconComponent) return null; 

  return (
    // Belirgin gölge, rounded köşeler
    <Card className="shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <CardHeader className="flex flex-row items-start space-x-4 p-6 pb-2">
        {/* İkon için renkli Daire Vurgusu */}
        <div 
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: primaryColor }}
        >
            <IconComponent className={`w-6 h-6 text-white`} />
        </div>
        
        <div className="flex-grow">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
                {group.name}
            </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-2">
        <CardDescription className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          {group.description}
        </CardDescription>

        <div className="space-y-2 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
          {/* Koordinatör Bilgisi */}
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            <span className="font-semibold mr-1">Koordinatör:</span> 
            {group.coordinator}
          </div>

          {/* Üye Bilgisi */}
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Users className="w-4 h-4 mr-2 text-green-500" />
            <span className="font-semibold mr-1">Ekip Üyeleri:</span> 
            <span className="truncate">{group.members.join(", ")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}