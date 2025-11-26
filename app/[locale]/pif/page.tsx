"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Mail, Building2, MapPin, Globe, Eye } from "lucide-react";

export default function PIFPage() {
  // next-intl çeviri fonksiyonunu kullanıyoruz
  const t = useTranslations("pif");
  
  const organizationInfo = {
    fullName: "ENGELLERİ AŞIN DERNEĞİ",
    englishName: "Embrace the Barriers Association",
    acronym: "ENDER",
    pic: "880875916",
    oid: "E10335504",
    address: "Niyazi mah. Niyazi sok. 67/4 Arzum İş Merkezi (No:4) BATTALGAZİ/MALATYA 44050",
    country: "TÜRKİYE (TR)",
    website: "https://www.engelleriasin.org/",
    emails: ["embracethebarriers@gmail.com", "engelleriasin44@gmail.com"],
    phones: ["+905458149628", "+905399525689"],
    foundedYear: "2022",
    type: t("labels.nonProfit")
  };

  const keyFacts = [
    { label: t("labels.pic"), value: "880875916" },
    { label: t("labels.oid"), value: "E10335504" },
    { label: t("labels.founded"), value: "2022" },
    { label: t("labels.totalProjects"), value: "10" },
    { label: t("labels.activeProjects"), value: "6" },
    { label: t("accreditationsTitle") || "Akreditasyon", value: "2" }
  ];

  const keyPersonnel = [
    {
      id: "abdulsamet",
      email: "abdulsametkezer4@gmail.com",
      phone: "+905399525689",
    },
    {
      id: "safa",
      email: "safaokay27@gmail.com",
      phone: "+905458149628",
    },
    {
      id: "talha",
      email: "talhanurlan@gmail.com",
      phone: "+905534860320",
    }
  ];

  const erasmusProjects = [
    { code: "2023-2-TR01-KA155-YOU-000179493", role: t("projects.coordinator"), status: t("projects.completed") },
    { code: "2023-3-PL01-KA152-YOU-000183478", role: t("projects.partner"), status: t("projects.completed") },
    { code: "2024-1-TR01-KA152-YOU-000217945", role: t("projects.coordinator"), status: t("projects.completed") },
    { code: "2024-3-TR01-KA154-YOU-000273889", role: t("projects.partner"), status: t("projects.ongoing") },
    { code: "2024-3-TR01-KA154-YOU-000287249", role: t("projects.partner"), status: t("projects.ongoing") },
    { code: "2024-3-TR01-KA210-YOU-000285989", role: t("projects.coordinator"), status: t("projects.ongoing") },
    { code: "2024-3-PL01-KA153-YOU-000283666", role: t("projects.partner"), status: t("projects.completed") },
    { code: "2025-1-TR01-KA153-YOU-000298857", role: t("projects.coordinator"), status: t("projects.ongoing") },
    { code: "2025-1-TR01-KA154-YOU-000301604", role: t("projects.partner"), status: t("projects.ongoing") },
    { code: "2025-1-PL01-KA152-YOU-000302153", role: t("projects.partner"), status: t("projects.ongoing") },
  ];

  const Card = ({ className = "", children }: any) => <div className={`border-0 shadow-md rounded-lg ${className}`}>{children}</div>;
  const CardContent = ({ className = "", children }: any) => <div className={`p-6 ${className}`}>{children}</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="container py-16 md:py-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: '#571213'}}>
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#571213'}}>
            {t("title")}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            {organizationInfo.englishName}
          </h2>
          <p className="text-lg text-slate-600 mb-2">
            {organizationInfo.fullName} ({organizationInfo.acronym})
          </p>
          <p className="text-slate-500">
            Erasmus+ Partner • {t("labels.founded")}: {organizationInfo.foundedYear}
          </p>
          
          <div className="mt-8">
            <a 
              href="/pif.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-full shadow-sm hover:bg-opacity-90 transition-colors"
              style={{backgroundColor: '#571213'}}
            >
              <Eye className="w-5 h-5 mr-2" />
              {t("downloadPdf")} (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">{t("basicInfo")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto mb-12">
          {keyFacts.map((fact, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold mb-2" style={{color: '#571213'}}>{fact.value}</div>
                <div className="text-sm font-medium text-slate-600">{fact.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Organization Profile */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">{t("orgProfile")}</h2>
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">İletişim</h3>
                  <div className="space-y-3">
                    <div className="flex items-start text-slate-600">
                      <MapPin className="h-5 w-5 mr-3 mt-0.5" style={{color: '#571213'}} />
                      <div>
                        <div className="font-medium">{t("labels.address")}</div>
                        <div className="text-sm">{organizationInfo.address}</div>
                      </div>
                    </div>
                    {organizationInfo.emails.map((email, index) => (
                      <div key={index} className="flex items-center text-slate-600">
                        <Mail className="h-5 w-5 mr-3" style={{color: '#571213'}} />
                        <a href={`mailto:${email}`} className="hover:text-blue-600 text-sm">{email}</a>
                      </div>
                    ))}
                    {organizationInfo.phones.map((phone, index) => (
                      <div key={index} className="flex items-center text-slate-600">
                        <Phone className="h-5 w-5 mr-3" style={{color: '#571213'}} />
                        <a href={`tel:${phone}`} className="hover:text-blue-600 text-sm">{phone}</a>
                      </div>
                    ))}
                    <div className="flex items-center text-slate-600">
                        <Globe className="h-5 w-5 mr-3" style={{color: '#571213'}} />
                        <a href={organizationInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 text-sm">{organizationInfo.website}</a>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{t("labels.type")}</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="font-medium text-blue-900">{organizationInfo.type}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-medium text-green-900">Eurodesk Contact Point</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

       {/* Key Personnel */}
       <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">{t("labels.keyPersonnel")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {keyPersonnel.map((person, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 mr-4">
                    {t(`personnel.${person.id}.name`).charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{t(`personnel.${person.id}.name`)}</h3>
                    <div className="text-sm text-slate-600">{t(`personnel.${person.id}.title`)}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 mb-4 flex-grow">{t(`personnel.${person.id}.background`)}</div>
                 <div className="space-y-2 mt-auto">
                    {person.email && (
                        <div className="flex items-center text-xs text-slate-500">
                            <Mail className="h-3 w-3 mr-2" />
                            {person.email}
                        </div>
                    )}
                    {person.phone && (
                        <div className="flex items-center text-xs text-slate-500">
                            <Phone className="h-3 w-3 mr-2" />
                            {person.phone}
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">{t("projectsTitle")}</h2>
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid gap-4">
            {erasmusProjects.map((project, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="font-mono text-sm font-medium text-slate-900 mb-1">{project.code}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.role === t("projects.coordinator") ? 'text-white' : 'bg-blue-100 text-blue-800'}`} style={project.role === t("projects.coordinator") ? {backgroundColor: '#571213'} : {}}>{project.role}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === t("projects.ongoing") ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{project.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}