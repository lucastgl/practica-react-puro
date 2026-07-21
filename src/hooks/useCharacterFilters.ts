import { useCallback, useState } from "react";
export type StatusFilter = 'alive' | 'dead' | 'unknown' | '';
export type GenderFilter = 'female' | 'male' | 'genderless' | 'unknown' | '';
export type CharacterFiltersState = {status: StatusFilter; gender: GenderFilter}


export function useCharacterFilters() {
    
    const [filters, setFilters] = useState<CharacterFiltersState>({ status: '', gender: '' })

    const setStatus = useCallback((status: StatusFilter) => {
        setFilters(prev => ({...prev, status}))
    },[])

    const setGender = useCallback((gender: GenderFilter) => {
        setFilters(prev => ({...prev, gender}))
    },[])


    return {filters, setGender, setStatus}

}