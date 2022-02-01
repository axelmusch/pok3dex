import React from "react"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function PokemonCard(props) {
    const [showShiny, setShowShiny] = React.useState(false)

    const [modelLoaded, setModelLoaded] = React.useState(false)
    const [modelShown, setModelShown] = React.useState(false)
    const { name, id, sprites, types } = props.pokeInfo




    function toggleShiny() {
        setShowShiny(prevShiny => !prevShiny)
    }

    function toggle3D() {
        console.log("3d")
        setModelShown(prevModelShown => !prevModelShown)
    }
    let typeString = ""
    types.forEach(type => {
        typeString += type.type.name + " "
    })


    React.useEffect(() => {
        console.log('effect for load', modelLoaded)
        if (!modelLoaded && modelShown) {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(20, 1, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            let canvasWidth = document.getElementById(name).offsetWidth
            renderer.setSize(canvasWidth, canvasWidth);
            document.getElementById(name).appendChild(renderer.domElement);

            var controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true
            camera.position.z = 8;
            camera.position.y = 0.5;
            const light = new THREE.AmbientLight(0xffffff); // soft white light
            light.intensity = 1
            scene.add(light);
            const loader = new GLTFLoader()
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path

            loader.dracoLoader = dracoLoader
            loader.load('./models/' + name + '.glb', function (gltf) {
                gltf.scene.traverse(child => {
                    if (child.isMesh) {


                    }
                    if (child.isGroup) console.log(child)
                })


                scene.add(gltf.scene);
                renderer.render(scene, camera);
            });

            var animate = function () {
                requestAnimationFrame(animate);
                controls.update()
                renderer.render(scene, camera);
            };
            animate();
            //setModelLoaded(true)
            window.addEventListener('resize', onWindowResize);
            function onWindowResize() {
                console.log("resize")
                camera.aspect = 1;
                canvasWidth = document.getElementById(name).offsetWidth
                renderer.setSize(canvasWidth, canvasWidth);
                camera.updateProjectionMatrix();

            }

        }

    }, [modelShown])

    return (
        <div className="pokemoncard">
            <p onClick={toggle3D} className="pokemoncard--3dVisibility noselect">{modelShown ? "Hide" : "Show"} 3D</p>

            {!modelShown ?
                <img className="pokemoncard--sprite" onClick={toggleShiny} src={showShiny ? sprites.front_shiny : sprites.front_default} /> :
                <div id={name} className="pokemoncard--pokemonCanvas"></div>}

            <h2>{id}. {name}</h2>
            <p>{typeString}</p>
        </div>
    )

}
