import React from 'react'

import { Link, useParams } from 'react-router-dom'

import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelInfo from "../modelInfo";
import backIcon from "../images/back_icon.svg";
import Header from './Header';

function PokemonDetail() {
    const { pokemonId } = useParams()
    const [currentPokemon, setCurrentPokemon] = React.useState()
    const [currentTitle, setCurrentTitle] = React.useState("")
    const [hasModel, setHasModel] = React.useState(false)

    const [prevPokemon, setPrevPokemon] = React.useState()
    const [nextPokemon, setNextPokemon] = React.useState()

    let canvasWidth, canvasHeight, camera, renderer

    React.useEffect(() => {

        if (document.getElementById("loadscreen")) {
            document.getElementById("loadscreen").addEventListener('transitionend', removeLoadScreen);
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res => res.json())
            .then(data => {

                setCurrentPokemon(data)
                fetch(data.species.url).then(res => res.json())
                    .then(data => {
                        console.log("🚀 ~ file: PokemonDetail.js ~ line 91 ~ React.useEffect ~ data", data.flavor_text_entries[0])
                        setCurrentTitle(data.flavor_text_entries[0].flavor_text)
                    })


                console.log(modelInfo);
                if (modelInfo.includes(parseInt(pokemonId))) {
                    initModel(data)
                    setHasModel(true)

                } else {
                    if (document.getElementById("loadscreen")) document.getElementById("loadscreen").style.opacity = 0
                }
            })

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('transitionend', removeLoadScreen);
        }
    }, [pokemonId])

    function removeLoadScreen() {
        document.getElementById("loadscreen").remove()

    }

    function initModel(dat) {
        let scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        canvasWidth = document.getElementById("detailCanvas").offsetWidth
        canvasHeight = document.getElementById("detailCanvas").offsetHeight
        camera = new THREE.PerspectiveCamera(30, canvasWidth / canvasHeight, 0.1, 1000);
        renderer.setSize(canvasWidth, canvasHeight);
        document.getElementById("detailCanvas").appendChild(renderer.domElement);
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false
        //controls.enableZoom = false
        controls.autoRotate = true
        camera.position.z = 8;
        camera.position.y = 0.5;
        const lightint = 1
        const light = new THREE.PointLight(0xffffff, lightint, 100);
        light.position.set(2, 2, 2);
        scene.add(light);


        const light2 = new THREE.PointLight(0xffffff, lightint, 100);
        light2.position.set(-2, 2, 2);
        scene.add(light2);

        const light3 = new THREE.PointLight(0xffffff, lightint, 100);
        light3.position.set(2, 2, -2);
        scene.add(light3);


        const light4 = new THREE.PointLight(0xffffff, lightint, 100);
        light4.position.set(-2, 2, -2);
        scene.add(light4);

        const light6 = new THREE.PointLight(0xffffff, lightint, 100);
        light6.position.set(0, 2, 0);
        scene.add(light6);


        const light5 = new THREE.PointLight(0xffffff, lightint, 100);
        light5.position.set(0, -2, 0);
        scene.add(light5);

        const helper6 = new THREE.PointLightHelper(light4, 1);
        scene.add(helper6);

        const helper5 = new THREE.PointLightHelper(light5, 1);
        scene.add(helper5);

        const helper4 = new THREE.PointLightHelper(light4, 1);
        scene.add(helper4);

        const helper3 = new THREE.PointLightHelper(light3, 1);
        scene.add(helper3);

        const helper2 = new THREE.PointLightHelper(light2, 1);
        scene.add(helper2);

        const helper = new THREE.PointLightHelper(light, 1);
        scene.add(helper);


        scene.add(light);
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path

        loader.dracoLoader = dracoLoader
        console.log(`/models/${dat.name}.glb`)
        loader.load(`../models/${dat.name}.glb`, function (gltf) {
            gltf.scene.traverse(child => {
                if (child.isMesh) {
                    let newmat = new THREE.MeshBasicMaterial()
                    child.material.roughness = 0.9
                    console.log(child.material)
                    newmat.map = child.material.map
                    child.material = newmat
                }

            }, () => { }, (event) => { console.log(event) })
            if (document.getElementById("loadscreen")) document.getElementById("loadscreen").style.opacity = 0
            scene.add(gltf.scene);
            renderer.render(scene, camera);
        });
        let animate = function () {
            requestAnimationFrame(animate);
            controls.update()
            renderer.render(scene, camera);
        };
        animate();
        //TODO: remove listener when back
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        canvasWidth = document.getElementById("detailCanvas").offsetWidth
        canvasHeight = document.getElementById("detailCanvas").offsetHeight
        renderer.setSize(canvasWidth, canvasHeight);
        camera.aspect = canvasWidth / canvasHeight
        camera.updateProjectionMatrix();
    }

    let mappedTypes = []

    if (currentPokemon) {
        mappedTypes = currentPokemon.types.map(type => {
            return (
                <p className={`type--${type.type.name} pokemoncard--type`} key={type.type.name}>{type.type.name}</p>
            )
        })
    }

    /* const contentPrevF = () => {
        return "prev" + (id - 1)
    }
    let contentPrev = contentPrevF()


    const contentNextF = () => {

        let nextId = id + 1

        fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`)
            .then(res => res.json())
            .then(data => {
                console.log("🚀 ~ file: PokemonDetail.js ~ line 171 ~ contentNextF ~ data", data)
                return (<Link to={`/pokemon/${data.id}`}>
                    {data.name}
                </Link>)
            })


    }
    let contentNext = contentNextF() */


    return (
        <div className='pokemondetail'>
            <Header />

            <div id={"detailCanvas"} className="pokemondetail--pokemonCanvas">
                <div id='loadscreen' className='pokemondetail__loadscreen'><h2>Loading...</h2></div>

                {(!hasModel && currentPokemon) &&
                    <div className='pokemondetail__sprite'>
                        <img alt='' src={currentPokemon.sprites.front_default} />
                        <h3>No 3D model available yet...</h3>
                    </div>}

                {currentPokemon &&
                    <div className='pokemondetail__details'>
                        <Link to="/">
                            <div className='pokemondetail__details__back'>
                                <img alt='' src={backIcon} />
                                <h1>Back</h1>
                            </div>

                        </Link>
                        <div className='pokemondetail__details__bottom'>
                            <div className='pokemondetail__details__types'>{mappedTypes}</div>
                            <h1 className='pokemondetail__details__name'>{currentPokemon.name}</h1>
                            <div className='pokemondetail__details__title'>{currentTitle}</div>
                            <div className='pokemondetail__nav'>
                                <div className='pokemondetail__prev'>{/* contentPrev */}</div>
                                <div className='pokemondetail__next'>{/* contentNext */}</div>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>

    )
}

export default PokemonDetail