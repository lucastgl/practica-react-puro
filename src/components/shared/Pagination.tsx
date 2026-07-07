import {memo} from 'react'

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination = memo((props: PaginationProps) => {

    return (
        <div className='flex justify-center items-center gap-4 mb-4'>
            <button
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
                onClick={props.onPrev}
                disabled={!props.hasPrev}
            >
                anterior
            </button>
            <p>{props.currentPage}/{props.totalPages}</p>
            <button
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
                onClick={props.onNext}
                disabled={!props.hasNext}
            >
                siguiente
            </button>
        </div>
    )
})

export default Pagination