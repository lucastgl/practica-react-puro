import type { CharacterType } from '../../types/apis.ts'

const CharacterCard = (object: CharacterType) => {

    return(
        <div>
            <h2>{object.name}</h2>
            <img src={object.image} alt={object.name} />
            <p>Status: {object.status}</p>
            <p>Species: {object.species}</p>
        </div>
    )
}

export default CharacterCard;