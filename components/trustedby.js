// React component
import { React, useEffect, useRef } from "react";

// Next component
import Link from "next/link";



export default function Trustedby() {

    const executed = useRef(false);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (!executed.current) {
			executed.current = true;

			//  Trusters Logo Slide
			if (true) {
				document.querySelectorAll(".trusterSlider").forEach((slider) => {
					let xOffset = 0;
					let isMouseIn = false;
					const slides = slider;

					setInterval(translate, 0);

					function translate() {
                        let offsetIncrementor = isMouseIn ? 0.05 : 0.5;
                        if (xOffset >= (( window.innerWidth >= 1024 ) ? (window.innerWidth/100)*((280+40)/19.2) : 280+40) * 7) xOffset = 0;
                        else xOffset = xOffset + offsetIncrementor;
                        slides.style.transform = "translateX(-" + xOffset + "px)";
					}
				});
			}

		}
	}, []);

    return (
        <>
            <div className="footerTrustedBy">
                {/* <h2>TRUSTED BY</h2> */}
                <h2>Trusted by</h2>
                <div className="trustersLoop">
                    <div className="trusterSlideWrapper">
                        <div className="trusterSlider">
                            <div className="trusterSliderItem">
                                <img
                                    src="https://as1.ftcdn.net/v2/jpg/01/76/62/20/1000_F_176622092_YNTOm08XHlYI7CpNLDnd8qLDIwK91eyQ.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img src="./assets/glucose_structure.svg" alt="" />
                            </div>
                            <div className="trusterSliderItem">
                                <img
                                    src="https://www.visionlearning.com/images/figure-images/62-b-2x.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img
                                    src="https://i1.wp.com/www.differencebetween.com/wp-content/uploads/2019/07/Difference-Between-Acetic-Acid-and-Ethanoic-Acid_figure-2.png?resize=550%2C351&ssl=1"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img
                                    src="https://www.12voltplanet.co.uk/user/V_IR.png"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img src="./assets/glucose_structure.svg" alt="" />
                            </div>
                            <div className="trusterSliderItem">
                                <img src="./assets/glucose_structure.svg" alt="" />
                            </div>
                            {/* Copy content */}
                            <div className="trusterSliderItem">
                                <img
                                    src="https://as1.ftcdn.net/v2/jpg/01/76/62/20/1000_F_176622092_YNTOm08XHlYI7CpNLDnd8qLDIwK91eyQ.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img src="./assets/glucose_structure.svg" alt="" />
                            </div>
                            <div className="trusterSliderItem">
                                <img
                                    src="https://www.visionlearning.com/images/figure-images/62-b-2x.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img
                                    src="https://i1.wp.com/www.differencebetween.com/wp-content/uploads/2019/07/Difference-Between-Acetic-Acid-and-Ethanoic-Acid_figure-2.png?resize=550%2C351&ssl=1"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img
                                    src="https://www.12voltplanet.co.uk/user/V_IR.png"
                                    alt=""
                                />
                            </div>
                            <div className="trusterSliderItem">
                                <img src="./assets/glucose_structure.svg" alt="" />
                            </div>
                            <div className="trusterSliderItem">
                                <img src="./assets/glucose_structure.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
