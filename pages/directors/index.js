// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";


// Custom Components
import Footer from "../../components/footer/footer"

function OnBoardItem(props){

    const executed = useRef(0);

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            { // particles
                var canvas = document.querySelector(".ExpertItem-canvas-"+props.index+" canvas"),
                canvasContainer = document.querySelector(".ExpertItem-canvas-"+props.index),
                ctx = canvas.getContext("2d"),
                particles = [],
                amount = 0,
                mouse = {x:0,y:0},
                radius = 3;

                var colors = ["#fff","#5541F8","#373737"];
                var amount = 20;

                let canvas_ratio = canvasContainer.clientWidth/canvasContainer.clientHeight

                var ww = canvas.width = 1152;
                var wh = canvas.height = 1152/canvas_ratio;

                function Particle(x,y){
                    this.x =  (Math.random()*ww);
                    this.y =  (Math.random()*wh);
                    this.dest = {
                        x: x,
                        y: y
                    };

                    if ( this.x > ww*0.95 ){
                        this.x = ww*0.95
                    }
                    else if ( this.x < ww*0.05 ){
                        this.x = ww*0.05
                    }
                    if ( this.y > wh*0.95 ){
                        this.y = wh*0.95
                    }
                    else if ( this.y < wh*0.05 ){
                        this.y = wh*0.05
                    }

                    this.r =  (Math.random()*14 + 5);
                    this.vx = ((Math.random()-0.5));
                    this.vy = ((Math.random()-0.5));

                    this.accX = 0;
                    this.accY = 0;

                    this.color = colors[Math.floor(Math.random()*(colors.length+1))];
                }

                Particle.prototype.render = function() {

                    if ( this.x + this.vx > ww - this.r ){
                        this.vx = -this.vx;
                    } else if ( this.x + this.vx < 0 + this.r ) {
                        this.vx = -this.vx;
                    }
                    if ( this.y + this.vy > wh - this.r  ){
                        this.vy = -this.vy;
                    } else if ( this.y + this.vy < 0 + this.r ) {
                        this.vy = -this.vy;
                    }

                    this.x += this.vx;
                    this.y += this.vy;

                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
                    ctx.fill();

                    // mouse avoiding
                    // var a = this.x - mouse.x;
                    // var b = this.y - mouse.y;

                    // var distance = Math.sqrt( a*a + b*b );
                    // if(distance<(radius*70)){
                    //     this.accX = (this.x - mouse.x)/100;
                    //     this.accY = (this.y - mouse.y)/100;
                    //     this.vx += this.accX;
                    //     this.vy += this.accY;
                    // }

                }

                function initScene(){
                    var ww = 1152;
                    var wh = 1152;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.globalCompositeOperation = "screen";

                    particles = [];

                    for (let i = 0; i < amount; i++) {
                        particles.push(new Particle( Math.round(Math.random()*ww), Math.round(Math.random()*wh)));
                    }
                }

                function onMouseMove(e){
                    // adjusted to take it relative to canvas
                    mouse.x = ww * Math.floor(1000*(e.clientX - canvas.getBoundingClientRect().left)/canvasContainer.clientWidth)/1000;
                    mouse.y = wh * Math.floor(1000*(e.clientY - canvas.getBoundingClientRect().top)/canvasContainer.clientWidth)/1000;
                }

                // this function is called repeatedly many times
                function render(a) {
                    requestAnimationFrame(render);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (var i = 0; i < amount; i++) {
                        particles[i].render();
                    }
                };

                // canvas.addEventListener("mousemove", onMouseMove);
                // initScene();
                // requestAnimationFrame(render);
            }

            executed.current = 1;
        }
    }, [])



    return (
        <div className="OnBoard-listItem">
            <div className="ExpertItem large visible OnBoardDirector-Profile" style={{"--color": props.G_El_prop[0], "--move-duration": props.G_El_prop[1]}}>
                <div className="ExpertItem-wrapImage" style={{"transform": "translate3d(0px, 0px, 0px)", opacity: 1}}>
                    <div className="ExpertItem-wrapImageInner">
                        <div className="AppImage ExpertItem-image loaded lazyload fit-cover"
                            style={{"--ratio": "0%"}}>
                            <div className="AppImage-overlay"></div>
                            <div className="AppImage-placeholder" style={{"background-color": "rgb(127, 128, 127)"}}></div>
                            <picture>
                                <Image draggable="false"
                                    alt={props.name} className="AppImage-image"
                                    style={{"object-fit": "cover", "object-position": "center center"}}
                                    src={props.imgSrc} />
                            </picture>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="fancy-goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur">
                                    </feGaussianBlur>
                                    <feColorMatrix in="blur" mode="matrix"
                                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix>
                                </filter>
                            </defs>
                        </svg>
                        <div className="ExpertItem-blob"
                            style={{"transform": props.G_El_prop[2], "--hov-transform":props.G_El_prop[3]}}>
                            <svg width="600" height="600" viewBox="0 0 600 600" className="ExpertItem-blobSvg">
                                <path>
                                    <animate attributeName="d" dur="47s" repeatCount="indefinite"
                                        values="M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;
                                                    M404.4 176.7c20.9 16.4 20.8 58.8 38.8 106.2 18.1 47.4 54.4 99.7 40.9 123.6-13.5 23.9-76.7 19.3-131.6 40.4-54.8 21-101.2 67.7-150.5 71.7-49.4 4.1-101.7-34.5-107.8-81.9C88 389.2 128 333 144.2 278c16.2-55.1 8.5-108.8 30.5-125 22-16.1 73.7 5.5 120.4 11.3 46.7 5.9 88.5-3.9 109.3 12.4z;
                                M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;"
                                        keySplines="0.1 0.8 0.2 1;0.1 0.8 0.2 1" keyTimes="0;0.5;1"></animate>
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="ExpertItem-content">
                    <div className="ExpertItem-title app-text--regular"
                        style={{opacity: 1, transform: "translate3d(0px, 0px, 0px)"}}>
                        {props.name}
                    </div>
                </div>
                <div className={"ExpertItem-canvas ExpertItem-canvas-"+props.index}>
                    <canvas width="1152" height="1152"></canvas>
                </div>
            </div>
            <div className="OnBoardDirector-About">
                <p>{props.about}</p>
            </div>
        </div>
    )
}

