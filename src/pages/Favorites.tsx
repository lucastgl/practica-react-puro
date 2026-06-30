import { useFavorites } from "../context/Context";
import type { CharacterType, EpisodesType, LocationType } from "../types/apis";
import CharacterCard from "../components/cards/CharacterCard";
import LocationCard from "../components/cards/LocationCard";
import EpisodesCard from "../components/cards/EpisodeCard";
import { useEffect } from "react";

const Favorite = () => {

    const { characterFavorites, espisodesFavorites, locationFavorites } = useFavorites();
    
    useEffect(()=>{
       console.log('me renderizo entero') 
    },[])

    return (
        <div>
            <h2>Favoritos de cada categoria</h2>

            <div>
                <p>Favoritos de Characters</p>
                {
                    characterFavorites.map((character: CharacterType) => {
                        return (
                            <CharacterCard
                                key={character.id}
                                data={character}
                            />
                        )
                    })
                }
            </div>

            <div>
                <p>Favoritos de Location</p>
                {
                    locationFavorites.map((location: LocationType) => {
                        return (
                            <LocationCard
                                key={location.id}
                                data={location}
                            />
                        )
                    })
                }
            </div>


            <div>
                <p>Favoritos de Episodes</p>
                {
                    espisodesFavorites.map((episodes: EpisodesType) => {
                        return (
                            <EpisodesCard
                                key={episodes.id}
                                data={episodes}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Favorite;
