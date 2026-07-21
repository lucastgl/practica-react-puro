import { createContext, useContext } from "react";
import type { StatusFilter, GenderFilter } from "../hooks/useCharacterFilters"

export type FilterContextValue = {
    status: StatusFilter;
    gender: GenderFilter;
    setStatus: (status: StatusFilter) => void;
    setGender: (gender: GenderFilter) => void;
}

export const FilterContext = createContext<FilterContextValue | null>(null);

export function useFilterContext () {
    const ctx = useContext(FilterContext);
    if(!ctx) throw new Error('useFilterContext must be used inside FiltersProvider')
    return ctx;
}