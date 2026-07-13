import { useDebaunce } from "./useDebaunce";
import { useState } from "react";

export function useSearch(delay = 500){
    const [value, setValue] = useState('');
    const debounceValue = useDebaunce(value, delay)
    return {value, debounceValue, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
}