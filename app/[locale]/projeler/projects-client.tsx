"use client";

import React, { useState, ReactElement } from 'react';
// import Image from "next/image"; // Önizleme ortamında hata verdiği için standart img kullanıyoruz
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, ChevronRight, GraduationCap, Heart, Leaf, BookOpen, Briefcase, Globe, Lightbulb, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Yedek çeviriler (next-intl veya sunucudan veri gelmezse kullanılır)
const LOCAL_TRANSLATIONS: any = {
  categories: {
    all: "Tümü",
    youthWorkersMobility: "Gençlik Çalışanları Hareketliliği",
    youthExchange: "Gençlik Değişimi",
    europeanSolidarityCorps: "Avrupa Dayanışma Programı",
    socialInclusion: "Sosyal İçerme",
    youthWorkshop: "Gençlik Çalıştayı",
    trainingCourse: "Erasmus+ Eğitim Kursu",
    internationalInitiative: "Uluslararası Girişim",
    youthProject: "Erasmus+ Gençlik Projesi",
    discoverEU: "DiscoverEU"
  },
  status: {
    completed: "Tamamlandı",
    ongoing: "Devam Ediyor",
    applications: "Başvurular Açık",
    approved: "Onaylandı"
  },
  title: "Projelerimiz",
  subtitle: "Gençler için dünyayı keşfetme ve kendilerini geliştirme fırsatları.",
  viewDetails: "Detayları Gör",
  applyNow: "Şimdi Başvur"
};

interface Project {
  id: number;
  name: string;
  description: string;
  details: string;
  category: string;
  location: string;
  beneficiaries: string;
  status: string;
  startDate: string;
  endDate?: string;
  tags: string[];
  progress: number;
  partners?: string[];
  participants?: string;
  applicationCount?: number;
  imageUrl?: string;
}

interface ProjectsClientProps {
  projects: Project[];
  locale: string;
  t?: any; // Sunucudan gelen çeviri objesi
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  t: (key: string) => string;
}

const DATA_TO_TRANSLATION_KEY: Record<string, string> = {
  "Gençlik Çalışanları Hareketliliği": "youthWorkersMobility",
  "Gençlik Değişimi": "youthExchange",
  "European Solidarity Corps": "europeanSolidarityCorps",
  "Avrupa Dayanışma Programı": "europeanSolidarityCorps",
  "Sosyal İçerme": "socialInclusion",
  "Sosyal Dahil Etme": "socialInclusion",
  "Gençlik Çalıştayı": "youthWorkshop",
  "Erasmus+ Eğitim Kursu": "trainingCourse",
  "Uluslararası Girişim": "internationalInitiative",
  "Erasmus+ Gençlik Projesi": "youthProject",
  "DiscoverEU": "discoverEU"
};

