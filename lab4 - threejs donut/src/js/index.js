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
        //create a red box
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

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