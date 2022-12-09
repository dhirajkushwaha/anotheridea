// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Image from "next/image";

import { gsap } from "gsap/dist/gsap"; // GSAP animation took

// Custom Components
import Footer from "../../components/footer/footer"
import ReadyToMake from "../../components/readytomake.js";
import Trustedby from "../../components/trustedby.js";


function _getClosest(item, array, getDiff) {
	var closest,
		diff;

	if (!Array.isArray(array)) {
		throw new Error("Get closest expects an array as second argument");
	}

	array.forEach(function (comparedItem, comparedItemIndex) {
		var thisDiff = getDiff(comparedItem, item);

		if (thisDiff >= 0 && (typeof diff == "undefined" || thisDiff < diff)) {
			diff = thisDiff;
			closest = comparedItemIndex;
		}
	});

	return closest;
}

function number(item, array) {
	return _getClosest(item, array, function (comparedItem, item) {
		return Math.abs(comparedItem - item);
	});
}

function lerp(a, b, n) {
	return (1 - n) * a + n * b
}

function mapVal(x1, x2, y1, y2, x){
	return ((y2-y1)/(x2-x1)) * ( x + x1 ) + y1
}

function mathMod(x){

    let curSign = 1;
    if ( x < 0 ) curSign = -1;

    return ( x * curSign )
}

function doubleInclinedPlane( a, x ){
    return ( ( a - mathMod(x) ) < 0 ) ? (a/10) : ( a - mathMod(x))
}

function doubleInclinedArc( a, x ){
    return ( (a - x**2)**(1/2) )
}

function doubleInclinedInvertedArc( a, x ){
    let val;

    if ( x < 0 ) val = ( x+a )**2
    else val = (x-a)**2

    return ( val )
}


class Slider {
	constructor(options = {m_cursor_states}) {
		this.bind()

		this.opts = {
			el: options.el || '.js-slider',
			ease: options.ease || (window.innerWidth >= 1024) ? 0.1 : 0.08,
			speed: options.speed || 1.5,
			velocity: 25,
			scroll: options.scroll || false
		}

		this.m_cursor_states = options.m_cursor_states;

		this.slider = document.querySelector('.Works-slider > div')
		this.sliderInner = this.slider.querySelector('.Works-wrapper')
		this.slides = [...this.slider.querySelectorAll('.Works-slide')]
		this.slidesNumb = this.slides.length

		this.rAF = undefined

		this.sliderWidth = 0
		this.slideWidth = 0

		this.prevIndex = undefined

		this.onX = 0
		this.offX = 0

		this.currentX = 0
		this.lastX = 0
		this.deltaX = 0

		this.initTranslates = []

		this.min = 0
		this.max = 0

		this.startX = 0

		this.snappingState = 0

        this.swipeImageState = 1
	}

	bind() {
		['setPos', 'run', 'resize', 'mathVals'].forEach((fn) => this[fn] = this[fn].bind(this))
	}

	setBounds() {
		const bounds = this.slides[0].getBoundingClientRect()
		this.slideWidth = bounds.width

		this.sliderWidth = this.slidesNumb * this.slideWidth
		this.min = -this.slideWidth;
		this.max = this.sliderWidth - this.slideWidth;

        this.startX = window.innerWidth/2 - this.slideWidth/2

		this.sliderInner.style.setProperty("transform", `translate3d(${-this.slideWidth}px, 0px, 0px)`);
		this.slides.forEach((slide, index) => {

			let initTranlate = (index + 1) * this.slideWidth

			slide.style.setProperty("transform", `translate3d(${initTranlate}px, 0px, 0px)`);
			this.initTranslates.push(initTranlate);

		})
	}

	setPos(e) {
		if (!this.isDragging) return;
		this.currentX = this.offX + ((window.innerWidth >= 1024 ? e.clientX : e.touches[0].clientX ) - this.onX) * (window.innerWidth >= 1024 ? 1 : 3);
	}

	mathVals(snapVal){

        if ( snapVal > this.slideWidth/2 ) snapVal = this.slideWidth/2
        if ( snapVal < -this.slideWidth/2 ) snapVal = -this.slideWidth/2

		let scale = 0.8, opacity = 0.2;

        scale = mapVal(0, 1, 0.8, 1, doubleInclinedInvertedArc( 1, snapVal/(this.slideWidth/2) ))
        opacity = mapVal(0, 1, 0.2, 0.9, doubleInclinedInvertedArc( 1, snapVal/(this.slideWidth/2) ));

        scale = Math.floor(scale*1000)/1000
        opacity = Math.floor(opacity*1000)/1000

		return { scale, opacity }
	}

