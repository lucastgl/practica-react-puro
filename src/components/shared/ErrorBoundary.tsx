import { Component, type ReactNode } from "react";
import ErrorImage from "../../assets/OcurrioUnError.png";

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
            //Si el state tiene un error, renderizamos el fallback que nos pasaron por props, o un mensaje de error por defecto
            return this.props.fallback ?? (
                <div className='flex flex-col justify-center items-center py-8 gap-4'>
                    <p className='text-red-400 text-2xl font-bold text-center'>Ocurrió un error inesperado</p>
                    <img
                        src={ErrorImage}
                        alt='Ocurrió un error al mostrar esta página'
                        className='max-w-2xl w-full mask-[radial-gradient(ellipse_60%_60%_at_center,black_55%,transparent_100%)]'
                    />
                </div>
            );
        }
        //Si no hay error, renderizamos los hijos normalmente.
        return this.props.children;
    }

}