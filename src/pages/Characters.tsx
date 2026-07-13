import type { CharacterApiType, CharacterType } from "../types/apis";

import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../hooks/useSearch";

import CharacterCard from "../components/cards/CharacterCard";
import Pagination from "../components/shared/Pagination";
import ErrorBoundary from "../components/shared/ErrorBoundary";
import SearchBar from "../components/shared/SearchBar";

const Characters = () => {
    const { value, debounceValue, onChange } = useSearch(500);
    const { page, url, nextPage, prevPage } = usePagination('https://rickandmortyapi.com/api/character/', { search: debounceValue })
    const { status, data, message } = useFetch<CharacterApiType>(url);

    return (
        <div>
            <h2 className='text-4xl font-bold text-center my-6'>Personajes de Rick y Morty</h2>
            <SearchBar value={value} onChange={onChange}/>
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