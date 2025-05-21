import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Navbar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-2xl font-bold">
          Worldview
        </Link>
        <div className="flex items-center gap-4">
          <Input 
            type="search" 
            placeholder="Rechercher un pays..." 
            className="pl-8 w-full"
            onChange={(e) => onSearch(e.target.value)} 
          />
          <Search className="h-4 w-4" />
        </div>
      </div>
    </nav>
  )
}
