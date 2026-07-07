import { createContext, useCallback, useContext, useState, useMemo } from "react";
import type { CharacterType, LocationType, EpisodesType } from '../types/apis.ts'

type FavoritesContextType = {
    //Contexto para manejo de Espisodes
    episodesFavorites: EpisodesType[];
    addEpisode: (item: EpisodesType) => void;
    removeEpisode: (id: number) => void;
    // Contexto para manejo de Locations
    locationFavorites: LocationType[];
    addLocation: (item: LocationType) => void;
    removeLocation: (id: number) => void;
    // Contexto para manejo de Characters
    characterFavorites: CharacterType[];
    addCharacter: (item: CharacterType) => void;
    removeCharacter: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {

    //Episodes
    const [episodesFavorites, setepisodesFavorites] = useState<EpisodesType[]>([]);

    const addEpisode = useCallback((item: EpisodesType) =>
        setepisodesFavorites((prev) => [...prev, item]), []);

    const removeEpisode = useCallback((id: number) =>
        setepisodesFavorites((prev) => prev.filter((f) => f.id !== id)), [])

    //Locations
    const [locationFavorites, setLocationsFavorites] = useState<LocationType[]>([]);

    const addLocation = useCallback((item: LocationType) =>
        setLocationsFavorites((prev) => [...prev, item]), [])

    const removeLocation = useCallback((id: number) =>
        setLocationsFavorites((prev) => prev.filter((f) => f.id !== id)), [])

    //Characters
    const [characterFavorites, setCharactersFavorites] = useState<CharacterType[]>([])

    const addCharacter = useCallback((item: CharacterType) =>
        setCharactersFavorites((prev) => [...prev, item]), [])

    const removeCharacter = useCallback((id: number) =>
        setCharactersFavorites((prev) => prev.filter((f) => f.id !== id)), [])


    const value = useMemo(() => ({
        episodesFavorites, addEpisode, removeEpisode,
        locationFavorites, addLocation, removeLocation,
        characterFavorites, addCharacter, removeCharacter
    }), [
        episodesFavorites, addEpisode, removeEpisode,
        locationFavorites, addLocation, removeLocation,
        characterFavorites, addCharacter, removeCharacter
    ]);

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
    return ctx
}