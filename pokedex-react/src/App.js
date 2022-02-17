import React from "react"
import Header from "./components/Header"
import PokemonList from "./components/PokemonList"
import * as THREE from "three"

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";


export default function App() {


    return (
        <div className="app">


            <Router>
                {/*  <Header /> */}
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
