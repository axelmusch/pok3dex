import React from "react"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelInfo from "../modelInfo";

export default function PokemonCard(props) {
    const [showShiny, setShowShiny] = React.useState(false)

    const [modelLoaded, setModelLoaded] = React.useState(false)
    const [modelShown, setModelShown] = React.useState(false)
    const { name, id, sprites, types } = props.pokeInfo
    const [hasModel, setHasModel] = React.useState(false)



    function toggleShiny() {
        setShowShiny(prevShiny => !prevShiny)
    }

    function toggle3D() {

        modelShown ? console.log("3d shown") : console.log("3d hidden")

        setModelShown(prevModelShown => !prevModelShown)
    }


    const mappedTypes = types.map(type => {
        return (
            <p className={`type--${type.type.name} pokemoncard--type`} key={type.type.name}>{type.type.name}</p>
        )
    })


    React.useEffect(() => {
        if (modelShown) {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(20, 1, 0.1, 1000);
            console.log(props.renderer)
            var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            let canvasWidth = document.getElementById(name).offsetWidth
            renderer.setSize(canvasWidth, canvasWidth);
            document.getElementById(name).appendChild(props.renderer.domElement);

            var controls = new OrbitControls(camera, props.renderer.domElement);
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

            /*  scene.add(helper5);
             scene.add(helper4);
             scene.add(helper3);
             scene.add(helper2);
             scene.add(helper);
  */

            scene.add(light);
            const loader = new GLTFLoader()
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path

            loader.dracoLoader = dracoLoader
            loader.load('./models/' + name + '.glb', function (gltf) {
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
                props.renderer.render(scene, camera);
            });

            var animate = function () {
                requestAnimationFrame(animate);
                controls.update()
                props.renderer.render(scene, camera);
            };
            animate();

            window.addEventListener('resize', onWindowResize);
            function onWindowResize() {
                console.log("resize")

                canvasWidth = document.getElementById(name).offsetWidth
                props.renderer.setSize(canvasWidth, canvasWidth);
                camera.updateProjectionMatrix();
            }
        }
    }, [modelShown])

    if (!modelLoaded) {

        console.log(modelInfo[id - 1])

        /*  const loader = new GLTFLoader()
         const dracoLoader = new DRACOLoader();
         dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path
         loader.dracoLoader = dracoLoader
         loader.load('./models/' + name + '.glb', function (gltf) {
             setHasModel(true)
 
         },
             function (xhr) {
                 console.log((xhr.loaded / xhr.total * 100) + '% loaded');
             },
             // called when loading has errors
             function (error) {
             }); */


        modelInfo[id - 1] && setHasModel(true)
        setModelLoaded(true)
    }




    return (
        <div className="pokemoncard">
            <div className="pokemoncard--topButtons">
                <p className="noselect" onClick={toggleShiny}>{!showShiny ? '⭐' : '🌟'}</p>
                {hasModel && <p onClick={toggle3D} className="pokemoncard--3dVisibility noselect">{modelShown ? "Hide" : "Show"} 3D</p>}
            </div>

            {!modelShown ?
                <img className="pokemoncard--sprite" src={showShiny ? sprites.front_shiny : sprites.front_default} /> :
                <div id={name} className="pokemoncard--pokemonCanvas"></div>}

            <h2>{id}. {name}</h2>
            <div className="pokemoncard--types">{mappedTypes}</div>
        </div>
    )

}
