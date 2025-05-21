"use client"

import { useState, useEffect } from "react"
import { CountryCard } from "@/components/country-card"
import { Navbar } from "@/components/navbar"
import { fetchUsersData } from "@/lib/api/request/request"

interface Country {
    name: {
        common: string;
    };
    cca3: string;
}

export default function CountryCardWrapper() {
    const [countries, setCountries] = useState<Country[]>([])
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    
    useEffect(() => {
        const loadCountries = async () => {
            const data = await fetchUsersData()
            setCountries(data)
            setFilteredCountries(data)
        }
        loadCountries()
    }, [])

    const handleSearch = (query: string) => {
        const filtered = countries.filter((country: Country) => 
            country.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredCountries(filtered)
    }

    return (
        <>
            <Navbar onSearch={handleSearch} />
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">Découvrez les pays du monde</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCountries.map((country: Country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            </main>
        </>
    )
}
