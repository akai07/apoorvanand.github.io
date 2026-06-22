"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggle: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "dark" || saved === "light") setTheme(saved)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"
      localStorage.setItem("theme", next)
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light")
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
