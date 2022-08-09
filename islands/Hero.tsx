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

        <div ref={ref} style={{ height: "50vh" }}/>
        // <p class={tw`invisible h-0 xl:h-auto xl:visible text-clip font-mono text-sm leading-tight my-4 text-transparent bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400`} style={{ whiteSpace: 'pre-line' }}>

        //     BBPJ??????777!!!!?????JPBBBP5555YJ?JJ???JJJJJJ?7??JJ?7777??JYYJ?????7777?J?JYJ?????JJJYYY5P5YYY5PPPP{`\n`}
        //     55JJYJJJ???7777????YPG#@@@@&#BGP5YYJJ?JYYYYYJ?????JYYYJY5PG5JJYJYJ77???J77??7???JYJJJJJ??JJJYY5YY5GG{`\n`}
        //     ?7?J?JYJJJJJJJYYYY5PB#@&#G5J!^::^~7YG#BG5YYJJ?JYY5555Y55PPYJJ??777???J?77?JYYYYYJJJ?J55JJ?777?JJJJJY{`\n`}
        //     777?JYYJJJJJJYY5PPPPB#P7^...........^?GBPYJ?YJJJJJ??????77!!!!!7??????7???JJ5GGGGG5PPPGPJ?JJ?7777777{`\n`}
        //     ???JJYJJ5PYJJJJJY5PPP7:.......::^^:...:?55YJJJJYJJ???JJYJ?777??YY??77JYYYYYYYYP#&&#BB5YYYY??????7??J{`\n`}
        //     Y55P5YJ5YYYJYYJJJ5P57::..:!YPGGBBBGY7:..7PPYJJ?????Y5YYYYJJ?????!7??JYYYYY5GGPPGGPG5?77??JJ?7??JJ?77{`\n`}
        //     BGP55555YJ?JJJJJYYJ?!~^~YB&&&#####&&#G?^^?YJ???7?YPJ!!777JYJ??77?JJYY5PGGPYJ?77!~!~~^~~~~~!7?7777?Y5{`\n`}
        //     P5YJ?J5GPYJ???JJJ??J!!JB&##############Y~!77??77!!7?P###G????????JP#BGGPPBP?7!!!~^^~~!77!!7?J??Y55BB{`\n`}
        //     7!?YP#&&&#GPYYJJ??77?B&####Kojin########5?!77777!!!7PB##BJ!7??77?Y5YYYGP7!!~~~~~~!!7JJ77??J?JY??YJJJ{`\n`}
        //     G#&&&&&&&#PPYJ??7?77!JB&#######Glick###&G!~!777777!7!7?7777???JJJ?!!!!!!~~!7777!!777!!7??YP5??J?!!!?{`\n`}
        //     ##&&&&#BPYJ????????7!~!YB############&#P7~~!!777777!7777????????7!7??7~~7?777777777???????Y5Y??JYYYY{`\n`}
        //     ?5BG5YJ!!7?JJJJ?????777!!?5GB######BGY7^~!!77777777!!7777777777777??!??7777???77?7??????J?!!!??JYPGP{`\n`}
        //     7777!!~~~!7???J???????77!!~~!77??7!~~^~!7!77777J?777???????7?77???7!~~!7777??????JJJJJJJ?JJJYYYYPGGG{`\n`}
        //     Y?!!!!!!!777????????J??7777!!!!~~~~~~!!!!!777777777?777?J?7?JY55?7777???JJJ?JJJJJJYYYYJJJJJ555B&&&&&{`\n`}
        //     GPJ77777?J??JJJYYYJJ????7777?!!!!7!!!!777777??7777??JJYJ?JJ?777!~~~~7?5B#BG5YYPP555JYYYYYP55G5Y5PP5Y{`\n`}
        //     ??77???J??????JJJJJ???????77777??77777777??77??????7?YY?7!~~~~~~!7?YGG5JJJJJYG&&###G5Y555P5J?J?!!!?J{`\n`}
        //     777???JJYYY5Y???????????????JJ???J??77????????7!!!!!!^^~!!7!!7?7Y5JJYYJJ5YJYP#BB##BPYJJJ??7??J???JYP{`\n`}
        //     777??JJJJJJJJYYJJJ??7????JJJJ??????7777??7???77777??777!~~!!7!YGBBB###BY?JJYYJ7!777??77????J?7?JJJY5
        // </p>
    )
}