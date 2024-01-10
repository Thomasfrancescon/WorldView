'use client'

import { useEffect, useState } from 'react'
import { fetchUsersData } from '@/services/Users/UsersService'
import React from 'react'
import styles from './main.module.css'
import Navbar from './component/navbar'
import CountryCard from './component/CountryCard'

export default function Home() {
  const [Data, setData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    fetchUsersData().then((response) => {
      const sortedData = response.sort((a: string, b: string) => a.name.common.localeCompare(b.name.common))
      setData(sortedData)
    })
  }, [])

  const filteredData = Data
    ? Data.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  return (
    <>
      <div className={styles.background}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className={styles.responsive}>
          {filteredData && filteredData.map((country) => <CountryCard key={country.ccn3} country={country} />)}
        </div>
      </div>
    </>
  )
}
