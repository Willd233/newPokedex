import { useCallback, useEffect, useState } from 'react'

const BASE_URl = "https://pokeapi.co/api/v2/pokemon/";

export default function usePokemones() {

    const [listPoke, setListPoke] = useState<any[]>([]);
    const [pokeMore, setPokeMore] = useState(true)

    const reguest = useCallback(async (offset: number = 0) => {
        const data = await fetch(`${BASE_URl}?limit=20&offset=${offset}`).then(
            (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network sesponse was not ok.")
            }
        );

        setListPoke((list) => [...list, ...data.results]);
        setPokeMore(data.next !== null)
    }, [])

    useEffect(() => {
        reguest();
    }, [reguest])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && pokeMore) {
                    reguest(listPoke.length);
                }
            },
            { threshold: 1 }
        );
        observer.observe(document.getElementById("moreData")!);
        return () => {
            observer.disconnect()
        }
    }, [pokeMore, listPoke.length, reguest])

    return {
        pokeMore,
        listPoke,
        reguest
    }
}