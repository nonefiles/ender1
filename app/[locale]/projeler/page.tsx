import React from "react";
import ProjectsClient from "./projects-client";
import { getTranslations } from "next-intl/server";
import { stkProjects } from "@/data/projects";

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

export default async function ProjectsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // Get translations with error handling
  const t = await getTranslations('projects');
  
  // Helper function to safely get translations with fallbacks
  const getTranslation = (key: string, defaultValue: string) => {
    try {
      return t(key) || defaultValue;
    } catch (error) {
      console.warn(`Translation not found for key: ${key}`, error);
      return defaultValue;
    }
  };

  // Map stkProjects to translated values
  const translatedProjects = stkProjects.map(project => {
    // Try to get translated tags, if fails use original
    let tags: string[] = project.tags;
    try {
        const tagsStr = t(`items.${project.id}.tags`);
        if (tagsStr) {
            tags = tagsStr.split(',').map(tag => tag.trim());
        }
    } catch (e) {
        // Fallback to original tags
    }

    return {
        ...project,
        name: getTranslation(`items.${project.id}.name`, project.name),
        description: getTranslation(`items.${project.id}.description`, project.description),
        details: getTranslation(`items.${project.id}.details`, project.details),
        location: getTranslation(`items.${project.id}.location`, project.location),
        beneficiaries: getTranslation(`items.${project.id}.beneficiaries`, project.beneficiaries),
        // Status and Category are typically kept as IDs or original strings to maintain logic consistency
        // in client components (e.g. filtering, badge colors)
        category: project.category,
        status: project.status,
        tags: tags
    };
  });

  // Get all translations at once with fallbacks
  const translations = {
    title: getTranslation('title', 'Projelerimiz'),
    subtitle: getTranslation('subtitle', 'Engelleri Aşın Derneği\'nin yürüttüğü ulusal ve uluslararası projeler'),
    categories: {
      all: getTranslation('categories.all', 'Tümü'),
      youthWorkersMobility: getTranslation('categories.youthWorkersMobility', 'Gençlik Çalışanları Hareketliliği'),
      youthExchange: getTranslation('categories.youthExchange', 'Gençlik Değişimi'),
      europeanSolidarityCorps: getTranslation('categories.europeanSolidarityCorps', 'European Solidarity Corps'),
      socialInclusion: getTranslation('categories.socialInclusion', 'Sosyal İçerme'),
      youthWorkshop: getTranslation('categories.youthWorkshop', 'Gençlik Çalıştayı'),
      trainingCourse: getTranslation('categories.trainingCourse', 'Erasmus+ Eğitim Kursu'),
      internationalInitiative: getTranslation('categories.internationalInitiative', 'Uluslararası Girişim'),
      youthProject: getTranslation('categories.youthProject', 'Erasmus+ Gençlik Projesi'),
      discoverEU: getTranslation('categories.discoverEU', 'DiscoverEU')
    },
    status: {
      completed: getTranslation('status.completed', 'Tamamlandı'),
      ongoing: getTranslation('status.ongoing', 'Devam Ediyor'),
      applications: getTranslation('status.applications', 'Başvurular Açık'),
      approved: getTranslation('status.approved', 'Onaylandı'),
      active: getTranslation('status.ongoing', 'Aktif')
    },
    labels: {
      location: getTranslation('labels.location', 'Konum'),
      beneficiaries: getTranslation('labels.beneficiaries', 'Yararlanıcılar'),
      date: getTranslation('labels.date', 'Tarih'),
      progress: getTranslation('labels.progress', 'İlerleme'),
      partners: getTranslation('labels.partners', 'Ortaklar'),
      participants: getTranslation('labels.participants', 'Katılımcılar'),
      applicationCount: getTranslation('labels.applicationCount', 'Başvuru Sayısı'),
      tags: getTranslation('labels.tags', 'Etiketler'),
      projectDetails: getTranslation('labels.projectDetails', 'Proje Detayları'),
      progressStatus: getTranslation('labels.progressStatus', 'İlerleme Durumu')
    },
    viewDetails: getTranslation('viewDetails', 'Detayları Gör'),
    closeDetails: getTranslation('closeDetails', 'Kapat'),
    applyNow: getTranslation('applyNow', 'Başvuru Yap')
  };

  return (
    <ProjectsClient 
      t={translations} 
      projects={translatedProjects} 
      locale={locale} 
    />
  );
}