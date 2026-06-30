import { useState, useEffect, useRef } from 'react';

// T es un tipo generico nativo de TypeScript, que nos permite 
// decirle a la función useFetch que puede recibir cualquier tipo de dato, 
// y que ese tipo de dato se va a mantener en toda la función. 
// Esto nos permite tener una función más flexible y reutilizable, 
// ya que podemos usarla para traer datos de cualquier tipo de API, 
// sin tener que escribir una función diferente para cada tipo de dato.

type FetchState<T> =
    | { status: 'idle' }
    | { status: 'fetching' }
    | { status: 'success', data: T }
    | { status: 'error', message: string };

export function useFetch<T>(url: string) { // decimos que es del tipo generico T, para que pueda ser cualquier tipo de dato que queramos traer de la API
    const [state, setState] = useState<FetchState<T>>({ status: 'idle' });
    const [data, setData] = useState<T | null>(null);
    const [message, setMessage] = useState<string>('');

    // useRef nos permite crear una referencia mutable que persiste durante todo el ciclo de vida del componente.
    // con esto podemos guardar el AbortController de la petición fetch, para poder cancelarla si es necesario.
    // basicamente memoiza el estado de la petición fetch, para que no se pierda cuando el componente se re-renderiza.
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        
        if (!url) {
            setState({ status: 'idle' }); // aca si la url es null, seteamos el estado a idle (o sea, que no estamos fetchando nada) y retornamos
            return;
        }

        //Cancelamos la reques anterior antes de hacer una nueva
        abortRef.current?.abort(); // primero abortamos la peticion anterior si es que existe
        abortRef.current = new AbortController(); // creamos un nuevo AbortController para la nueva petición

        setState({ status: 'fetching' });

        fetch(url, { signal: abortRef.current.signal }) //hacemos la petición fetch con la url y el signal del AbortController
        // el signal es un objeto que permite controlar la petición fetch, en este caso nos permite abortarla si es necesario
            .then((res) => {
                if (!res.ok) { // si la respuesta no es ok, lanzamos un error con el status de la respuesta
                    if (res.status === 404) throw new Error('No results found');
                    throw new Error(`Error en la petición: ${res.status}`);
                }
                return res.json() as Promise<T>; // devolvemos la respuesta parseada a json
            })
            .then((data) => {
                setState({ status: 'success', data });
                setData(data.results);
            })
            .catch((error: unknown) => {
                if (error instanceof Error && error.name === 'AbortError') return; // si la petición fue abortada, no hacemos nada
                const messageError = error instanceof Error ? error.message : 'Unknown error';
                setState({status: 'error', message: messageError});
                setMessage(messageError);
            })

        return () => {
            abortRef.current?.abort();
        }
    },[url]);
    return { ...state, data, message };
}