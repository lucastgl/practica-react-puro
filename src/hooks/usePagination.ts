import { useCallback, useMemo, useState } from "react"

export function usePagination(baseUrl: string, params: Record<string, string | undefined> = {}) {
    const [page, setPage] = useState(1);

    const paramsKey = JSON.stringify(params);
    const [prevParamsKey, setPrevParamsKey] = useState(paramsKey);
    if (paramsKey !== prevParamsKey) {
        setPrevParamsKey(paramsKey);
        setPage(1);
    }

    // esta funcion useMemo nos permite memorizar el valor de la url, para que no se vuelva a 
    // calcular cada vez que se renderiza el componente, sino que solo se calcula cuando cambian
    // las dependencias (baseUrl y page). Esto nos permite optimizar el rendimiento de la aplicacion,
    // ya que no se hace una nueva peticion fetch cada vez que se renderiza el componente, sino que
    // solo se hace cuando cambia la url.
    const url = useMemo(() => {
        const searchParams = new URLSearchParams({ page: String(page) })
        for (const [key, value] of Object.entries(params)) {
            if (value) searchParams.set(key, value)
        }
        return `${baseUrl}?${searchParams.toString()}`;
    }, [baseUrl, page, params]);

    // estas funciones useCallback nos permiten memorizar las funciones prevPage y nextPage,
    // para que no se vuelvan a crear cada vez que se renderiza el componente, sino que solo se crean
    // cuando cambian las dependencias (setPage).
    const prevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), [])
    const nextPage = useCallback(() => setPage(p => p + 1), [])

    return { page, url, nextPage, prevPage }
}