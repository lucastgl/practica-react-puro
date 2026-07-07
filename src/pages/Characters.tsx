import type { CharacterApiType, CharacterType } from "../types/apis";
import CharacterCard from "../components/cards/CharacterCard";
import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination";
import ErrorBoundary from "../components/shared/ErrorBoundary";

const Characters = () => {
    const { page, url, nextPage, prevPage } = usePagination('https://rickandmortyapi.com/api/character')
    const { status, data, message } = useFetch<CharacterApiType>(url);

    return (
        <div>
            <h2 className='text-4xl font-bold text-center my-6'>Personajes de Rick y Morty</h2>
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
                        <ErrorBoundary>
                            {
                                data?.results.map((character: CharacterType) => {
                                    return (

                                        <CharacterCard
                                            key={character.id}
                                            data={character}
                                        />
                                    )
                                })
                            }
                        </ErrorBoundary>
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