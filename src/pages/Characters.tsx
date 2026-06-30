import type { CharacterType } from "../types/apis";
import CharacterCard from "../components/cards/CharacterCard";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

const Characters = () => {

    const [dataCharacters, setDataCharacters] = useState<CharacterType[]>([])
    const { status, data, message } = useFetch<CharacterType[]>('https://rickandmortyapi.com/api/character');


    useEffect(() => {
        if (status === 'success' && data) {
            setDataCharacters(data);
        }
    }, [status, data]);


    return (
        <div>
            <p>Personajes de Rick y Morty</p>
            {status === 'fetching' ?
                <p>Cargando...</p> :
                data && Array.isArray(data) ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            dataCharacters.map((character: CharacterType) => {
                                return (
                                    <CharacterCard
                                        key={character.id}
                                        data={character}
                                    />
                                )
                            })
                        }
                    </div>
                ) : status === 'error' ? (
                    <p>Error: {message}</p>
                ) : (
                    <p>No se encontraron personajes.</p>
                )

            }
        </div>
    )
}

export default Characters;