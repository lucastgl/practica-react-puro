import {useMemo, memo} from "react";
import { FilterContext, type FilterContextValue, useFilterContext} from "../../context/FilterContextValue";
import type { StatusFilter, GenderFilter } from "../../hooks/useCharacterFilters";

// RootProps es un tipo que extiende FilterContextValue y agrega la propiedad children de tipo React.ReactNode. 
// Esto permite que el componente Root reciba las propiedades del contexto de filtros y también pueda envolver 
// otros componentes como hijos.
type RootProps = FilterContextValue & { children: React.ReactNode};

function Root({ status, gender, setStatus, setGender, children}: RootProps){
    const value = useMemo(
        () => ({
            status, gender, setStatus, setGender
        }),
        [ status, gender, setStatus, setGender ]
    );

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

const Status = memo(function Status(){
    const {status, setStatus} = useFilterContext();

    return(
        <select 
            value={status}
            onChange={(e)=> setStatus(e.target.value as StatusFilter)}
            className='bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white'
        >
            <option value="">Todos</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
        </select>
    )
});

const Gender = memo(function Gender(){
    const {gender, setGender} = useFilterContext();

    return(
        <select 
            value={gender}
            onChange={(e)=> setGender(e.target.value as GenderFilter)}
            className='bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white'
        >
            <option value="">Todos</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
        </select>
    )
});

const CharacterFilters = {Root, Status, Gender};
export default CharacterFilters;