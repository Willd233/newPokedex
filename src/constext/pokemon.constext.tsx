import React, { createContext, useContext, useMemo, useState } from "react";


type PokemonContextType = {
    pokemon: any,
    setPokemon: (id: number) => void;
}
const PokemonContext = createContext<PokemonContextType>({
    pokemon: null,
    setPokemon: () => {},
});

export function PokemonProvider({ children }: { children: React.ReactNode }) {
    const [pokemon, setPokemon] = useState<any>(null);

    const data = useMemo(() => ({ pokemon, setPokemon }), [pokemon, setPokemon]);

    return (
        <PokemonContext.Provider value={data}>{ children }</PokemonContext.Provider>
    );
}

export function usePokemon() {
    const context = useContext(PokemonContext);
    if (context === undefined) {
        throw new Error("usePokemon must be used within PokemonProvider")
    }
    return context;
}