export default function Directors(){

    const executed = useRef(0);
    const [random_pos, set_random_pos] = useState([]);

    const [profiles, set_profiles] = useState([]);

    let pos_set = [[-10, -10], [10, -10], [10, 10], [-10, 10]];

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            let positions = [];
            for (let i = 0; i < 3; i++) {
                let random_set = Math.floor(Math.random()*4)

                let random_orientation = (Math.random()*180)
                let random_pos_hov = [(pos_set[random_set][0] - Math.random()*3), (pos_set[random_set][1] - Math.random()*3)]
                let random_pos_n_hov = [random_pos_hov[0]*2.8 , random_pos_hov[1]*2.8]

                positions.push(
                    {
                        not_hov:`translate3d(calc(${random_pos_n_hov[0]} * var(--scale_f) * 1vw), calc(${random_pos_n_hov[1]} * var(--scale_f) * 1vw), 0px) rotate(${random_orientation}deg)`,
                        hov:`translate3d(calc(${random_pos_hov[0]} * var(--scale_f) * 1vw), calc(${random_pos_hov[1]} * var(--scale_f) * 1vw), 0px) rotate(${random_orientation}deg)`,
                    }
                )
            }
            set_random_pos(positions)

            executed.current = 1;
        }
    }, []);

    useEffect(() => {

        if ( random_pos.length > 1 ){

            set_profiles(
                [<OnBoardItem
                    key={1}
                    index={1}
                    imgSrc = "./assets/prosit_roy.png"
                    name = "Prosit Roy"
                    G_El_prop = {["#5541f8", `${20 + 50*Math.random()}s`, random_pos[0].not_hov, random_pos[0].hov]}
                    about = {<>The king of nuances and backstories.<br/><br/>One of the main reasons Prosit&apos;s work is identifiable as his own is due to his ability to get to the root of every story, deep-diving into cultures and making the characters memorable and relatable.<br/><br/>He internalizes the script and beautifully decodes it on screen. Whether it is Patal Lok or a Pampers advertisement, Prosit has the expertise to evoke emotion from all audiences.<br/><br/>He&apos;s the most incredible support system for a team but an even better Director.</>}
                />,
                <OnBoardItem
                    key={2}
                    index={2}
                    imgSrc = "./assets/jeet.png"
                    name = "Jeet Lotia"
                    G_El_prop = {["#5541f8", `${20 + 50*Math.random()}s`, random_pos[1].not_hov, random_pos[1].hov]}
                    about = {<>One that brings words to life.<br/>Our resident magician.<br/><br/>The sheer ease with which Jeet can tell a story off-screen translates directly to his work on screen with an innate ability to bring out the desired emotion impactfully.<br/><br/>An ad film director who&apos;s worked on over 150 commercials in the last seven years and earned all his tricks on-set, somewhere between reel life and real life<br/><br/>Jeet is a dire cinema addict obsessed with doing justice to every script.</>}
                />,
                <OnBoardItem
                    key={3}
                    index={3}
                    imgSrc = "./assets/thea.png"
                    name = "Teodora Chingarova"
                    G_El_prop = {["#5541f8", `${20 + 50*Math.random()}s`, random_pos[2].not_hov, random_pos[2].hov]}
                    about = {<>The one that wore many hats until she tried on the director one, and never let that go.<br/><br/>With a foundation that required her to relocate constantly, Thea has the infinite ability to organize chaos and has mastered the art of understanding complex human emotions, which makes her dazzle brilliantly as a director. <br/><br/>In her quest to bring her favorite three weapons - music, words, and visuals together, Thea has conquered the craftwork of imagination and pulling references for everything!</>}
                />]
            )

        }


    }, [random_pos])


    return (
        <div className="Directors-page" data-scroll-container>
            <Head><title>Directors - Another IDEA</title></Head>

            <section className="Directors-onBoard">
                <div className="Title u-textUppercase">
                    <h1>ON Board Directors</h1>
                </div>
                <div className="OnBoard-wrapper">
                    <div className="OnBoard-listItems">
                        { profiles }

                        {/* Other Directors */}
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </div>
    )
}