// React component
import { React, useEffect, useRef, useState } from "react";

// Next component
import Link from "next/link";



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

                let t_logos = []
                for (let layer_n = 1; layer_n <= 45/7; layer_n++) {

                    let oneLayer_logos = [];

                    for (let num = 1; num <= 7; num++) {

                        let trustedSliderItem = (<div className="trusterSliderItem">
                                                    <img
                                                        src={`/assets/truster/logo (${(layer_n-1)*7 + num}).png`}
                                                        alt=""

                                                        key={(layer_n-1)*7 + num}
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
                    <div className="trusterSlideWrapper">



                        {/* <div className="trusterSlider">

                            { logo }

                            Copy content

                            { logo }

                        </div> */}

                        { trusters }

                    </div>
                </div>
            </div>
        </>
    );
}
