import React from "react"
import PokemonList from "./components/PokemonList"

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";


export default function App() {


    return (
        <div className="app">

            <Router>
                <Routes>

                    <Route exact path="/" element={<PokemonList />}>
                    </Route>

                    <Route exact path="/pokemon/:pokemonId" element={<PokemonDetail />}>
                    </Route>

                </Routes>
            </Router>
        </div>

    )
}
