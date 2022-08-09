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
    const [mobileTouchX, setMobileTouchX] = useState<number | undefined>();
    const [section, setSection] = useState<number>(0)
    const [deviceType, setDeviceType] = useState<string | undefined>()
    const [scroll, setScroll] = useState<number>(0)
    const [environment, setEnvironment] = useState<Record<string, any> | undefined>();
    const ref = useRef<HTMLDivElement | undefined>()


    const LEAVE_DISTANCE = 50;

    const CTL_ROTATION_SPEED = 2.5;

    const handleScroll = (e) => {
        setScroll(scroll => scroll > 2000 ? 2000 : scroll < 0 ? 0 : scroll + Math.sign(e.deltaY) * 10)
    }

    const handleNext = () => {
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
            let hasTouchScreen = false;
            if ("maxTouchPoints" in navigator) {
                hasTouchScreen = navigator.maxTouchPoints > 0;
            } else if ("msMaxTouchPoints" in navigator) {
                hasTouchScreen = navigator.msMaxTouchPoints > 0;
            } else {
                const mQ = window.matchMedia("(pointer:coarse)");
                if (mQ && mQ.media === "(pointer:coarse)") {
                    hasTouchScreen = !!mQ.matches;
                } else if ("orientation" in window) {
                    hasTouchScreen = true; // deprecated, but good fallback
                } else {
                    // Only as a last resort, fall back to user agent sniffing
                    var UA = navigator.userAgent;
                    hasTouchScreen =
                        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
                }
            }
            if (hasTouchScreen) {
                setDeviceType("Mobile");
            } else {
                setDeviceType("Desktop");
            }
        }, [])

        useLayoutEffect(() => {
            const timer = setInterval(() => {
                console.log('clearing')
                setMobileTouchX(undefined)
            }, 500)

            return () => clearInterval(timer)
        }, [])


        useLayoutEffect(() => {
            document.querySelector("body")?.setAttribute('style', 'overflow-y: hidden; position: fixed; background-color: white; overscroll-behavior: contain;')
            document.addEventListener("mousewheel", handleScroll)

            document.addEventListener("touchmove", (e) => {
                if (mobileTouchX) {
                    if (e.touches[0].clientX < mobileTouchX) {
                        setScroll(scroll => scroll > 2000 ? 2000 : scroll < 0 ? 0 : scroll + 2)
                    }

                    if (e.touches[0].clientX > mobileTouchX) {
                        setScroll(scroll => scroll > 2000 ? 2000 : scroll < 0 ? 0 : scroll - 2)
                    }
                }

                setMobileTouchX(e.touches[0].clientX);
            })
        }, [mobileTouchX])

        useLayoutEffect(() => {
            if (scroll < 500) {
                setSection(0)
            }
            if (scroll > 500 && scroll < 1000) {
                setSection(1)
            }
            if (scroll >= 1000 && scroll < 1500) {
                setSection(2)
            }
            if (scroll >= 1500) {
                setSection(3)
            }
        }, [scroll])


        useLayoutEffect(() => {

            const WIDTH = ref.current?.offsetWidth;
            const HEIGHT = deviceType === "Mobile" ? ref.current?.offsetWidth : ref.current?.offsetHeight;

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
                        mesh.position.set(0.75, -1.2, 4)
                        mesh.visible = true

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
                        mesh.position.set(0.85, -3.25, -12)
                        mesh.visible = true

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
                        mesh.position.set(1, -3.6, 19)
                        mesh.visible = true

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
                        mesh.position.set(1, -11.3, 17)
                        mesh.visible = true

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
                        mesh.position.set(0.86, -11.0, -10.5)
                        mesh.visible = true

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
        }, [deviceType])

        useLayoutEffect(() => {

            if (environment) {

                let s = scroll;


                const clock = new THREE.Clock()

                let alpha = 0;

                const section0 = () => {
                    requestAnimationFrame(section0);
                    const delta = clock.getDelta()
                    // Place Fours
                    let fourAPosition = new THREE.Vector3(environment.models[4].position.x, environment.models[4].position.y, 17)
                    let fourBPosition = new THREE.Vector3(environment.models[5].position.x, environment.models[5].position.y, -10.5)

                    // Place Three
                    let threePosition = new THREE.Vector3(environment.models[3].position.x, environment.models[3].position.y, 19);

                    // Place Twos
                    let twoAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[1].position.y, 4);
                    let twoBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[2].position.y, -12);

                    environment.models[1].visible = true;
                    environment.models[2].visible = true;
                    environment.models[3].visible = true;
                    environment.models[4].visible = true;
                    environment.models[5].visible = true;

                    let newA = alpha += delta

                    if (newA <= 1) {
                        environment.models[1].position.lerp(twoAPosition, newA);
                        environment.models[2].position.lerp(twoBPosition, newA);
                        environment.models[3].position.lerp(threePosition, newA);
                        environment.models[4].position.lerp(fourAPosition, newA);
                        environment.models[5].position.lerp(fourBPosition, newA);
                    } else {
                        environment.models[1].position.lerp(twoAPosition, 1);
                        environment.models[2].position.lerp(twoBPosition, 1);
                        environment.models[3].position.lerp(threePosition, 1);
                        environment.models[4].position.lerp(fourAPosition, 1);
                        environment.models[5].position.lerp(fourBPosition, 1);
                    }

                    environment.renderer.render(environment.scene, environment.camera);
                }

                const section1 = () => {
                    requestAnimationFrame(section1);

                    const delta = clock.getDelta()

                    // Yeet Fours
                    let fourAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[4].position.y, LEAVE_DISTANCE * 10)
                    let fourBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[5].position.y, -LEAVE_DISTANCE * 10)

                    // Place Three
                    let threePosition = new THREE.Vector3(environment.models[3].position.x, environment.models[3].position.y, 19)

                    // Place Twos
                    let twoAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[1].position.y, 4);
                    let twoBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[2].position.y, -12);

                    environment.models[1].visible = true;
                    environment.models[2].visible = true;
                    environment.models[3].visible = true;

                    let newA = alpha += delta

                    if (newA <= 1) {
                        // console.log('newA', newA)
                        environment.models[1].position.lerp(twoAPosition, newA);
                        environment.models[2].position.lerp(twoBPosition, newA);
                        environment.models[3].position.lerp(threePosition, newA);

                        // yeets
                        environment.models[4].position.lerp(fourAPosition, newA);
                        environment.models[5].position.lerp(fourBPosition, newA);
                    } else {
                        environment.models[1].position.lerp(twoAPosition, 1);
                        environment.models[2].position.lerp(twoBPosition, 1);
                        environment.models[3].position.lerp(threePosition, 1);

                        // yeets
                        environment.models[4].visible = false;
                        environment.models[5].visible = false;
                    }

                    environment.renderer.render(environment.scene, environment.camera);
                }


                const section2 = () => {

                    // console.log(requestAnimationFrame(section1));
                    requestAnimationFrame(section2);

                    let delta = clock.getDelta()
                    // console.log('start', environment.models[1].position.z )
                    // Yeet Three
                    let threePosition = new THREE.Vector3(environment.models[3].position.x, environment.models[3].position.y, LEAVE_DISTANCE * 10)

                    // Yeet Fours
                    let fourAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[4].position.y, LEAVE_DISTANCE * 10)
                    let fourBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[5].position.y, -LEAVE_DISTANCE * 10)

                    // Place Twos
                    let twoAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[1].position.y, 4);
                    let twoBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[2].position.y, -12);

                    environment.models[1].visible = true;
                    environment.models[2].visible = true;
                    const newA = alpha += delta

                    if (newA <= 1) {
                        environment.models[1].position.lerp(twoAPosition, newA);
                        environment.models[2].position.lerp(twoBPosition, newA);

                        // yeets
                        environment.models[3].position.lerp(threePosition, newA);
                        environment.models[4].position.lerp(fourAPosition, newA);
                        environment.models[5].position.lerp(fourBPosition, newA);

                    } else {
                        environment.models[1].position.lerp(twoAPosition, 1);
                        environment.models[2].position.lerp(twoBPosition, 1);

                        // yeets
                        environment.models[3].visible = false;
                        environment.models[4].visible = false;
                        environment.models[5].visible = false;
                    }

                    environment.renderer.render(environment.scene, environment.camera);
                }

                const section3 = () => {
                    requestAnimationFrame(section3)
                    let delta = clock.getDelta()
                    // Yeet Twos
                    let twoAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[1].position.y, LEAVE_DISTANCE * 10)
                    let twoBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[2].position.y, -LEAVE_DISTANCE * 10)

                    // Yeet Three
                    let threePosition = new THREE.Vector3(environment.models[3].position.x, environment.models[3].position.y, LEAVE_DISTANCE * 10)

                    // Yeet Fours
                    let fourAPosition = new THREE.Vector3(environment.models[1].position.x, environment.models[4].position.y, LEAVE_DISTANCE * 10)
                    let fourBPosition = new THREE.Vector3(environment.models[2].position.x, environment.models[5].position.y, -LEAVE_DISTANCE * 10)

                    const newA = alpha += delta
                    if (newA <= 1) {
                        // yeets
                        environment.models[1].position.lerp(twoAPosition, newA);
                        environment.models[2].position.lerp(twoBPosition, newA);
                        environment.models[3].position.lerp(threePosition, newA);
                        environment.models[4].position.lerp(fourAPosition, newA);
                        environment.models[5].position.lerp(fourBPosition, newA);

                    } else {
                        // yeets      
                        environment.models[1].position.lerp(twoAPosition, 1);
                        environment.models[2].position.lerp(twoBPosition, 1);
                        environment.models[3].position.lerp(threePosition, 1);
                        environment.models[4].position.lerp(fourAPosition, 1);
                        environment.models[5].position.lerp(fourBPosition, 1);

                        environment.models[1].visible = false;
                        environment.models[2].visible = false;
                        environment.models[3].visible = false;
                        environment.models[4].visible = false;
                        environment.models[5].visible = false;
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
        <div class={tw`absolute top-0 left-0 w-screen h-screen flex flex-row`} style={{ overflowY: "hidden" }}>
            <div class={tw`w-full md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 h-2/3 my-0 md:my-auto md:h-full`}>
                <div class={tw`col-span-1 h-full md:h-full relative`}>
                    <div ref={ref} class={tw`h-full w-full md:h-full`}></div>
                </div>
                <div class={tw`col-span-1 flex flex-col h-1/2 md:h-full w-3/4 mx-auto md:w-auto md:mr-0 md: ml-4`} id="scroll">
                    <div class={tw`h-5/12 my-auto`}>
                    <div class={tw`mt-0 mb-auto flex flex-row py-4`}>
                    {
                        deviceType === "Mobile" ? ['', '', '', ''].map((_, i) => i === section ? (
                            <svg class={i === 0 ? tw`ml-0 mr-1` : i === 3 ? tw`mr-0 ml-1` : tw`mx-1`} onClick={() => setSection(i)} width="10px" viewBox="0 0 24 24" stroke="url(#grad1)" fill="url(#grad1)">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#2596be;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#d22cae;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"></path>
                            </svg>
                        ) : (
                            <svg class={i === 0 ? tw`ml-0 mr-1` : i === 3 ? tw`mr-0 ml-1` : tw`mx-1`} onClick={() => setSection(i)} viewBox="0 0 24 24" width="10px" stroke="url(#grad1)" fill="url(#grad1)">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#b794f4;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#f56565;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                            </svg>
                        )) : null
                    }
                    </div>
                        <div class={tw`my-auto`}>
                            <h1 class={tw`py-1 text-transparent text-4xl bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>_Cube</h1>
                            <p class={tw`font-light`}>The Essential Retro Console</p>
                        </div>
                        <div class={tw`my-auto flex flex-row py-4`}>
                            <div class={tw`w-fit border-transparent rounded border-solid border-2 bg-clip-border bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>
                                <button class={tw`py-2 px-4 bg-white`}>Buy Now</button>
                            </div>
                            <button class={tw`w-fit py-2 ml-4 disabled:text-gray-600 disabled:opacity-75 pointer-events-none focus:outline-none`} disabled>$69.95</button>
                        </div>
                        <div class={tw`my-auto py-4 w-full md:w-1/2`}>
                            {
                                section === 0 ? (
                                    <Fragment>
                                        <p class={tw`py-1 text-xl`}><p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>Get a _Cube</p> as a stylish gift, or deck out your game lair.</p>
                                    </Fragment>

                                ) : null
                            }
                            {
                                section === 1 ? (
                                    <Fragment>
                                        <p class={tw`py-1 text-xl`}><p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>Customize</p> the LEDs, transparent acrylics, or the front-panel.</p>
                                    </Fragment>

                                ) : null
                            }
                            {
                                section === 2 ? (
                                    <Fragment>
                                        <p class={tw`py-1 text-xl`}>Built from the ground up to <p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>look good in your living room</p>.</p>
                                    </Fragment>


                                ) : null
                            }
                            {
                                section >= 3 ? (
                                    <Fragment>
                                        <p class={tw`py-1 text-xl`}>Play thousands of games across more than <p class={tw`inline text-transparent bg-clip-text bg-gradient-to-br dark:from-bump-start dark:via-lime-200 dark:to-bump-end from-bump-end via-lime-200 to-bump-start`}>20 consoles</p>.</p>
                                    </Fragment>
                                ) : null
                            }
                        </div>
                        <div class={tw`mt-auto mb-0 flex flex-row py-4`}>

                            {
                                deviceType === "Desktop" ? ['', '', '', ''].map((_, i) => i === section ? (
                                    <svg class={i === 0 ? tw`ml-0 mr-1` : i === 3 ? tw`mr-0 ml-1` : tw`mx-1`} onClick={() => setSection(i)} width="10px" viewBox="0 0 24 24" stroke="url(#grad1)" fill="url(#grad1)">
                                        <defs>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style="stop-color:#2596be;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#d22cae;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"></path>
                                    </svg>
                                ) : (
                                    <svg class={i === 0 ? tw`ml-0 mr-1` : i === 3 ? tw`mr-0 ml-1` : tw`mx-1`} onClick={() => setSection(i)} viewBox="0 0 24 24" width="10px" stroke="url(#grad1)" fill="url(#grad1)">
                                        <defs>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style="stop-color:#b794f4;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#f56565;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                    </svg>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}