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
import { Menu, Send } from "lucide-react"
import { TabsTrigger } from "@/components/ui/tabs"

export function MobileTabsMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Меню</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-3 mt-8">
          <TabsTrigger
            value="home"
            onClick={() => setOpen(false)}
            className="w-full justify-start text-left text-lg font-medium py-4 px-4 rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-gray-100 transition-colors"
          >
            Главная
          </TabsTrigger>
          <TabsTrigger
            value="about"
            onClick={() => setOpen(false)}
            className="w-full justify-start text-left text-lg font-medium py-4 px-4 rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-gray-100 transition-colors"
          >
            О компании
          </TabsTrigger>
          <TabsTrigger
            value="services"
            onClick={() => setOpen(false)}
            className="w-full justify-start text-left text-lg font-medium py-4 px-4 rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-gray-100 transition-colors"
          >
            Услуги и этапы
          </TabsTrigger>
          <TabsTrigger
            value="examples"
            onClick={() => setOpen(false)}
            className="w-full justify-start text-left text-lg font-medium py-4 px-4 rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-gray-100 transition-colors"
          >
            Примеры заказов
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            onClick={() => setOpen(false)}
            className="w-full justify-start text-left text-lg font-medium py-4 px-4 rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-gray-100 transition-colors"
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            onClick={() => setOpen(false)}
            className="w-full justify-start text-left text-lg font-medium py-4 px-4 rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-gray-100 transition-colors"
          >
            Контакты
          </TabsTrigger>

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
