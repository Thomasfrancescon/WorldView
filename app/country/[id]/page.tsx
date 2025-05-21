import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { fetchUserData } from "@/lib/api/request/request"

export default async function CountryPage({ params }: { params: { id: string } }) {
  const param = await params
  const countryData = await fetchUserData(param.id)
  const country = Array.isArray(countryData) ? countryData[0] : countryData

  if (!country) {
    notFound()
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-video md:aspect-square">
          <Image
            src={country.flags?.png || "/placeholder.svg"}
            alt={`Drapeau de ${country.name.common}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="bg-black/90 text-white p-6 rounded-lg space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">{country.name.official}</h1>

          <div className="space-y-2">
            <p className="flex justify-between">
              <span>Nom commun :</span>
              <span className="font-semibold">{country.name.common}</span>
            </p>
            <p className="flex justify-between">
              <span>Nom natif :</span>
              <span className="font-semibold">{country.nativeName || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span>TLD :</span>
              <span className="font-semibold">{country.tld?.join(", ") || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span>Superficie :</span>
              <span className="font-semibold">{country.area?.toLocaleString() || "N/A"} km²</span>
            </p>
            <p className="flex justify-between">
              <span>Continent :</span>
              <span className="font-semibold">{country.region}</span>
            </p>
            <p className="flex justify-between">
              <span>Sous-région :</span>
              <span className="font-semibold">{country.subregion || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span>Capitale :</span>
              <span className="font-semibold">{country.capital?.join(", ") || "N/A"}</span>
            </p>TypeError: Cannot read properties of undefined (reading 'common')
            <p className="flex justify-between">
              <span>Nombre d'habitants :</span>
              <span className="font-semibold">{country.population.toLocaleString()}</span>
            </p>
            <p className="flex justify-between">
              <span>Frontières :</span>
              <span className="font-semibold">{country.borders?.join(" - ") || "Aucune"}</span>
            </p>
            <p className="flex justify-between">
              <span>Langue :</span>
              <span className="font-semibold">
                {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Indépendance :</span>
              <span className="font-semibold">{country.independent ? "Oui" : "Non"}</span>
            </p>
            <p className="flex justify-between">
              <span>Membre de l'ONU :</span>
              <span className="font-semibold">{country.unMember ? "Oui" : "Non"}</span>
            </p>
            <p className="flex justify-between">
              <span>Monnaie :</span>
              <span className="font-semibold">
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((curr: any) => `${curr.name} (${curr.symbol})`)
                      .join(", ")
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
