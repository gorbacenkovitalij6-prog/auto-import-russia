"use client"

import { useEffect, useRef, type ReactNode } from "react"

type ScrollAnimationProps = {
  children: ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up"
}

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  animation = "fade-up"
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in")
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`scroll-animation ${animation} ${className}`}
    >
      {children}
    </div>
  )
}
