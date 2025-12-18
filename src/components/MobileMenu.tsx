"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X, Send } from "lucide-react"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { href: "#hero", label: "Главная" },
    { href: "#about", label: "О компании" },
    { href: "#services", label: "Услуги" },
    { href: "#faq", label: "FAQ" },
    { href: "#steps", label: "Этапы" },
    { href: "#examples", label: "Примеры" },
    { href: "#contact", label: "Контакты" },
  ]

  const handleClick = (href: string) => {
    setOpen(false)
    // Небольшая задержка для плавного закрытия меню
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Меню</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="text-left text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t">
            <Button
              className="w-full bg-[#0088cc] hover:bg-[#006699] text-lg py-6"
              asChild
            >
              <a href="https://t.me/+79010781031" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-5 w-5" />
                Telegram
              </a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
