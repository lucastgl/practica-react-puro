import type { LocationType, LocationApiType } from "../types/apis";
import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination"
import LocationCard from "../components/cards/LocationCard";


const Locations = () => {

    const { page, url, nextPage, prevPage } = usePagination('https://rickandmortyapi.com/api/location')
    const { status, data, message } = useFetch<LocationApiType>(url)

    return (
        <div>
            <h2 className='text-4xl font-bold text-center my-6'>Ubicaciones del universo de Rick y Morty</h2>
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
                data?.results && Array.isArray(data?.results) ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            data?.results.map((location: LocationType) => {
                                return (
                                    <LocationCard
                                        key={location.id}
                                        data={location}
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

export default Locations;