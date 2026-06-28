import type { EpisodesType} from '../types/apis.ts';
import EpisodesCard from '../components/cards/EpisodeCard.tsx';

const Episodes = (dataEpisodes: EpisodesType[]) => {

    
    return (
        <div>
            <p>Episodios de Rick y Morty</p>
            <div>
                {dataEpisodes.map((episode: EpisodesType) => {
                    return (
                        <EpisodesCard
                            key={episode.id}
                            data={episode}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Episodes;