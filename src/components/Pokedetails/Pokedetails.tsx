import { useCallback, useEffect, useState } from 'react'
import styles from './Pokedetails.module.scss'
import Image from 'next/image';
import { usePokemon } from '@/constext/pokemon.constext';

interface Stat {
    stat: {
      name: string;
    };
    base_stat: number;
    ability: any;
  }
export function Pokedetails({ id }: { id: number }) {
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const {pokemon: selectedPokemon}= usePokemon();

    const requestData = useCallback(async () => {
        if (!selectedPokemon) {
            setLoading(true)
            return;
        }

        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
        ).then((res) => res.json());
        setLoading(false);
        setPokemon(data);

 console.log(pokemon)
    }, [selectedPokemon]);

    

    useEffect(() => {
        requestData();
    }, [requestData]);
    
    if (loading) {
        return <div>Loading...</div>
    }
    
    // if (!loading) {
    //     return (<div>Not found</div>)
    // }
    return (
        <main className={styles.pokedetails}>
            <Image
                src={pokemon.sprites.other.dream_world.front_default}
                width={150}
                height={150}
                alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            {pokemon.stats.map((sta: Stat, i: number) => {
        return (
         <section key={i}>
            <h3>{sta.stat.name}</h3>
            <progress
              value={sta.base_stat}
              max={120}
            />
              <span>{sta.base_stat}</span>
         </section>
        );
      })}

      {pokemon.abilities.map((ability: Stat, i:number)=>{
        return(
            <div>
                <h3>{ability.ability.name} </h3>
            </div>
        )
      })}
        </main>
    )
}