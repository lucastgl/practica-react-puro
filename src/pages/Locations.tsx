import type { LocationType } from "../types/apis";
import LocationCard from "../components/cards/LocationCard";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";


const Locations = () => {

    const [dataLocations, setDataLocations] = useState<LocationType[]>([])
    const { status, data, message } = useFetch<LocationType[]>('https://rickandmortyapi.com/api/location')

    useEffect(() => {
        if (status === 'success' && data) {
            setDataLocations(data);
        }
    }, [status, data]);


    return (
        <div>
            <p>Ubicaciones del universo de Rick y Morty</p>
            {status === 'fetching' ?
                <p>Cargando...</p> :
                data && Array.isArray(data) ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            dataLocations.map((location: LocationType) => {
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