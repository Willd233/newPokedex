"use client"

import styles from './page.module.scss'
import PokeList from '@/components/pokedex/PokeList.component'
import { Pokedetails } from '@/components/Pokedetails/Pokedetails'
import { useState } from 'react'
import { PokemonProvider } from '@/constext/pokemon.constext'

export default function Home() {
  const [selected, setSelected] = useState<number>(1)
  return (
    <main className={styles.main}>
      <PokemonProvider>
        <section className={styles.pokemones}>
          <Pokedetails id={selected} />
        </section>
        <section className={styles.information}>
          <PokeList />
        </section>
      </PokemonProvider>
    </main>
  )
}
