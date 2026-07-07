import type { ReactNode } from "react";
import { useFavorites } from "../context/Context";
import type { CharacterType, EpisodesType, LocationType } from "../types/apis";
import CharacterCard from "../components/cards/CharacterCard";
import LocationCard from "../components/cards/LocationCard";
import EpisodesCard from "../components/cards/EpisodeCard";

type FavoritesSectionProps = {
    title: string;
    count: number;
    children: ReactNode;
};

const FavoritesSection = ({ title, count, children }: FavoritesSectionProps) => {
    return (
        <details className='mb-6 border border-gray-700 rounded-xl overflow-hidden' open>
            <summary className='cursor-pointer select-none bg-gray-800 px-4 py-3 font-bold text-lg flex items-center justify-between hover:bg-gray-700 transition-colors'>
                <span>{title}</span>
                <span className='text-sm font-normal text-gray-400'>{count}</span>
            </summary>
            <div className='p-4'>
                {count > 0 ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {children}
                    </div>
                ) : (
                    <p className='text-gray-400 text-sm'>Todavía no agregaste favoritos en esta categoría.</p>
                )}
            </div>
        </details>
    )
}

const Favorite = () => {

    const { characterFavorites, episodesFavorites, locationFavorites } = useFavorites();

    return (
        <div>
            <h1 className='text-4xl font-bold text-center my-6'>Favoritos de cada categoría</h1>

            <FavoritesSection title='Personajes' count={characterFavorites.length}>
                {characterFavorites.map((character: CharacterType) => (
                    <CharacterCard key={character.id} data={character} />
                ))}
            </FavoritesSection>

            <FavoritesSection title='Ubicaciones' count={locationFavorites.length}>
                {locationFavorites.map((location: LocationType) => (
                    <LocationCard key={location.id} data={location} />
                ))}
            </FavoritesSection>

            <FavoritesSection title='Episodios' count={episodesFavorites.length}>
                {episodesFavorites.map((episode: EpisodesType) => (
                    <EpisodesCard key={episode.id} data={episode} />
                ))}
            </FavoritesSection>

        </div>
    )
}

export default Favorite;
