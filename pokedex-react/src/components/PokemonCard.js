import React from "react"



export default function PokemonCard(props) {
    const [showShiny, setShowShiny] = React.useState(false)

    const { name, id, sprites, types } = props.pokeInfo

    function toggleShiny() {
        setShowShiny(prevShiny => !prevShiny)
    }
    let typeString = ""
    types.forEach(type => {
        typeString += type.type.name + " "
    })

    return (
        <div className="pokemoncard">
            <img className="pokemoncard--sprite" onClick={toggleShiny} src={showShiny ? sprites.front_shiny : sprites.front_default} />
            <h2>{id}. {name}</h2>
            <p>{typeString}</p>


        </div>
    )

}
