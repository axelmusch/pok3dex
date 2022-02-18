import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelInfo from "../modelInfo";
import Header from './Header';

function PokemonDetail(props) {
    const { pokemonId } = useParams()
    const location = useLocation();
    //const { from } = location.state;   
    console.log(location.state.name)

    /* const { name, id, sprites, types } = props.pokeInfo */
    const name = location.state.name
    console.log(pokemonId)
    React.useEffect(() => {

        let scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        let canvasWidth = document.getElementById(name).offsetWidth
        let canvasHeight = document.getElementById(name).offsetHeight
        let camera = new THREE.PerspectiveCamera(30, canvasWidth / canvasHeight, 0.1, 1000);
        renderer.setSize(canvasWidth, canvasHeight);
        document.getElementById(name).appendChild(renderer.domElement);

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false
        //controls.enableZoom = false
        controls.autoRotate = true
        camera.position.z = 8;
        camera.position.y = 0.5;

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(2, 1, 2);
        scene.add(light);
        const helper = new THREE.PointLightHelper(light, 1);

        const light2 = new THREE.PointLight(0xffffff, 1, 100);
        light2.position.set(-2, 1, 2);
        scene.add(light2);
        const helper2 = new THREE.PointLightHelper(light2, 1);

        const light3 = new THREE.PointLight(0xffffff, 1, 100);
        light3.position.set(2, 1, -2);
        scene.add(light3);
        const helper3 = new THREE.PointLightHelper(light3, 1);


        const light4 = new THREE.PointLight(0xffffff, 1, 100);
        light4.position.set(-2, 1, -2);
        scene.add(light4);
        const helper4 = new THREE.PointLightHelper(light4, 1);

        const light6 = new THREE.PointLight(0xffffff, 1, 100);
        light6.position.set(0, 1, 0);
        scene.add(light6);
        const helper6 = new THREE.PointLightHelper(light4, 1);


        const light5 = new THREE.PointLight(0xffffff, 1, 100);
        light5.position.set(0, -2, 0);
        scene.add(light5);
        const helper5 = new THREE.PointLightHelper(light5, 1);

        /* scene.add(helper5);
        scene.add(helper4);
        scene.add(helper3);
        scene.add(helper2);
        scene.add(helper); */

        scene.add(light);
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path

        loader.dracoLoader = dracoLoader

        let dat
        if (location.state) {
            console.log("exists");
            dat = location.state
            loader.load(`../models/${dat.name}.glb`, function (gltf) {
                gltf.scene.traverse(child => {
                    if (child.isMesh) {
                        child.material.roughness = 0.8
                        let newMat = new THREE.MeshBasicMaterial({ map: child.material.map })
                    }
                })

                document.getElementById("loadscreen").style.opacity = 0

                scene.add(gltf.scene);
                renderer.render(scene, camera);
            });
        } else {
            console.log("doenst exist");
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    dat = data
                    loader.load(`../models/${dat.name}.glb`, function (gltf) {
                        gltf.scene.traverse(child => {
                            if (child.isMesh) {
                                child.material.roughness = 0.8
                                let newMat = new THREE.MeshBasicMaterial({ map: child.material.map })

                            }
                        })
                        document.getElementById("loadscreen").style.opacity = 0
                        scene.add(gltf.scene);
                        renderer.render(scene, camera);
                    });
                })
        }


        document.getElementById("loadscreen").addEventListener('transitionend', (e) => {
            console.log('Transition ended');
            document.getElementById("loadscreen").remove()
        });



        let animate = function () {
            requestAnimationFrame(animate);
            controls.update()
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', onWindowResize);
        function onWindowResize() {
            console.log("resize")

            canvasWidth = document.getElementById(name).offsetWidth
            canvasHeight = document.getElementById(name).offsetHeight
            renderer.setSize(canvasWidth, canvasHeight);
            camera.aspect = canvasWidth / canvasHeight
            camera.updateProjectionMatrix();
        }

    }, [])

    const mappedTypes = location.state.types.map(type => {
        return (
            <p className={`type--${type.type.name} pokemoncard--type`} key={type.type.name}>{type.type.name}</p>
        )
    })

    return (
        <div className='pokemondetail'>
            <Header />
            <div id={name} className="pokemondetail--pokemonCanvas">
                <div id='loadscreen' className='pokemondetail__loadscreen'><h2>Loading...</h2></div>

                <div className='pokemondetail__details'>
                    <div>{"back"}</div>
                    <div>{"prev"}</div>
                    <div>{"next"}</div>

                    <div className='pokemondetail__details__bottom'>
                        <div className='pokemondetail__details__types'>{mappedTypes}</div>
                        <h1 className='pokemondetail__details__name'>{name}</h1>
                        <div className='pokemondetail__details__title'>{"title"}</div>

                    </div>


                </div>

            </div>
        </div>

    )
}

export default PokemonDetail