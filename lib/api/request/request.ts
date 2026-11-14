import axios from 'axios'
import { Country } from '@/lib/types/country'

// Appelé depuis le navigateur : passe par la route /api/countries
export const fetchUsersData = async (): Promise<Country[]> => {
  return (
    await axios.get('/api/countries').then((response: { data: Country[] }) => response.data)
    .catch((error: Error | unknown) => {
      console.error('Error fetching country data with all:', error)
      return []
    })
  )
}

// Appelé depuis un Server Component : interroge l'API directement
export const fetchUserData = async (cca3: string | undefined): Promise<Country | Country[]> => {
  if (!cca3) return []
  const { getCountryByCode } = await import('../ApiServices')
  return (
    await getCountryByCode(cca3).then((country) => country ?? [])
    .catch((error: Error | unknown) => {
      console.error('Error fetching country data with cca3:', error)
      return []
    })
  )
}
