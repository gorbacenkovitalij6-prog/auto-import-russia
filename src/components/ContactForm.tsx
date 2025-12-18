"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Phone, MessageCircle, X } from "lucide-react"

export function ContactForm() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Отправка данных в Telegram через API
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке')
      }

      // Очистка формы
      setFormData({
        name: "",
        phone: "",
        budget: "",
        message: ""
      })

      setOpen(false)

      // Показываем уведомление об успехе
      if (data.dev_mode) {
        alert("⚠️ Режим разработки\n\nФорма работает, но Telegram Bot не настроен.\n\nДля настройки следуйте инструкциям в .same/telegram-setup.md")
      } else {
        alert("✅ Спасибо за заявку!\n\nМы получили ваше сообщение и свяжемся с вами в ближайшее время.")
      }
    } catch (error) {
      console.error('Ошибка отправки:', error)
      alert("❌ Ошибка при отправке заявки.\n\nПопробуйте позже или свяжитесь с нами по телефону.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 border-2 border-green-500 shadow-2xl pulse-slow hover-lift font-bold"
        >
          <Phone className="mr-2 h-5 w-5" />
          Оставить заявку
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оставить заявку</DialogTitle>
          <DialogDescription>
            Заполните форму, и мы свяжемся с вами в течение 30 минут
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Примерный бюджет</Label>
            <Input
              id="budget"
              name="budget"
              placeholder="Например: 2 000 000 ₽"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Комментарий</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Расскажите о желаемом автомобиле..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Отправка..."
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Отправить заявку
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ContactFormButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl p-0 flex items-center justify-center text-white transition-colors"
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem' }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Contact options popup */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-80 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl p-6 text-white animate-in slide-in-from-bottom-5" style={{ position: 'fixed', bottom: '6rem', right: '1.5rem' }}>
          <div className="flex items-center gap-3 mb-1">
            <MessageCircle className="h-6 w-6" />
            <div>
              <h3 className="font-bold text-lg">Свяжитесь с нами</h3>
              <p className="text-sm text-green-100">Мы онлайн!</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <a
              href="https://t.me/bta_torg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#0088cc] hover:bg-[#006699] rounded-xl p-4 transition-colors"
            >
              <div className="bg-white/20 p-2 rounded-lg">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Telegram</div>
                <div className="text-sm text-blue-100">Напишите нам в мессенджер</div>
              </div>
            </a>

            <a
              href="https://wa.me/79010781031"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] rounded-xl p-4 transition-colors"
            >
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-sm text-green-100">Чат в WhatsApp</div>
              </div>
            </a>

            <a
              href="tel:+79010781031"
              className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 rounded-xl p-4 transition-colors"
            >
              <div className="bg-white/20 p-2 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Позвонить</div>
                <div className="text-sm text-orange-100">+7 (901) 078-10-31</div>
              </div>
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20 text-xs text-green-100 text-center">
            Пн-Пт: 09:00 - 20:00<br />
            Сб-Вс: 10:00 - 18:00
          </div>
        </div>
      )}
    </>
  )
}
