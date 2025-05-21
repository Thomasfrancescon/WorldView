"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";

interface CountryCardProps {
  country: {
    flags?: { png: string };
    name?: { common: string };
    capital?: string[];
    region?: string;
    population?: number;
    cca3: string;
  }
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <Image
            src={country.flags?.png || "/placeholder-flag.png"}
            alt={`Drapeau de ${country.name?.common || "pays inconnu"}`}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <h2 className="font-bold text-lg">{country.name?.common}</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Capitale</p>
              <p>{country.capital?.[0] || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Région</p>
              <p>{country?.region}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Population</p>
              <p>{country?.population}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
