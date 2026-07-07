import type { CharacterType } from '../../types/apis.ts'
import { useFavorites } from '../../context/Context.tsx';
import { memo, useCallback } from 'react';

const statusStyles: Record<string, string> = {
    Alive: 'bg-green-400/20 text-green-400',
    Dead:  'bg-red-400/20 text-red-400',
};

const statusDot: Record<string, string> = {
    Alive: 'bg-green-400',
    Dead:  'bg-red-400',
};

const CharacterCard = memo(({ data }: { data: CharacterType }) => {
    const { addCharacter, removeCharacter, characterFavorites } = useFavorites();
    const statusClass = statusStyles[data.status] ?? 'bg-gray-500/20 text-gray-400';
    const dotClass   = statusDot[data.status]    ?? 'bg-gray-400';

    const handleFavorite = useCallback(() =>{
        if(characterFavorites.some((f:CharacterType) => f.id === data.id)){
            removeCharacter(data.id)
        }else{
            addCharacter(data)
        }
    }, [data.id, characterFavorites, addCharacter, removeCharacter])

    return (
        <div className='bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-400 transition-colors'>
            <img
                src={data.image}
                alt={data.name}
                className='w-full object-cover'
            />
            <div className='p-4 flex flex-col gap-2'>
                <div className='flex items-start justify-between gap-2'>
                    <h2 className='text-white font-bold text-base leading-snug'>{data.name}</h2>
                    <span className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md ${statusClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                        {data.status}
                    </span>
                </div>
                <p className='text-gray-400 text-sm'>{data.species} · {data.gender}</p>
                <div className='pt-2 border-t border-gray-700 flex items-center gap-2'>
                    <span className='text-gray-500 text-xs'>🎬</span>
                    <span className='text-gray-400 text-xs'>{data.episode.length} episodes</span>
                </div>
                <div>
                    <button className='border-r-amber-400 bg-amber-700 p-1 rounded-2xl' onClick={handleFavorite}>Add</button>
                </div>
            </div>
        </div>
    )
})

export default CharacterCard;