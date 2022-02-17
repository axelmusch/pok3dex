import React from 'react'

import { useParams } from 'react-router-dom'

import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelInfo from "../modelInfo";
import Header from './Header';

function PokemonDetail() {
    const { pokemonId } = useParams()

    /* const { name, id, sprites, types } = props.pokeInfo */
    const name = "bulbasaur"
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



        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                loader.load(`../models/${data.name}.glb`, function (gltf) {
                    gltf.scene.traverse(child => {
                        if (child.isMesh) {
                            //console.log(child.material)
                            child.material.roughness = 0.8
                            let newMat = new THREE.MeshBasicMaterial({ map: child.material.map })
                            //console.log(newMat)
                            //child.material = newMat
                        }
                    })
                    scene.add(gltf.scene);
                    renderer.render(scene, camera);
                });
            })




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


    return (
        <div className='pokemondetail'>
            <Header />
            <div id={name} className="pokemondetail--pokemonCanvas"></div>
        </div>

    )
}

export default PokemonDetail