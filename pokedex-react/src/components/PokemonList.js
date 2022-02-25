import React from "react"
import Header from "./Header"
import PokemonCard from "./PokemonCard"

export default function PokemonList(props) {
    const [pokemonList, setPokemonList] = React.useState([])

    const numberOfMons = 30
    //TODO: load pages when scrolled

    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfMons}`)
            .then(res => res.json())
            .then(data1 => {
                let tempList = []
                data1.results.forEach((listItem, idx) => {
                    fetch(listItem.url)
                        .then(res => res.json())
                        .then(data2 => {
                            tempList.push(data2)
                            if (tempList.length - 1 === numberOfMons - 1) {
                                tempList.sort((a, b) => {
                                    return a.id - b.id;
                                });
                                setPokemonList(tempList)
                            }
                        })
                });
            })
    }, [])



    const cardElements = pokemonList.map((pokemon) => {

        return (
            <PokemonCard renderer={props.renderer} key={pokemon.id} pokeInfo={pokemon}>{pokemon.name}</PokemonCard>
        )
    })

    //console.log(pokemonList)

    return (
        <div className="pokelist">
            <Header />
            <div className="pokemonlist">{cardElements}</div>
        </div>

    )
}