import { NextResponse } from 'next/server'
import { getAllCountries } from '@/lib/api/ApiServices'

// Proxy pour le navigateur : la clé REST Countries reste côté serveur
// Les appels à l'API sont mis en cache 24h (fetch revalidate dans ApiServices)
// pour économiser le quota mensuel ; une erreur n'est jamais mise en cache.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(await getAllCountries())
  } catch (error) {
    console.error('Error fetching countries from REST Countries:', error)
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 502 })
  }
}
