import React from "react"
import { Link } from "react-router-dom";

import modelInfo from "../modelInfo";
import logo_small from "../images/logo_small.png"
export default function PokemonCard(props) {
    const [showShiny, setShowShiny] = React.useState(false)

    const [modelLoaded, setModelLoaded] = React.useState(false)
    const [modelShown, setModelShown] = React.useState(false)
    const { name, id, sprites, types } = props.pokeInfo
    const [hasModel, setHasModel] = React.useState(false)



    function toggleShiny() {
        setShowShiny(prevShiny => !prevShiny)
    }




    const mappedTypes = types.map(type => {
        return (
            <p className={`type--${type.type.name} pokemoncard--type`} key={type.type.name}>{type.type.name}</p>
        )
    })



    React.useEffect(() => {
        modelInfo[id - 1] && setHasModel(true)

    })





    return (
        <div className="pokemoncard">
            <div className="pokemoncard--topButtons">
                <p className="noselect" onClick={toggleShiny}>{!showShiny ? '⭐' : '🌟'}</p>
                {hasModel &&
                    <Link className="pokemoncard--3dVisibility noselect" to={`/pokemon/${id}`}>
                        {/*  <p className="pokemoncard--3dVisibility noselect">{modelShown ? "Hide" : "Show"} 3D</p> */}
                        <img src={logo_small} />
                    </Link>}
            </div>


            <img className="pokemoncard--sprite" src={showShiny ? sprites.front_shiny : sprites.front_default} />


            <h2>{id}. {name}</h2>
            <div className="pokemoncard--types">{mappedTypes}</div>
        </div>
    )

}
