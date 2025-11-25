import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["tr", "en"],

  // Used when no locale matches
  defaultLocale: "tr",

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string or only the internal pathname can be provided.
    "/": "/",
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/ekibimiz": {
      tr: "/ekibimiz",
      en: "/our-team",
    },
    "/eurodesk": {
      tr: "/eurodesk",
      en: "/eurodesk",
    },
    "/projeler": {
    tr: "/projeler",
    en: "/projects",
  },
    "/basvurular": {
      tr: "/basvurular",
      en: "/applications",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/gonullu-ol": {
      tr: "/gonullu-ol",
      en: "/volunteer",
    },
    "/pif": {
      tr: "/pif",
      en: "/pif",
    },
    "/etkinlikler": {
      tr: "/etkinlikler",
      en: "/events",
    },
    "/haberler": {
      tr: "/haberler",
      en: "/news",
    },
    "/blog": {
      tr: "/blog",
      en: "/blog",
    },
    "/arama": "/arama",
  },
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
