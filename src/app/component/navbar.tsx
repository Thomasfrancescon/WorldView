import React from 'react'
import styles from './navbar.module.css'
import logoImage from './_169f7509-6cf9-45ca-bb80-32019ace29a0.jpg'
import Image from 'next/image'

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <main className={styles.background}>
      <header>
        <style>@import url('https://fonts.cdnfonts.com/css/parisienne')</style>
      </header>
      <div>
        <Image src={logoImage} alt="logo" width={200} height={200} />
        <a className={styles.tittle} href="/">
          My world view
        </a>
        <input
          className={styles.searchbarre}
          type="text"
          placeholder="Rechercher un pays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </main>
  )
}

export default Navbar
