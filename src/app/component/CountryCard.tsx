import React from 'react'
import Link from 'next/link'

const CountryCard = ({ country }) => {
  return (
    <Link href={`/details/${country.ccn3}`}>
      <>
        {country.name.common}
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    </Link>
  )
}

export default CountryCard
