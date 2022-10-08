import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


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
    }

    init() {
        this.createMesh();
        this.createLights();
        this.addEvents();
        this.helpers();
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

                this.scene.add(this.donut);
            }
        );
    }

    createLights() {

    }

    addEvents() {
        requestAnimationFrame(this.run.bind(this));
        window.addEventListener("resize", this.onResize.bind(this), false);

    }

    run() {
        this.render();
    }

    render() {
        requestAnimationFrame(this.run.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    helpers() {
    
    }
}

export default Scene;