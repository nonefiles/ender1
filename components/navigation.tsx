"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"
import { Link, useRouter, usePathname } from "@/i18n/routing"

const navItems = [
  {
    label: "navigation.corporate",
    items: [
      { href: "/hakkimizda", label: "navigation.about" },
      { href: "/ekibimiz", label: "navigation.team" },
      { href: "/eurodesk", label: "navigation.eurodesk" },
    ],
  },
  {
    href: "/projeler",
    label: "navigation.projects",
  },
  {
    label: "navigation.applications",
    href: "/basvurular",
  },
  {
    href: "/blog",
    label: "navigation.blog",
  },
  {
    href: "/iletisim",
    label: "navigation.contact",
  },
]

const languages = [
  { code: "tr", name: "navigation.turkish", flag: "🇹🇷" },
  { code: "en", name: "navigation.english", flag: "🇺🇸" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        setOpenDropdown(null)
        setIsSearchOpen(false)
        setIsLangDropdownOpen(false)
        setSearchQuery("")
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 100)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleDropdownToggle = (index: number | null) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery)}` as any)
      setIsSearchOpen(false)
      setIsOpen(false)
      setSearchQuery("")
    }
  }

  const handleLanguageChange = (langCode: string) => {
    setIsLangDropdownOpen(false)
    // next-intl's usePathname already returns pathname without locale
    // So we can directly use it with router.push
    router.push(pathname, { locale: langCode })
  }

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/Logo.jpg"
              alt="Engelleri Aşın Derneği Logosu"
              width={45}
              height={45}
              className="rounded-lg shadow-sm"
            />
            <span className={cn("text-xl font-bold transition-colors text-gray-800")}>Engelleri Aşın Derneği</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.items ? (
                  <div className="relative group">
                    <button
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                        "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                      )}
                    >
                      <span>{t(item.label)}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>

                    <AnimatePresence>
                      {openDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                          onMouseEnter={() => setOpenDropdown(index)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href as any}
                              className={cn(
                                "flex items-center px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50",
                                pathname === subItem.href
                                  ? "text-[#671615] bg-[#671615]/5 font-medium border-r-2 border-[#671615]"
                                  : "text-gray-700 hover:text-[#671615]",
                              )}
                            >
                              <span>{t(subItem.label)}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href as any}
                    prefetch={false}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                      pathname === item.href
                        ? "text-[#671615] bg-[#671615]/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    {t(item.label)}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {!isSearchOpen ? (
                  <motion.div
                    key="search-icon"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className={cn(
                        "bg-white/95 hover:bg-white/80 transition-all duration-200 hover:scale-105 text-gray-600 hover:text-gray-800",
                      )}
                      aria-label="Arama"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="search-form"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearch}
                    className="flex items-center space-x-2"
                  >
                    <div className="relative flex-1">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("navigation.searchShortcut")}
                        autoFocus
                        className={cn(
                          "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2",
                          isScrolled
                            ? "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-[#671615] focus:ring-[#671615]/20"
                            : "border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:border-white focus:ring-white/20",
                        )}
                      />
                      <Search
                        className={cn(
                          "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                          isScrolled ? "text-gray-400" : "text-gray-300",
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery("")
                      }}
                      className={cn(
                        "text-gray-400 hover:text-gray-600 transition-colors",
                        !isScrolled && "hover:text-white",
                      )}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 bg-white/95 hover:bg-white/80 text-gray-700",
                  isLangDropdownOpen && "bg-white/80",
                )}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", isLangDropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={cn(
                          "flex items-center space-x-3 w-full px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50",
                          locale === language.code
                            ? "text-[#671615] bg-[#671615]/5 font-medium"
                            : "text-gray-700 hover:text-[#671615]",
                        )}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span>{t(language.name)}</span>
                        {locale === language.code && <div className="ml-auto w-2 h-2 rounded-full bg-[#671615]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/gonullu-ol" prefetch={false}>
                <Button className="bg-gradient-to-r from-[#671615] to-[#4a0f0e] hover:from-[#5a1214] hover:to-[#3c0c0b] text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-[#671615] focus:ring-offset-2 hover:scale-105">
                  {t("navigation.volunteer")}
                </Button>
              </Link>
              <Link href="/pif" prefetch={false}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 hover:scale-105">
                  {t("navigation.pif")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-900 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.items ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(index)}
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors text-gray-900 hover:bg-gray-100",
                          )}
                        >
                          <span>{t(item.label)}</span>
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform", openDropdown === index && "rotate-180")}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-1"
                            >
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href as any}
                                  prefetch={false}
                                  className={cn(
                                    "block px-4 py-2 text-sm rounded-lg transition-colors",
                                    pathname === subItem.href
                                      ? "text-[#671615] bg-[#671615]/10 font-medium"
                                      : "text-gray-900 hover:bg-gray-100",
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {t(subItem.label)}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href as any}
                        prefetch={false}
                        className={cn(
                          "block px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-900 hover:bg-gray-100",
                          pathname === item.href && "text-[#671615] bg-[#671615]/10",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {t(item.label)}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Actions */}
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
                    <Link href="/gonullu-ol" className="block w-full" prefetch={false}>
                      <Button className="w-full bg-gradient-to-r from-[#671615] to-[#4a0f0e] hover:from-[#5a1214] hover:to-[#3c0c0b] text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-200">
                        {t("navigation.volunteer")}
                      </Button>
                    </Link>
                    <Link href="/pif" className="block w-full" prefetch={false}>
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
