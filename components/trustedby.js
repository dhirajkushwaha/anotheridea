// React component
import { React, useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Next component
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper";

export default function Trustedby() {

    const executed = useRef(false);
    const [trusters, setTrusters] = useState([]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (!executed.current) {
			executed.current = true;

			//  Trusters Logo sourcing
			if (true) {

                // let n_logos = 9;
                let n_logos = 5;
                if (document.body.clientWidth <= 1023) { n_logos = 3 }

                let t_logos = [];

                for (let layer_n = 1; layer_n <= Math.round( 45/n_logos ); layer_n++) {

                    let oneLayer_logos = [];
                    for (let num = 1; num <= n_logos; num++) {

                        if ( ((layer_n-1)*n_logos + num) > 45 ){
                            continue;
                        }
                        let trustedSliderItem = (<div className="trusterSliderItem">
                                                    <img
                                                        src={`/assets/truster/logo (${(layer_n-1)*n_logos + num}).png`}
                                                        alt=""
                                                        key={(layer_n-1)*n_logos + num}
                                                    />
                                                </div>)

                        oneLayer_logos.push( trustedSliderItem );
                    }
                    // Animation state
                    // oneLayer_logos.push([... oneLayer_logos])

                    t_logos.push([<div className="trusterSlider" key={layer_n}> {oneLayer_logos} </div> ]);

                }

                setTrusters(t_logos);

			}

		}
	}, []);

    useEffect(() => {

        //  Trusters Logo Making them flow
        if (true) {

            // Animation state
            // document.querySelectorAll(".trusterSlider").forEach((slider) => {

            //     let xOffset = 0;
            //     let isMouseIn = false;
            //     const slides = slider;

            //     setInterval(translate, 0);

            //     function translate() {
            //         let offsetIncrementor = isMouseIn ? 0.05 : 0.5;
            //         if (xOffset >= (( window.innerWidth >= 1024 ) ? (window.innerWidth/100)*((280+40)/19.2) : 280+40) * 7) xOffset = 0;
            //         else xOffset = xOffset + offsetIncrementor;
            //         slides.style.transform = "translateX(-" + xOffset + "px)";
            //     }
            // });
        }


    }, [trusters])


    return (
        <>
            <div className="footerTrustedBy">
                {/* <h2>TRUSTED BY</h2> */}
                <h2>Trusted by</h2>
                <div className="trustersLoop">
                        <Swiper
                            scrollbar={{
                                hide: true,
                            }}
                            modules={[Scrollbar]}
                        >
                            <SwiperSlide>
                                <div className="trusterSlideWrapper">
                                    { trusters.slice(0, 3) }
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="trusterSlideWrapper">
                                    { trusters.slice(3, 6) }
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="trusterSlideWrapper">
                                    { trusters.slice(6, 9) }
                                </div>
                            </SwiperSlide>
                        </Swiper>
                </div>
            </div>
        </>
    );
}
