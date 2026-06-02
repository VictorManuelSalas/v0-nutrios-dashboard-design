"use client"

import { Button } from "@/components/ui/button"
import {
  Save,
  FileDown,
  Mail,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react"

interface ActionButtonsProps {
  isVisible: boolean
  isGenerating: boolean
}

export function ActionButtons({ isVisible, isGenerating }: ActionButtonsProps) {
  if (!isVisible) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-4 sm:justify-end">
      <Button variant="outline" className="gap-2" disabled={isGenerating}>
        <Save className="h-4 w-4" />
        Save Diet
      </Button>
      <Button variant="outline" className="gap-2" disabled={isGenerating}>
        <FileDown className="h-4 w-4" />
        Export PDF
      </Button>
      <Button variant="outline" className="gap-2" disabled={isGenerating}>
        <Mail className="h-4 w-4" />
        Send by Email
      </Button>
      <Button variant="outline" className="gap-2" disabled={isGenerating}>
        <MessageCircle className="h-4 w-4" />
        Send by WhatsApp
      </Button>
      <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Publish to Patient App
          </>
        )}
      </Button>
    </div>
  )
}
