import type { LocationType } from '../../types/apis.ts'

const LocationCard = ({ data }: { data: LocationType }) => {
    return (
        <div className='bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:border-purple-400 transition-colors'>
            <div className='flex items-start justify-between gap-3'>
                <h2 className='text-white font-bold text-base leading-snug'>{data.name}</h2>
                {data.type && (
                    <span className='shrink-0 bg-purple-400/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded-md'>
                        {data.type}
                    </span>
                )}
            </div>
            <p className='text-gray-400 text-sm'>
                {data.dimension !== 'unknown' ? data.dimension : 'Unknown dimension'}
            </p>
            <div className='mt-auto pt-3 border-t border-gray-700 flex items-center gap-2'>
                <span className='text-gray-500 text-xs'>👤</span>
                <span className='text-gray-400 text-xs'>{data.residents.length} residents</span>
            </div>
        </div>
    )
}

export default LocationCard;
