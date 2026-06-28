import type { EpisodesType } from "../../types/apis.ts";

const EpisodesCard= ({ data }: { data: EpisodesType }) => {
    return(
        <div>
            <div>
                <h2>{data.name}</h2>
            </div>
            <div>{data.url}</div>
            <div>
                <p>Personajes que aparecen en este episodio:</p>
                {data.characters.map((character: string) => {
                    return(
                        <div key={character}>
                            <p>{character}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EpisodesCard;