import { useCallback, useMemo, useState } from "react"

export function usePagination(baseUrl: string) {
    const [page, setPage] = useState(1);

    // esta funcion useMemo nos permite memorizar el valor de la url, para que no se vuelva a 
    // calcular cada vez que se renderiza el componente, sino que solo se calcula cuando cambian
    // las dependencias (baseUrl y page). Esto nos permite optimizar el rendimiento de la aplicacion,
    // ya que no se hace una nueva peticion fetch cada vez que se renderiza el componente, sino que
    // solo se hace cuando cambia la url.
    const url = useMemo(() => `${baseUrl}?page=${page}`, [baseUrl, page]);
    
    // estas funciones useCallback nos permiten memorizar las funciones prevPage y nextPage,
    // para que no se vuelvan a crear cada vez que se renderiza el componente, sino que solo se crean
    // cuando cambian las dependencias (setPage). Esto nos permite optimizar el rendimiento de la aplicaion,
    // ya qye no se crean nuevas funciones cada vez que se renderiza el componente.
    const prevPage = useCallback(() => setPage(p => Math.max( 1, p - 1)),[])
    const nextPage = useCallback(() => setPage(p => p + 1),[])

    return {page, url, nextPage, prevPage}
}