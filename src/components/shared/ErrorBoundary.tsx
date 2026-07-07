import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {

    state: State = { hasError: false };
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