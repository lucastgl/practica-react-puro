import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {

    state: State = { hasError: false };

    //Estos son lifecycle methods que capturan errores lanzados durante el render de los hijos 
    //no hay forma de "atrapar" ese throw desde un function component con hooks, 
    //porque los hooks no tienen un mecanismo de "catch" del árbol de renderizado de sus hijos. 
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch(error: unknown, info: unknown) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <p className='text-red-400 text-center py-8'>Ocurrió un error al mostrar esta página.</p>
            );
        }
        return this.props.children;
    }

}