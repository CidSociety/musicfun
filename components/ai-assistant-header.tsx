import { ArrowLeft, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AIAssistantHeader() {
  return (
    <header className="glass-effect border-b border-border/50 px-6 py-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              AI Music Assistant
              <Sparkles className="h-4 w-4 text-accent" />
            </h1>
            <p className="text-sm text-muted-foreground">Your personal music career advisor</p>
          </div>
        </div>
      </div>
    </header>
  )
}