	run() {

        if ( window.location.pathname.indexOf("/about") === -1 ) return;

		this.lastX = lerp(this.lastX, this.currentX, this.opts.ease);
		this.lastX = Math.floor(this.lastX * 100) / 100;

		this.slides.forEach((slide, index) => {

			let translationVal = gsap.utils.wrap(this.min, this.max, this.initTranslates[index] + this.lastX);

			if ( 0 <= (translationVal/this.slideWidth) && (translationVal/this.slideWidth) <= 5 )
				slide.style.setProperty("visibility", "visible")
			else slide.style.setProperty("visibility", "hidden")

			slide.style.setProperty("transform",
				`translate3d(${translationVal}px, 0px, 0px)`);

		})

		this.requestAnimationFrame()
	}

	closest() {
		const numbers = []
		this.slides.forEach((slide, index) => {
			const bounds = slide.getBoundingClientRect()
			const diff = this.currentX - this.lastX
			const start = (bounds.x + diff) + (0)
			const fromStart = this.startX - start
			numbers.push(fromStart)
		})

		let closestIndex = number(0, numbers)
		let closestVal = numbers[closestIndex]

		return {
			closestIndex, closestVal
		}
	}


	requestAnimationFrame() {
		this.rAF = requestAnimationFrame(this.run)
	}

	cancelAnimationFrame() {
		cancelAnimationFrame(this.rAF)
	}

    swipeImage() {

        if ( window.location.pathname.indexOf("/about") === -1 ) return;

        let closeDetails = this.closest()
        if ( closeDetails.closestVal > 0 ){
            this.currentX += -1;
            this.swipeImage();

            return;
        }
        else if ( closeDetails.closestVal < (-this.slideWidth/2) ) {
            this.currentX += -1;
            this.swipeImage();
            return;
        }
        else{
            const swipeImage_tl = gsap.timeline({
                defaults:{
                    ease: "sine",
                }
            })

            swipeImage_tl
                .to( this, {
                    currentX: this.currentX+closeDetails.closestVal } )
                .to( this.slides[closeDetails.closestIndex].querySelector(".Works-slideInner"),
                    {
                        transform: `scale(${1.0}, ${1.0})`, opacity:0.9 },
                    0.5 )
                .to( this.slides[closeDetails.closestIndex].querySelector(".Works-slideInner"),
                    {
                        transform: `scale(${0.8}, ${0.8})`, opacity:0.2 }
                    , 2.5 )
                .to( this,
                    {
                        currentX: this.currentX-(this.slideWidth/2),
                        onComplete: ()=>{ this.swipeImage()}}
                    , 2.5 )
        }


    }

	addEvents() {
		this.run()
        this.swipeImage()
	}

	removeEvents() {
		this.cancelAnimationFrame(this.rAF)
        this.swipeImageState = 0;
	}

	resize() {
		this.setBounds()
	}

	destroy() {
		this.removeEvents()

		this.opts = {}
	}

	init() {
		this.setBounds()
		this.addEvents()
	}
}


