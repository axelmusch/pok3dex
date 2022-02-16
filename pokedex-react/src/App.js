import React from "react"
import Header from "./components/Header"
import PokemonList from "./components/PokemonList"
import * as THREE from "three"

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";


export default function App() {

    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //renderer.render()

    return (
        <div>
            <Header />

            <Router>
                <Routes>

                    <Route path="/" element={<PokemonList renderer={renderer} />}>
                    </Route>



                </Routes>
            </Router>
        </div>

    )
}
