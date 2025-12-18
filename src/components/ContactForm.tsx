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
import { Send, Phone } from "lucide-react"

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

      setFormData({
        name: "",
        phone: "",
        budget: "",
        message: ""
      })

      setOpen(false)

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
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-8 py-6 shadow-2xl pulse-slow hover-lift font-bold border-2 border-green-500"
        >
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
            <Label htmlFor="name2">Ваше имя *</Label>
            <Input
              id="name2"
              name="name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone2">Телефон *</Label>
            <Input
              id="phone2"
              name="phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget2">Примерный бюджет</Label>
            <Input
              id="budget2"
              name="budget"
              placeholder="Например: 2 000 000 ₽"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message2">Комментарий</Label>
            <Textarea
              id="message2"
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
