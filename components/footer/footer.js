import Link from "next/link"

import Appbutton from "../button/appbutton"

export default function Footer(){

    return (
        <footer>
            <div className="Footer-wrapper">
                <div className="footerRow">
                    <h2>Wherever you are, <br/> We&#39;ve got Another Idea for you.</h2>
                    <Appbutton
                        href="/contact"
                        label="LET&#39;S"
                        boldLabel="&nbsp;TALK"
                        marginTop="11vw"
                    />
                </div>
                {/* <div className="footerRow">
                    <h2>Places we&#39;ve <br/> shot at :</h2>
                    <div className="footerTable">
                        <Link href="">
                            <span> Pan India </span>
                        </Link>
                        <Link href="">
                            <span>  Bucharest, Romania </span>
                        </Link>
                        <Link href="">
                            <span> Bangkok, Thailand </span>
                        </Link>
                        <Link href="">
                            <span> Ho Chi Minh, Vietnam </span>
                        </Link>
                        <Link href="">
                            <span> Jakarta, Indonesia </span>
                        </Link>
                        <Link href="">
                            <span> Taipei, Taiwan </span>
                        </Link>
                        <Link href="">
                            <span> Manila, Philippines </span>
                        </Link>
                    </div>
                </div> */}
                <div className="Footer-planetbg">
                    <video loop={"loop"} muted={true} preload={"auto"} playsInline={true} autoPlay={true} className="Video Footer-planetbgVideo gifLike in-view">
                        <source src="https://www.mediakeys-experience.com/_nuxt/videos/planet.d4ca9e7.webm" data-src="https://www.mediakeys-experience.com/_nuxt/videos/planet.d4ca9e7.webm" type="video/webm" />
                        <source src="https://www.mediakeys-experience.com/_nuxt/videos/planet.ebe16bb.mp4" data-src="https://www.mediakeys-experience.com/_nuxt/videos/planet.ebe16bb.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className="copyRightText">
                © 2022 All Rights Reserved Another Idea
            </div><hr color="black" />
        </footer>
    )
}