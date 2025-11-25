"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Helper function to get path without locale
const getPathWithoutLocale = (path: string) => {
  const match = path.match(/^\/([a-z]{2})(\/|$)/i)
  return match ? path.substring(match[1].length + 1) || '/' : path
}

const navItems = (t: any) => [
  {
    label: t("corporate"),
    items: [
      { href: "/hakkimizda", label: t("about") },
      { href: "/ekibimiz", label: t("team") },
      { href: "/eurodesk", label: t("eurodesk") },
    ],
  },
  {
    href: "/projeler",
    label: t("projects"),
  },
  {
    href: "/basvurular",
    label: t("applications"),
  },
  {
    href: "/iletisim",
    label: t("contact"),
  },
]

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations("navigation")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/arama?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
      setSearchQuery("")
    }
  }

  // Handle language change
  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = getPathWithoutLocale(pathname)
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsLangDropdownOpen(false)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [pathname])

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Engelleri Aşın</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems(t).map((item, index) => (
              <div key={index} className="relative">
                {!item.items ? (
                  <Link
                    href={`/${locale}${item.href}`}
                    className={cn(
                      "text-gray-700 hover:text-[#671615] px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname.endsWith(item.href) && "text-[#671615] font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className={cn(
                        "flex items-center text-gray-700 hover:text-[#671615] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                        >
                          <div className="py-1">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={`/${locale}${subItem.href}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671615] focus:border-transparent"
                  placeholder={t("search")}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#671615]"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Change language"
              >
                <span>{currentLanguage.flag}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isLangDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                          locale === lang.code ? "bg-gray-50 font-medium" : ""
                        }`}
                      >
                        <span className="mr-2 text-base">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#671615] hover:bg-gray-100"
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  {/* Mobile Search */}
                  <div className="px-4">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("navigation.search")}
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-[#671615] focus:ring-[#671615]/20 transition-all"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>
                  </div>

                  {/* Mobile Language Switcher */}
                  <div className="px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{t("navigation.language")}:</span>
                      <div className="flex items-center space-x-2">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={cn(
                              "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200",
                              locale === language.code
                                ? "border-[#671615] bg-[#671615]/10 text-[#671615]"
                                : "border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-100",
                            )}
                          >
                            <span>{language.flag}</span>
                            <span className="text-xs font-medium">{language.code.toUpperCase()}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="px-4 space-y-3">
                    <Link href="/gonullu-ol" className="block w-full">
                      <Button className="w-full bg-gradient-to-r from-[#671615] to-[#4a0f0e] hover:from-[#5a1214] hover:to-[#3c0c0b] text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-200">
                        {t("navigation.volunteer")}
                      </Button>
                    </Link>
                    <Link href="/pif" className="block w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-200">
                        {t("navigation.pif")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
