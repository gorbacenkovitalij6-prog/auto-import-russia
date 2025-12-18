"use client";

import { useEffect, type ReactNode } from "react";
import { ContactFormButton } from "@/components/ContactForm";

type ClientBodyProps = {
  children: ReactNode;
};

export default function ClientBody({ children }: ClientBodyProps) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased">
      {children}
      <ContactFormButton />
    </div>
  );
}
