/** @jsx h */
import { h } from 'preact'
import { useLayoutEffect, useRef } from 'preact/hooks'
import { IS_BROWSER } from 'fresh/runtime.ts'
import { tw } from 'twind'
import * as THREE from "three"
import { AsciiEffect } from "AsciiEffect"
import { OrbitControls } from "orbit"

export default ({ }: any) => {
    const ref = useRef<HTMLDivElement>()

    if (IS_BROWSER) {
        useLayoutEffect(() => {

            const WIDTH = ref.current?.offsetWidth;
            const HEIGHT = ref.current?.offsetHeight;

            console.log('h:', HEIGHT)
            console.log('w:', WIDTH)

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.01, 1000);

            const pointLight1 = new THREE.PointLight(0xffffff);
            pointLight1.position.set(-150, -150, 150);
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0xffffff);
            pointLight2.position.set(150, 150, 0);
            scene.add(pointLight2);


            const geometry = new THREE.TorusGeometry(50, 25, 20, 100);
            const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
            const torus = new THREE.Mesh(geometry, material);
            torus.position.x = -25
            torus.position.y = 5
            scene.add(torus);

            const renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0x000000, 0);
            renderer.setSize(WIDTH, HEIGHT);


            const effect = new AsciiEffect( renderer,  ' .:-=+*#%@', { invert: false, bColor: "#34d399"})
            effect.setSize(WIDTH, HEIGHT);
            effect.domElement.setAttribute("class", 'font-monospace dark:text-green-400 text-black');

            const controls = new OrbitControls(camera, effect.domElement);
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableRotate = false;


            ref.current.appendChild(effect.domElement);

            camera.position.z = 150;

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                torus.rotation.x += 0.01;
                torus.rotation.y += 0.01;
                effect.render(scene, camera);
            }
            animate();

            return () => ref.current.removeChild(effect.domElement);

        }, [])
    }

    return (

        <div ref={ref} class={tw`select-none h-screen opacity-30 lg:pt-16 lg:pl-16`}/>
    )
}