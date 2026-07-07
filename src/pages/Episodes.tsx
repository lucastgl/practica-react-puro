import type { EpisodesApiType, EpisodesType } from '../types/apis.ts';
import { useFetch } from '../hooks/useFetch.ts';
import { usePagination} from '../hooks/usePagination.ts'
import Pagination from '../components/shared/Pagination.tsx';
import EpisodesCard from '../components/cards/EpisodeCard.tsx';

const Episodes = () => {

    const { page, url, nextPage, prevPage} = usePagination('https://rickandmortyapi.com/api/episode')
    const { status, data, message } = useFetch<EpisodesApiType>(url);

    return (
        <div>
            <h2 className='text-4xl font-bold text-center my-6'>Episodios de Rick y Morty</h2>
            <Pagination
                currentPage={page}
                totalPages={data?.info.pages ?? 1}
                hasPrev={!!data?.info.prev}
                hasNext={!!data?.info.next}
                onPrev={prevPage}
                onNext={nextPage}
            />
            {status === 'fetching' ?
                <p>Cargando...</p> :

                data?.results && Array.isArray(data.results) ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {data?.results.map((episode: EpisodesType) => {
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