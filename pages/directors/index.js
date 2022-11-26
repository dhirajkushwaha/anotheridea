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
            var canvas = document.querySelector(".ExpertItem-canvas-"+props.index+" canvas"),
            canvasContainer = document.querySelector(".ExpertItem-canvas-"+props.index),
            ctx = canvas.getContext("2d"),
            particles = [],
            amount = 0,
            mouse = {x:0,y:0},
            radius = 3;

            var colors = ["#fff","#5541F8","#373737"];
            var particlesCount = 50;

            var copy = {value: "Hello"};

            var ww = 1152;
            var wh = 1152;

            function Particle(x,y){
                this.x =  Math.random()*ww;
                this.y =  Math.random()*wh;
                this.dest = {
                    x : x,
                    y: y
                };

                this.r =  Math.random()*14 + 2;
                this.vx = (Math.random()-0.5)*20;
                this.vy = (Math.random()-0.5)*20;
                this.accX = 0;
                this.accY = 0;
                this.friction = Math.random()*0.05 + 0.94;

                this.color = colors[Math.floor(Math.random()*6)];
            }

            Particle.prototype.render = function() {

                this.accX = (this.dest.x - this.x)/10000;
                this.accY = (this.dest.y - this.y)/10000;
                this.vx += this.accX;
                this.vy += this.accY;
                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y +=  this.vy;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
                ctx.fill();

                // Mouse Avoding
                var a = this.x - mouse.x;
                var b = this.y - mouse.y;

                var distance = Math.sqrt( a*a + b*b );
                if(distance<(radius*70)){
                    this.accX = (this.x - mouse.x)/100;
                    this.accY = (this.y - mouse.y)/100;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }

                // Random Motion
                const g_li = ( val ) => {
                    return Math.round(val/10)*10
                }

                if ( g_li(this.x) == g_li(this.dest.x) && g_li(this.y) == g_li(this.dest.y) ){
                    this.dest = {
                        x : Math.random()*ww,
                        y : Math.random()*wh
                    }
                }

            }

            function onMouseMove(e){
                mouse.x = ww * Math.floor(1000*(e.clientX - canvas.getBoundingClientRect().left)/canvasContainer.clientWidth)/1000;
                mouse.y = wh * Math.floor(1000*(e.clientY - canvas.getBoundingClientRect().top)/canvasContainer.clientWidth)/1000;

                // console.log(mouse.x, mouse.y)
            }

            function onTouchMove(e){
                if(e.touches.length > 0 ){
                    mouse.x = e.touches[0].clientX;
                    mouse.y = e.touches[0].clientY;
                }
            }

            function onTouchEnd(e){
                mouse.x = -9999;
                mouse.y = -9999;
            }

            function initScene(){

                var ww = 1152;
                var wh = 1152;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.font = "bold "+(ww/10)+"px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(copy.value, ww/2, wh/2);

                var data  = ctx.getImageData(0, 0, ww, wh).data;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "screen";

                particles = [];
                for(var i=0;i<ww;i+=Math.round(ww/particlesCount)){
                    for(var j=0;j<wh;j+=Math.round(ww/particlesCount)){
                        if(data[ ((i + j*ww)*4) + 3] > particlesCount){
                            console.log(data[ ((i + j*ww)*4) + 3])
                            particles.push(new Particle( Math.random()*ww, Math.random()*wh));
                        }
                    }
                }
                amount = particles.length;

            }

            function onMouseClick(){
                radius++;
                if(radius ===5){
                    radius = 0;
                }
            }

            function render(a) {
                requestAnimationFrame(render);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < amount; i++) {
                    particles[i].render();
                }
            };

            // copy.addEventListener("keyup", initScene);
            // window.addEventListener("resize", initScene);
            // window.addEventListener("mousemove", onMouseMove);
            canvas.addEventListener("mousemove", onMouseMove);
            canvas.addEventListener("touchmove", onTouchMove);
            // window.addEventListener("click", onMouseClick);
            window.addEventListener("touchend", onTouchEnd);
            initScene();
            requestAnimationFrame(render);

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
                                {/* <source
                                    data-srcset="https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C2000%2C2000&amp;w=360 360w, https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C2000%2C2000&amp;w=800 800w, https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C2000%2C2000&amp;w=1000 1000w"
                                    sizes="(min-width: 768px) 40vw, 100vw"
                                    srcset="
                                        https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C2000%2C2000&amp;w=360   360w,
                                        https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C2000%2C2000&amp;w=800   800w,
                                        https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C2000%2C2000&amp;w=1000 1000w
                                    " /> */}
                                <img draggable="false"
                                    // data-src="https://images.prismic.io/mediakeys/9f278982-0539-4aef-a28a-e4f44a51332a_balmain-jerome-square.jpg?auto=compress,format&amp;rect=0,0,2000,2000&amp;w=768&amp;h=768"
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
                            style={{"transform": props.G_El_prop[2]}}>
                            {/* {G_EL_anim.current[0]} */}
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
                    <canvas width="1152" height="1152"
                        // style={{width: "120%", height: "120%"}}
                     ></canvas>
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


    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            

            let positions = [];
            for (let i = 0; i < 3; i++) {
                positions.push(`translate3d(calc(${-10 - Math.random()*5} * var(--scale_f) * 1vw), calc(-10 * var(--scale_f) * 1vw), 0px) rotate(${Math.random()*180}deg)`)
            }

            set_random_pos(positions)

            executed.current = 1;
        }
    }, [])

    return (
        <div className="Directors-page" data-scroll-container>
            <Head><title>Directors - Another IDEA</title></Head>

            <section className="Directors-onBoard">
                <div className="Title u-textUppercase">
                    <h1>ON Board Directors</h1>
                </div>
                <div className="OnBoard-wrapper">
                    <div className="OnBoard-listItems">
                        <OnBoardItem
                            index={1}
                            imgSrc = "./assets/prosit_roy.png"
                            name = "Prosit Roy"
                            G_El_prop = {["#5541f8", "47s", random_pos[0]]}
                            about = {<>The king of nuances and backstories.<br/><br/>One of the main reasons Prosit&apos;s work is identifiable as his own is due to his ability to get to the root of every story, deep-diving into cultures and making the characters memorable and relatable.<br/><br/>He internalizes the script and beautifully decodes it on screen. Whether it is Patal Lok or a Pampers advertisement, Prosit has the expertise to evoke emotion from all audiences.<br/><br/>He&apos;s the most incredible support system for a team but an even better Director.</>}
                        />
                        <OnBoardItem
                            index={2}
                            imgSrc = "./assets/jeet.png"
                            name = "Jeet Lotia"
                            G_El_prop = {["#5541f8", "43s", random_pos[1]]}
                            about = {<>One that brings words to life.<br/>Our resident magician.<br/><br/>The sheer ease with which Jeet can tell a story off-screen translates directly to his work on screen with an innate ability to bring out the desired emotion impactfully.<br/><br/>An ad film director who&apos;s worked on over 150 commercials in the last seven years and earned all his tricks on-set, somewhere between reel life and real life<br/><br/>Jeet is a dire cinema addict obsessed with doing justice to every script.</>}
                        />
                        <OnBoardItem
                            index={3}
                            imgSrc = "./assets/thea.png"
                            name = "Teodora Chingarova"
                            G_El_prop = {["#5541f8", "44s", random_pos[2]]}
                            about = {<>The one that wore many hats until she tried on the director one, and never let that go.<br/><br/>With a foundation that required her to relocate constantly, Thea has the infinite ability to organize chaos and has mastered the art of understanding complex human emotions, which makes her dazzle brilliantly as a director. <br/><br/>In her quest to bring her favorite three weapons - music, words, and visuals together, Thea has conquered the craftwork of imagination and pulling references for everything!</>}
                        />

                        {/* Other Directors */}


                    </div>
                </div>
            </section>

            <Footer></Footer>
        </div>
    )
}