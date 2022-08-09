/** @jsx h */
import { h, Fragment } from "preact"
import { useState, useLayoutEffect, useRef } from "preact/hooks"
import { IS_BROWSER } from "fresh/runtime.ts"
import { tw } from "twind"
import * as THREE from "three"
import { OrbitControls } from "orbit"
import { STLLoader } from "loader"

interface _CubeProps {
    pathname: string
}

export default ({ pathname }: _CubeProps) => {
    const [section, setSection] = useState<number>(0)
    const [scroll, setScroll] = useState<number>(0)
    const [environment, setEnvironment] = useState<Record<string, any> | undefined>();
    const [renderer, setRenderer] = useState();
    const ref = useRef<HTMLDivElement | undefined>()


    const LEAVE_DISTANCE = 50;

    const CTL_ROTATION_SPEED = 2.5;

    const handleScroll = (e) => {
        setScroll(scroll => scroll > 1250 ? 1250 : scroll < 0 ? 0 : scroll + Math.sign(e.deltaY) * 10)
    }

    const handleNext = () => {
        console.log(section)
        if (section === 0) {
            setSection(1)
        }
        if (section === 1) {
            setSection(2)
        }
        if (section === 2) {
            setSection(3)
        }
    }


    if (IS_BROWSER) {
        useLayoutEffect(() => {
            document.querySelector("body")?.setAttribute('style', 'overflow-y: hidden; background-color: white; overscroll: contain;')
            document.addEventListener("wheel", handleScroll)
        }, [])

        useLayoutEffect(() => {
            if (scroll < 500) {
                setSection(0)
            }
            if (scroll >= 500 && scroll < 755) {
                setSection(1)
            }
            if (scroll >= 750 && scroll < 1000) {
                setSection(2)
            }
            if (scroll >= 1000) {
                setSection(3)
            }
        }, [scroll])


        useLayoutEffect(() => {

            console.log(ref.current?.offsetTop)

            const WIDTH = ref.current?.offsetWidth;
            const HEIGHT = ref.current?.offsetHeight;

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);
            const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.01, 1000);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(WIDTH, HEIGHT);

            ref.current.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = CTL_ROTATION_SPEED

            const loader = new STLLoader()
            const mixerMap = {}

            const loadSectionOne = async () => await new Promise((resolve, reject) => {
                loader.load(
                    '/prod/_cube/sections/section1v2.stl',
                    (geometry) => {
                        geometry.center();
                        const material = new THREE.MeshNormalMaterial();
                        const mesh = new THREE.Mesh(geometry, material)
                        mesh.rotation.set(Math.PI / 2, 2 * Math.PI / 2, Math.PI / 2)
                        //  endpt: mesh.position.set(0, -0.5, 0)
                        mesh.position.set(0, -0.5, 0)
                        mesh.visible = true;

                        scene.add(mesh);
                        resolve(mesh)
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                    },
                    (error) => {
                        console.log(error)
                        reject()
                    }
                )
            })

            const loadSectionTwoA = async () => await new Promise((resolve, reject) => {
                loader.load(
                    '/prod/_cube/sections/section2a.stl',
                    (geometry) => {
                        geometry.center();
                        const material = new THREE.MeshNormalMaterial();
                        const mesh = new THREE.Mesh(geometry, material);
                        mesh.rotation.set(Math.PI / 2, 2 * Math.PI / 2, Math.PI / 2)
                        // endpt: mesh.position.set(0.75,-1.2, 4)
                        mesh.position.set(0.75, -1.2, LEAVE_DISTANCE)
                        mesh.visible = false

                        scene.add(mesh);
                        resolve(mesh)
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                    },
                    (error) => {
                        console.log(error)
                        reject()
                    }
                )
            })

            const loadSectionTwoB = async () => await new Promise((resolve, reject) => {
                loader.load(
                    '/prod/_cube/sections/section2b.stl',
                    (geometry) => {
                        geometry.center();
                        const material = new THREE.MeshNormalMaterial();
                        const mesh = new THREE.Mesh(geometry, material)
                        mesh.rotation.set(Math.PI / 2, 2 * Math.PI / 2, Math.PI / 2)
                        //  endpt: mesh.position.set(1.6,-3.55,-12)
                        mesh.position.set(0.32, -3.05, -LEAVE_DISTANCE)
                        mesh.visible = false

                        scene.add(mesh);
                        resolve(mesh)
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                    },
                    (error) => {
                        console.log(error)
                        reject()
                    }
                )
            })

            const loadSectionThree = async () => await new Promise((resolve, reject) => {
                loader.load(
                    '/prod/_cube/sections/section3.stl',
                    (geometry) => {
                        geometry.center();
                        const material = new THREE.MeshNormalMaterial();
                        const mesh = new THREE.Mesh(geometry, material)
                        mesh.rotation.set(Math.PI / 2, 2 * Math.PI / 2, Math.PI / 2)
                        // endpt: mesh.position.set(1, -3.6, 19)
                        mesh.position.set(1, -3.6, LEAVE_DISTANCE)
                        mesh.visible = false

                        scene.add(mesh);
                        resolve(mesh)
                    },
                    (xhr) => {
                        console.log('section 3: ' + (xhr.loaded / xhr.total) * 100 + '% loaded')
                    },
                    (error) => {
                        console.log(error)
                        reject()
                    }
                )
            })

            const loadSectionFourA = async () => await new Promise((resolve, reject) => {
                loader.load(
                    '/prod/_cube/sections/section4av2.stl',
                    (geometry) => {
                        geometry.center();
                        const material = new THREE.MeshNormalMaterial();
                        const mesh = new THREE.Mesh(geometry, material)
                        mesh.rotation.set(Math.PI / 2, 2 * Math.PI / 2, Math.PI / 2)
                        // endpt: mesh.position.set(1,-11.3,17)
                        mesh.position.set(1, -11.3, LEAVE_DISTANCE)
                        mesh.visible = false

                        scene.add(mesh);
                        resolve(mesh)
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                    },
                    (error) => {
                        console.log(error)
                        reject()
                    }
                )
            })

            const loadSectionFourB = async () => await new Promise((resolve, reject) => {
                loader.load(
                    '/prod/_cube/sections/section4bv2.stl',
                    (geometry) => {
                        geometry.center();
                        const material = new THREE.MeshNormalMaterial();
                        const mesh = new THREE.Mesh(geometry, material)
                        mesh.rotation.set(Math.PI / 2, 2 * Math.PI / 2, Math.PI / 2)
                        // endpt: mesh.position.set(1.46,-11.3,-10.5)
                        mesh.position.set(0.52, -11.0, -LEAVE_DISTANCE)
                        mesh.visible = false

                        scene.add(mesh);
                        resolve(mesh)
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                    },
                    (error) => {
                        console.log(error)
                        reject()
                    }
                )
            })

            camera.position.z = 150;

            (async () => {
                let m = [await loadSectionOne(), await loadSectionTwoA(), await loadSectionTwoB(), await loadSectionThree(), await loadSectionFourA(), await loadSectionFourB()]
                setEnvironment({
                    mixers: mixerMap,
                    models: m,
                    scene,
                    controls,
                    renderer,
                    camera
                })
            })()

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera)
            }

            animate();

            return () => ref.current.removeChild(renderer.domElement);
        }, [])

        useLayoutEffect(() => {

            if (environment) {

                let s = scroll;

                console.log(s)

                const clock = new THREE.Clock()

                let alpha = 0;

                const section0 = () => {
                    requestAnimationFrame(section0);

                    const delta = clock.getDelta()

                    // Yeet Twos
                    let twoAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[1].position.y, LEAVE_DISTANCE * 4)
                    let twoBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[2].position.y, -LEAVE_DISTANCE * 4)

                    let newA = alpha += delta

                    if (newA <= 1) {
                        // console.log('newA', newA)
                        environment.models[1].position.lerp(twoAPosition, newA);
                        environment.models[2].position.lerp(twoBPosition, newA);
                    } else {
                        environment.models[1].position.lerp(twoAPosition, 1);
                        environment.models[2].position.lerp(twoBPosition, 1);
                    }

                    if (environment.models[1].position.z > LEAVE_DISTANCE * 2) {
                        environment.models[1].visible = false;
                        environment.models[2].visible = false;
                    }



                    environment.renderer.render(environment.scene, environment.camera);
                }


                const section1 = () => {

                    // console.log(requestAnimationFrame(section1));
                    requestAnimationFrame(section1);

                    let delta = clock.getDelta()
                    // console.log('start', environment.models[1].position.z )
                    // Place Twos
                    let twoAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[1].position.y, 4)
                    let twoBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[2].position.y, -12)

                    // Yeet Three
                    let threePosition = new THREE.Vector3(environment.models[3].position.x, environment.models[3].position.y, LEAVE_DISTANCE * 4)

                    environment.models[1].visible = true;
                    environment.models[2].visible = true;
                    const newA = alpha += delta

                    if (newA <= 1) {
                        // console.log('newA', newA)
                        environment.models[1].position.lerp(twoAPosition, newA);
                        environment.models[2].position.lerp(twoBPosition, newA);
                        environment.models[3].position.lerp(threePosition, newA);
                    } else {
                        environment.models[1].position.lerp(twoAPosition, 1);
                        environment.models[2].position.lerp(twoBPosition, 1);
                        environment.models[3].position.lerp(threePosition, 1);
                    }
                    if (environment.models[3].position.z > LEAVE_DISTANCE * 2) {
                        environment.models[3].visible = false;
                    }

                    environment.renderer.render(environment.scene, environment.camera);
                }

                const section2 = () => {
                    requestAnimationFrame(section2)
                    let delta = clock.getDelta()
                    // Place Three
                    let threePosition = new THREE.Vector3(environment.models[3].position.x, environment.models[3].position.y, 19)

                    // Yeet Fours
                    let fourAPosition = new THREE.Vector3(environment.models[4].position.x, environment.models[4].position.y, LEAVE_DISTANCE * 4)
                    let fourBPosition = new THREE.Vector3(environment.models[5].position.x, environment.models[5].position.y, -LEAVE_DISTANCE * 4)

                    environment.models[3].visible = true;
                    const newA = alpha += delta
                    if (newA <= 1) {
                        environment.models[3].position.lerp(threePosition, newA);
                        environment.models[4].position.lerp(fourAPosition, newA);
                        environment.models[5].position.lerp(fourBPosition, newA);

                    } else {
                        environment.models[3].position.lerp(threePosition, 1);
                        environment.models[4].position.lerp(fourAPosition, 1);
                        environment.models[5].position.lerp(fourBPosition, 1);
                    }

                    if (environment.models[4].position.z > LEAVE_DISTANCE * 2) {
                        environment.models[4].visible = false;
                        environment.models[5].visible = false;
                    }

                    environment.renderer.render(environment.scene, environment.camera);
                }

                const section3 = () => {
                    requestAnimationFrame(section3)
                    let delta = clock.getDelta()
                    // Place Fours
                    let fourAPosition = new THREE.Vector3(environment.models[4].position.x, environment.models[4].position.y, 17)
                    let fourBPosition = new THREE.Vector3(environment.models[5].position.x, environment.models[5].position.y, -9.75)
                    // console.log(newPosition.x)
                    environment.models[4].visible = true;

                    environment.models[5].visible = true;

                    const newA = alpha += delta;
                    if (newA <= 1) {
                        environment.models[5].position.lerp(fourBPosition, newA);
                        environment.models[4].position.lerp(fourAPosition, newA);

                    } else {
                        environment.models[5].position.lerp(fourBPosition, 1);
                        environment.models[4].position.lerp(fourAPosition, 1);
                    }

                    environment.renderer.render(environment.scene, environment.camera);
                }

                if (section === 0) {
                    section0();
                }

                if (section === 1) {
                    section1();
                }

                if (section === 2) {
                    section2();
                }

                if (section === 3) {
                    section3();
                }

            }
        }, [environment, section])
    }


    return (
        <div class={tw`absolute top-0 left-0 w-screen h-screen flex flex-row`} style={{overflowY: "hidden"}}>
            <div class={tw`w-full md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 h-2/3 my-auto md:h-full`}>
                <div class={tw`col-span-1 h-full md:h-full relative`}>
                    <div ref={ref} class={tw`h-full w-full md:h-full absolute bottom-0 left-auto right-auto`}></div>
                </div>
                <div class={tw`col-span-1 flex flex-col h-1/2 md:h-full w-3/4 mx-auto md:w-auto md:mx-0`}>
                    <div class={tw`h-5/12 my-auto`}>
                        <div class={tw`mt-0 mb-auto`}>
                            <h1 class={tw`py-1 text-transparent text-4xl bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>_Cube</h1>
                            <p>The Essential Retro Console</p>
                        </div>
                        <div class={tw`my-auto flex flex-row py-4`}>
                            <div class={tw`w-fit border-transparent rounded border-solid border-2 bg-clip-border bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>
                                <button class={tw`py-2 px-4 bg-white`}>Buy Now</button>
                            </div>
                            <button class={tw`w-fit py-2 ml-4 disabled:text-gray-600 disabled:opacity-75 pointer-events-none focus:outline-none`} disabled>$69.95</button>
                        </div>
                        <div class={tw`mt-auto mb-0 h-1/3`}>
                            {
                                section === 0 ? (
                                    <Fragment>
                                        <p class={tw`mb-2 py-1`}>Play thousands of games across more than <p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>20 consoles</p>.</p>

                                        <p>Retro games, <p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>AAA-performance</p>.</p>
                                    </Fragment>



                                ) : null
                            }
                            {
                                section === 1 ? (
                                    <Fragment>
                                        <p class={tw`mb-2`}><p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>Maximize fun, minimize clutter</p>. No more wires, no more console management.</p>

                                        <p>Built from the ground up to <p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>look good in your living room</p>.</p>
                                    </Fragment>


                                ) : null
                            }
                            {
                                section >= 2 ? (
                                    <Fragment>
                                        <p class={tw`mb-2`}><p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>Customize everything</p> from the LEDs, transparent acrylics, to the front-panel.</p>
                                        <p class={tw`mb-2`}><p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>Get a _Cube</p> as a stylish gift, or deck out your game lair.</p>
                                    </Fragment>


                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}