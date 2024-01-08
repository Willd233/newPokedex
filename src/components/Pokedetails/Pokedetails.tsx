import { useCallback, useEffect, useState } from 'react'
import styles from './Pokedetails.module.scss'
import Image from 'next/image';
import { usePokemon } from '@/constext/pokemon.constext';


export function Pokedetails({ id }: { id: number }) {
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const {pokemon: selectedPokemon}= usePokemon();
    console.log("selectoo", selectedPokemon)

    const requestData = useCallback(async () => {
        if (!selectedPokemon) {
            setLoading(true)
            return;
        }

        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
        ).then((res) => res.json());
        setLoading(false);
        setPokemon(data);

        const abilities = data.abilities.map((a: { ability: { name: string; }; }) => a.ability.name)
        return{
            abilities
        }

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
        <div className={styles.pokedetails}>
            <Image
                src={pokemon.sprites.other.dream_world.front_default}
                width={150}
                height={150}
                alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
        </div>
    )
}