const CategoryFilters: React.FC<{
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  t: (key: string) => string;
}> = ({ categories, selectedCategory, onSelectCategory, t }) => {
  
  const getCategoryLabel = (rawCategory: string) => {
    const allLabel = t('categories.all');
    if (rawCategory === allLabel) return allLabel;
    
    const key = DATA_TO_TRANSLATION_KEY[rawCategory];
    return key ? t(`categories.${key}`) : rawCategory;
  };

  const getCategoryIcon = (rawCategory: string): ReactElement => {
    const key = DATA_TO_TRANSLATION_KEY[rawCategory];
    
    switch (key) {
      case "youthWorkersMobility":
        return <GraduationCap className="mr-2 h-4 w-4" />;
      case "youthExchange":
        return <Heart className="mr-2 h-4 w-4" />;
      case "europeanSolidarityCorps":
        return <Leaf className="mr-2 h-4 w-4" />;
      case "socialInclusion":
        return <Users className="mr-2 h-4 w-4" />;
      case "youthWorkshop":
        return <Briefcase className="mr-2 h-4 w-4" />;
      case "trainingCourse":
        return <BookOpen className="mr-2 h-4 w-4" />;
      case "internationalInitiative":
        return <Globe className="mr-2 h-4 w-4" />;
      case "youthProject":
        return <Lightbulb className="mr-2 h-4 w-4" />;
      case "discoverEU":
        return <MapPin className="mr-2 h-4 w-4" />;
      default:
        return <BookOpen className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className="flex items-center"
        >
          {getCategoryIcon(category)}
          {getCategoryLabel(category)}
        </Button>
      ))}
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewDetails, t }) => {
  const getCategoryLabel = (rawCategory: string) => {
    const key = DATA_TO_TRANSLATION_KEY[rawCategory];
    return key ? t(`categories.${key}`) : rawCategory;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        {project.imageUrl && (
          <div className="relative w-full h-48 overflow-hidden bg-gray-100">
            {/* next/image yerine standart img kullanıldı */}
            <img
              src={project.imageUrl}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.style.display = 'none'; 
              }}
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold line-clamp-2">{project.name}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.status === "Tamamlandı" && (
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                {t('status.completed')}
              </Badge>
            )}
            {project.status === "Devam Ediyor" && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {t('status.ongoing')}
              </Badge>
            )}
            {project.status === "Başvurular Açık" && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                {t('status.applications')}
              </Badge>
            )}
            {project.status === "Onaylandı" && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                {t('status.approved')}
              </Badge>
            )}
            {project.status === "Aktif" && (
              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                Aktif
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                {getCategoryLabel(project.category)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <div>
            <CardDescription className="text-sm mb-4 line-clamp-3">
              {project.description}
            </CardDescription>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {project.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {project.beneficiaries}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {project.startDate}{project.endDate ? ` - ${project.endDate}` : ""}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-muted-foreground mb-1">
                İlerleme: {project.progress}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            className="mt-4 w-full" 
            variant="outline"
            onClick={() => onViewDetails(project)}
          >
            {t('viewDetails')}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectDetailsModal: React.FC<{
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}> = ({ project, isOpen, onClose, t }) => {
  if (!project) return null;
  
  const getCategoryLabel = (rawCategory: string) => {
    const key = DATA_TO_TRANSLATION_KEY[rawCategory];
    return key ? t(`categories.${key}`) : rawCategory;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col bg-white dark:bg-gray-950 border-none shadow-2xl">
        {/* Özel Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader className="sr-only">
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
          {project.imageUrl && (
            <div className="relative w-full h-80 overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              {/* next/image yerine standart img kullanıldı */}
              <img 
                src={project.imageUrl} 
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none'; 
                  }}
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{project.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.status === "Tamamlandı" && (
                    <Badge className="bg-green-500 text-white border-0">
                      {t('status.completed')}
                    </Badge>
                  )}
                  {project.status === "Devam Ediyor" && (
                    <Badge className="bg-blue-500 text-white border-0">
                      {t('status.ongoing')}
                    </Badge>
                  )}
                  {project.status === "Başvurular Açık" && (
                    <Badge className="bg-purple-500 text-white border-0">
                      {t('status.applications')}
                    </Badge>
                  )}
                  {project.status === "Onaylandı" && (
                    <Badge className="bg-yellow-500 text-white border-0">
                      {t('status.approved')}
                    </Badge>
                  )}
                  {project.status === "Aktif" && (
                    <Badge className="bg-indigo-500 text-white border-0">
                      Aktif
                    </Badge>
                  )}
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">{getCategoryLabel(project.category)}</Badge>
                </div>
              </div>
            </div>
          )}

          {!project.imageUrl && (
            <div className="p-6 border-b">
              <h2 className="text-3xl font-bold mb-3">{project.name}</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{getCategoryLabel(project.category)}</Badge>
              </div>
            </div>
          )}

          <div className="p-6 space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {project.details}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-blue-900 dark:text-blue-100">Konum</span>
                </div>
                <p className="text-blue-800 dark:text-blue-200 ml-12">{project.location}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-purple-900 dark:text-purple-100">Yararlanıcılar</span>
                </div>
                <p className="text-purple-800 dark:text-purple-200 ml-12">{project.beneficiaries}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-green-900 dark:text-green-100">Tarih</span>
                </div>
                <p className="text-green-800 dark:text-green-200 ml-12">
                  {project.startDate}{project.endDate ? ` - ${project.endDate}` : ""}
                </p>
              </div>
            </div>

            {(project.partners || project.participants || project.applicationCount) && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Proje Detayları</h3>
                <div className="space-y-4">
                  {project.partners && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Ortaklar:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.partners.map((partner) => (
                          <Badge key={partner} variant="outline" className="bg-white dark:bg-gray-700">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.participants && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Katılımcılar: </span>
                      <span className="text-gray-700 dark:text-gray-300">{project.participants}</span>
                    </div>
                  )}
                  
                  {project.applicationCount !== undefined && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Başvuru Sayısı: </span>
                      <span className="text-gray-700 dark:text-gray-300">{project.applicationCount}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900 dark:text-gray-100">İlerleme Durumu</span>
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-4 py-1.5 text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {project.status === "Başvurular Açık" && (
              <Button className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                {t('applyNow')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function ProjectsClient({ projects, locale, t: tProp }: ProjectsClientProps) {
  // Çeviri fonksiyonu: Önce prop olarak gelen t objesine bakar, bulamazsa yerel yedeğe düşer.
  const t = (key: string): string => {
    // Nested obje erişimi için yardımcı fonksiyon
    const resolve = (obj: any, path: string) => {
      return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
    };

    // 1. Prop'tan gelen çeviriyi dene
    if (tProp) {
      const fromProp = resolve(tProp, key);
      if (fromProp) return String(fromProp);
    }

    // 2. Yerel yedek çeviriyi dene
    const fromLocal = resolve(LOCAL_TRANSLATIONS, key);
    if (fromLocal) return String(fromLocal);

    // 3. Bulunamazsa anahtarı döndür
    return key;
  };

  // Kategori listesini oluştururken varsayılan "Tümü" seçeneği ve projelerden gelen kategorileri alıyoruz
  const categories = [t('categories.all'), ...Array.from(new Set(projects.map(project => project.category)))];

  const [selectedCategory, setSelectedCategory] = useState<string>(t('categories.all'));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === t('categories.all')
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>
      
      <CategoryFilters 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
        t={t}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onViewDetails={handleViewDetails}
            t={t}
          />
        ))}
      </div>

      <ProjectDetailsModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        t={t}
      />
    </div>
  );
}
