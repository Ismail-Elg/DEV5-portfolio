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
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);


    }

    init() {
        this.createMesh();
        this.createLights();
        this.addEvents();
        this.helpers();
    }

   
    createMesh() {

    }

    createLights() {

    }

    addEvents() {
      
    }
    
    run() {
    
    }

    render() {
       
    }

    onResize() {
    
    }

    helpers() {
    
    }
}

export default Scene;