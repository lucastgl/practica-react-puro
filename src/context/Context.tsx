import { createContext, useContext, useState } from "react";
import type { CharacterType, LocationType, EpisodesType } from '../types/apis.ts'

type FavoritesContextType = {
    espisodesFavorites: EpisodesType[];
    addEpisode: (item: EpisodesType) => void;
    removeEpisode: (id: number) => void;
    //
    locationFavorites: LocationType[];
    addLocation: (item: LocationType) => void;
    removeLocation: (id: number) => void;
    //
    characterFavorites: CharacterType[];
    addCharacter: (item: CharacterType) => void;
    removeCharacter: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {

    //Episodes
    const [espisodesFavorites, setEspisodesFavorites] = useState<EpisodesType[]>([]);

    const addEpisode = (item: EpisodesType) =>
        setEspisodesFavorites((prev) => [...prev, item]);

    const removeEpisode = (id: number) =>
        setEspisodesFavorites((prev) => prev.filter((f) => f.id !== id));

    //Locations
    const [locationFavorites, setLocationsFavorites] = useState<LocationType[]>([]);

    const addLocation = (item: LocationType) =>
        setLocationsFavorites((prev) => [...prev, item])

    const removeLocation = (id: number) =>
        setLocationsFavorites((prev) => prev.filter((f) => f.id !== id))

    //Characters
    const [characterFavorites, setCharactersFavorites] = useState<CharacterType[]>([])

    const addCharacter = (item: CharacterType) =>
        setCharactersFavorites((prev) => [...prev, item])

    const removeCharacter = (id: number) =>
        setCharactersFavorites((prev) => prev.filter((f) => f.id !== id))

    return (
        <FavoritesContext.Provider value={{ 
            espisodesFavorites, addEpisode, removeEpisode, 
            locationFavorites, addLocation, removeLocation, 
            characterFavorites, addCharacter, removeCharacter
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if(!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
    return ctx
}