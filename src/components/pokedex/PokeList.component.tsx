"use client"
import usePokemones from '@/hook/usePokemones.dto'
import styles from './PokeList.module.scss'
import { useEffect } from 'react';
import Image from 'next/image';
import { usePokemon } from '@/constext/pokemon.constext';



export default function PokeList() {

    const { listPoke } = usePokemones();
    const { setPokemon } = usePokemon();

    return (<div className={styles.pokeList}>
        <div>
            {listPoke?.map((item, i) => {

                const id = item.url.match(/\/(\d+)\//)[1];
                return (
                    <div
                        key={i}
                        className={styles.item}
                        onClick={() => {
                            setPokemon(id);
                        }}
                    >
                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                            width={50}
                            height={50}
                            alt={item.name} />
                        <span>{item.name}</span>
                        <span>#00{id}</span>
                    </div>)
            })}
            <div id='moreData'>Loading</div>
        </div>
    </div>
    )
}