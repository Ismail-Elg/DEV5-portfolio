import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 0, 1.5);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(".webgl"),
            antialias: true,
            alpha: true,
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        this.controls.minPolarAngle = Math.PI * 0.5;
        this.controls.maxPolarAngle = Math.PI * 0.5;
        this.controls.minAzimuthAngle = -Math.PI * 0.5;
        this.controls.maxAzimuthAngle = Math.PI * 0.5;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableDamping = true;

        this.clock = new THREE.Clock();

    }

    init() {
        this.createMesh();
        this.createLights();
        this.addEvents();
        this.helpers();
        THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    
        };
        THREE.DefaultLoadingManager.onLoad = () => {
            console.log('Loading complete!');
        };
        THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
           
            if (itemsLoaded === itemsTotal) {
                gsap.to(".loader-border", {
                    duration: 2,
                    width: `${itemsLoaded / itemsTotal * 100}%`,
                });
            }

            if (itemsLoaded / itemsTotal * 100 === 100) {
                setTimeout(() => {
                    document.querySelector('.loader-bottom').style.animation = 'down 1.5s ease-in forwards';
                    document.querySelector('.loader-top').style.animation = 'up 1s ease-in forwards';
                }, 1000);
            }
        };
        THREE.DefaultLoadingManager.onError = function (url) {
            console.log('There was an error loading ' + url);
        };
    }

   
    createMesh() {
        const loader = new GLTFLoader();
        loader.load(
            // resource URL
            'donuttello.glb',
            // called when the resource is loaded
            (gltf) => {
                this.donut = gltf.scene;
                this.donut.scale.set(0.5, 0.5, 0.5);
              
                this.donut.rotation.x = Math.PI * 0.20;
                this.donut.position.set(0, 0, 0);
                this.donut.scale.set(0.5, 0.5, 0.5);
     
                this.donut.children[0].children[0].children[4].visible = false;
                this.donut.children[0].children[0].children[0].material.color.set(0xFFD372);
                this.donut.children[0].children[0].children[1].material.color.set(0xE72870);
                this.donut.children[0].children[0].children[2].material.color.set(0xE72870);

                this.scene.add(this.donut);
            }
        );

        this.geometry = new THREE.CircleGeometry(1, 60);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
              uTime: { value: 0.0 },
              uTexture: { value: new THREE.TextureLoader().load('yellow.png') },
            },
            side: THREE.DoubleSide,
        });
        this.cloth = new THREE.Mesh(this.geometry, this.material);
        this.cloth.position.set(0, -0.3, 0);   
        this.cloth.rotation.x = Math.PI * -0.30;
        this.scene.add(this.cloth);
    }

    createLights() {
        this.spotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.8, 0, 1);
        this.spotLight.position.set(0, 0, -5);

        this.pointLight = new THREE.PointLight(0xffffff, 1, 0, 0.8, 0, 1);
        this.pointLight.position.set(0, 0, 5);
 
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(this.ambientLight, this.pointLight, this.spotLight);
    }


    addEvents() {
        requestAnimationFrame(this.run.bind(this));
        window.addEventListener("resize", this.onResize.bind(this), false);

    }

    run() {
        this.stats.begin();
        this.render();
        this.stats.end();
    }

    render() {
        requestAnimationFrame(this.run.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    helpers() {
            this.scene.add(new THREE.GridHelper(10, 10));

        this.scene.add(new THREE.AxesHelper(5));
        this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        this.scene.add(this.spotLightHelper);

        this.pointLightHelper = new THREE.PointLightHelper(this.pointLight);
        this.scene.add(this.pointLightHelper);
    }
}

export default Scene;