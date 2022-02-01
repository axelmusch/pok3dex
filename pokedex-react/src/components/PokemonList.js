import React from "react"
import PokemonCard from "./PokemonCard"


export default function PokemonList() {
    const [pokemonList, setPokemonList] = React.useState([])

    React.useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then(res => res.json())
            .then(data1 => {
                let tempList = []
                data1.results.forEach((listItem, idx) => {
                    fetch(listItem.url)
                        .then(res => res.json())
                        .then(data2 => {
                            tempList.push(data2)
                            tempList.length === data1.results.length && setPokemonList(tempList)
                        })
                });

            })

    }, [])


    const cardElements = pokemonList.map((pokemon) => {

        return (
            <PokemonCard key={pokemon.id} pokeInfo={pokemon}>{pokemon.name}</PokemonCard>
        )
    })

    console.log(pokemonList[0])

    return (
        <div className="pokemonlist">{cardElements}</div>
    )
}