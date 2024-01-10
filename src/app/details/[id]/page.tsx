'use client'

import { useEffect, useState } from 'react'
import { fetchUserData } from '@/services/Users/UsersService'
import React from 'react'
import Navbar from '@/app/component/navbar'
import styles from './styles.module.css'

export default function About({ params }: { params: { id: string } }) {
  const [Data, setData] = useState(null)
  const ref: string = params.id
  useEffect(() => {
    fetchUserData(ref).then((response) => setData(response[0]))
  }, [])

  if (!Data) {
    return 'lien incorrect'
  }

  const base: any = []
  for (const key in Data.name.nativeName) {
    base.push(Data.name.nativeName[key])
  }

  let commonName = ''
  let nativeName = ''
  base.map((names: string, index) => {
    if (index === 0) {
      commonName += names.common
      nativeName += names.official
    } else {
      commonName += ' - ' + names.common
      nativeName += ' - ' + names.official
    }
  })

  const lang: any = []
  for (const key in Data.languages) {
    lang.push(Data.languages[key])
  }

  let languages = ''
  lang.map((language: string, index: number) => {
    if (index === lang.length - 1) {
      languages += language
    } else {
      languages += language + ' - '
    }
  })

  const money: any = []
  for (const key in Data.currencies) {
    money.push(Data.currencies[key])
  }

  let moneyname = ''
  let moneysymbol = ''
  money.map((name: string) => {
    moneyname += name.name
    moneysymbol += name.symbol
  })

  let gini: string = null
  for (const key in Data.gini) {
    gini = Data.gini[key] + ' en ' + key
  }

  return (
    <div>
      <Navbar />
      <center>
        <div className={styles.background}>
          <div>{Data.name.common}</div>
          <img src={Data.flags.svg} alt={Data.flags.alt} />
          <div>{Data.name.official}</div>
          {Data && (
            <div>
              common name : {commonName} <br /> native name : {nativeName}
            </div>
          )}
          <div>tld : {Data.tld}</div>
          <div>area : {Data.area} km²</div>
          <div>continent : {Data.region}</div>
          <div>subregion : {Data.subregion}</div>
          <div>capital : {Data.capital}</div>
          <div>number of people : {Data.population}</div>
          <div>borders : {Data.borders ? Data.borders.join(' - ') : 'pas de frontieres'}</div>
          <div>language : {languages}</div>
          <p>independence : {Data.independent ? 'oui' : 'non'} </p>
          <p>part of the UN : {Data.unMember ? 'oui' : 'non'} </p>
          {Data && (
            <div>
              {moneyname} {moneysymbol}
            </div>
          )}
          <p>Coefficient GINI du pays : {gini === null ? 'pas de coefficient gini' : gini} </p>
        </div>
      </center>
    </div>
  )
}
