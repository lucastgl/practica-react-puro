import type { EpisodesType } from "../../types/apis.ts";
import { memo, useCallback } from "react";
import { useFavorites } from "../../context/Context.tsx"; 

const EpisodesCard = memo(({ data }: { data: EpisodesType }) => {
    const { addEpisode, removeEpisode, episodesFavorites } = useFavorites();

    const handleFavorite = useCallback(() => {
        if (episodesFavorites.some((f: EpisodesType) => f.id === data.id)) {
            removeEpisode(data.id)
        } else {
            addEpisode(data)
        }
    },[data.id, episodesFavorites, addEpisode, removeEpisode])

    return (
        <div className='bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:border-green-400 transition-colors'>
            <div className='flex items-start justify-between gap-3'>
                <h2 className='text-white font-bold text-base leading-snug'>{data.name}</h2>
                <span className='shrink-0 bg-green-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-md'>
                    {data.episode}
                </span>
            </div>
            <p className='text-gray-400 text-sm'>{data.air_date}</p>
            <div className='mt-auto pt-3 border-t border-gray-700 flex items-center gap-2'>
                <span className='text-gray-500 text-xs'>👥</span>
                <span className='text-gray-400 text-xs'>{data.characters.length} characters</span>
            </div>
            <div>
                <button className='border-r-amber-400 bg-amber-700 p-1 rounded-2xl' onClick={handleFavorite}>Add</button>
            </div>
        </div>
    )
})

export default EpisodesCard;