function WorksSliderItem(props) {

	return (
		<div className="Works-slide"
			data-index={props.index}
			style={{
				"--index": props.index,
				transform: "translate3d(533px, 0px, 0px)",
				position: "absolute",
				touchAction: "pan-y",
				visibility: "visible",
			}}
		>
			<div className="Works-slideInner"
				style={{
                    transformOrigin: "50% 50%",
                    transform:
                        "translate3d(0px, 0px, 0px) scale(0.8, 0.8)",
					touchAction: "pan-y",
					opacity: 0.2
				}}
			>
				<div className="Works-slideImage"
					style={{ touchAction: "pan-y", opacity: 1 }}
				>
					<div
						className="Works-slideImageInner"
						style={{
							touchAction: "pan-y",
							opacity: 1,
							transformStyle: "preserve-3d",
						}}
					>
						<div className="AppImage Works-slideImageInnerImg loaded lazyload fit-cover"
							style={{
								"--ratio": "0%",
								touchAction: "pan-y",
								transform: "translate3d(0rem, 0px, 0px)",
							}}
						>
							<div className="AppImage-overlay"
								style={{ touchAction: "pan-y" }}
							></div>
							<div className="AppImage-placeholder"
								style={{
									touchAction: "pan-y",
									backgroundColor: (props.overlayColor !== undefined ? props.overlayColor : "rgb(70, 70, 70"),
								}}
							></div>
							<picture
								style={{ touchAction: "pan-y" }}
							>

								<img
									draggable="false"
									data-src={ props.srcSet }
									alt="Mitsubishi - Lancement du nouveau SUV"
									className="AppImage-image"
									style={{ "objectFit": "cover", "objectPosition": "center center", "touchAction": "pan-y" }}
									src={ props.src }
								/>
							</picture>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function AboutLabel(props){


    return (
        <div className="Label">
            <div className="Label-header">
                <h2> { props.heading } </h2>
            </div>
            <div className="Label-title" style={{
                "--title-color" : props.titleColor
            }}>
                <h4> {props.title} </h4>
            </div>
            <div className="Label-tags">
                <p>
                    { (props.tags+" ") + (props.tags+" ") + (props.tags+" ") + (props.tags+" ") }
                </p>
            </div>
        </div>
    )
}


// Page Component
export default function About(props){

    const executed = useRef(0);


    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){
			executed.current = true;

            // Tags Slide
			if (true) {
				document.querySelectorAll(".Label-tags > p").forEach((tag) => {
					let xOffset = 0;
					let isMouseIn = false;
					const slides = tag;

					setInterval(translate, 0);

					function translate() {
                        let offsetIncrementor = isMouseIn ? 0.05 : 0.5;
                        if (xOffset >= (tag.clientWidth/2)) xOffset = 0;
                        else xOffset = xOffset + offsetIncrementor;
                        slides.style.transform = "translateX(-" + xOffset + "px)";
					}
				});
			}

            // Works slider
			if (true) {
				const worksSlider = new Slider({ m_cursor_states : props.m_cursor_states });
				worksSlider.init();

				// let workResizeListener = worksSlider.resize
				// window.addEventListener("resize", workResizeListener);

				// // putting listener to be destroyed when leaving the page
				// props.windowListeners.listeners.push(workResizeListener);
			}
        }
    }, [])

    return(
        <div className="About-page" data-scroll-container>
            <Head>
				<title>About - Another IDEA</title>
			</Head>

            <section className="AboutCarousel-section">
                <div className="AboutTitle-wrapper">
                    <h1 className="AboutTitle">
                        <span className="AboutTitle-title" >ANOTHER IDEA</span>
                        <span className="AboutTitle-subtitle" >YOUR WORLD FROM A DIFFERENT POINT OF VIEW</span>
                    </h1>
                </div>
                <div className="AboutCarousel Works-slider">
                        <div
                            style={{ touchAction: "pan-y", cursor:"grab" , userSelect: "none" }}
                        >
                            <div className="Works-wrapper"
                                style={{
                                    transform: "translate3d(0px, 0px, 0px)",
                                    // height: "calc(60vw * 0.69)",
                                    touchAction: "pan-y",
                                }}
                            >
                                <WorksSliderItem
                                    src="./assets/spotify_work.png"
                                    label="Spotify"
                                    overlayColor="#777799"
                                    index="0"
                                />
                                <WorksSliderItem
                                    src="./assets/amul_icecream_work.png"
                                    label="Amul Icecream"
                                    index="1"
                                />
                                <WorksSliderItem
                                    src="./assets/ola_london_work.png"
                                    label="Ola London"
                                    index="2"
                                />
                                <WorksSliderItem
                                    src="./assets/spotify_work.png"
                                    label="Spotify"
                                    index="3"
                                />
                                <WorksSliderItem
                                    src="./assets/amul_icecream_work.png"
                                    label="Amul Icecream"
                                    index="4"
                                />
                                <WorksSliderItem
                                    src="./assets/ola_london_work.png"
                                    label="Ola London"
                                    index="5"
                                />
                            </div>
                        </div>
                </div>
            </section>
            <section className="AboutLabels-section">
                <div className="About-Labels">
                    <AboutLabel
                        heading = "PRE-PRODUCTION"
                        title = "CREATING TAILORED STORYLINES."
                        titleColor = "#5542F7"
                        tags = "PRODUCTION STRATEGY / CREATIVE WRITING / STORYBOARD CREATION /"
                    />
                    <AboutLabel
                        heading = "PRODUCTION"
                        title = "BRINGING IDEAS TO FOCUS."
                        titleColor = "#f2ad45"
                        tags = "DIRECTING / FULL-SCALE PRODUCTION / PROCUREMENT OF CREW & EXTE"
                    />
                    <AboutLabel
                        heading = "POST-PRODUCTION"
                        title = "BRINGING STORIES TO LIFE, FRAME BY FRAME."
                        titleColor = "#de477e"
                        tags = "CONTENT EDITING / MOTION GRAPHICS / AUDIO & SOUND / VISUAL FX & C"
                    />
                </div>
            </section>

            <Trustedby />
            <ReadyToMake />
            <Footer></Footer>
        </div>
    )
}