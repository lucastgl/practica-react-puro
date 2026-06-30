import type { EpisodesType } from '../types/apis.ts';
import EpisodesCard from '../components/cards/EpisodeCard.tsx';
import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch.ts';

const Episodes = () => {

    const [dataEpisodes, setDataEpisodes] = useState<EpisodesType[]>([]);
    const { status, data, message } = useFetch<EpisodesType[]>('https://rickandmortyapi.com/api/episode');

    useEffect(() => {
        if (status === 'success' && data) {
            setDataEpisodes(data);
        }
    }, [status, data]);

    return (
        <div>
            <p>Episodios de Rick y Morty</p>
            {status === 'fetching' ?
                <p>Cargando...</p> :

                data && Array.isArray(data) ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {dataEpisodes.map((episode: EpisodesType) => {
                            return (
                                <EpisodesCard
                                    key={episode.id}
                                    data={episode}
                                />
                            )
                        })}
                    </div>
                ) : status === 'error' ? (
                    <p>Error: {message}</p>
                ) : (
                    <p>No se encontraron episodios.</p>
                )
            }
        </div>
    )
}

export default Episodes;