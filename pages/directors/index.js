// React
import { React, useEffect, useRef } from "react";

// Nextjs components
import Head from "next/head";


// Custom Components
import Footer from "../../components/footer/footer"

function OnBoardItem(props){
    return (
        <div className="OnBoard-listItem">
            <div className="OnBoardDirector-Profile">
                <picture>
                    <img className="OnBoardDirector-Image" src={props.imgSrc} alt="" />
                </picture>
                <h3 className="OnBoardDirector-Name">{props.name}</h3>
            </div>
            <div className="OnBoardDirector-About">
                <p>{props.about}</p>
            </div>
        </div>
)
}

function OtherDirectorItem(props){
    return (
        <div className="OtherDirectors-ListItem">
            <picture>
                <img className="OtherDirectors-Image" src={props.imgSrc} alt="" />
            </picture>
            <h3 className="OtherDirectors-Name">{props.name}</h3>
            <span>{props.about}</span>
        </div>
    )
}


export default function Directors(){

    // const executed = useRef(0);

    // useEffect(() => {
	// 	if (typeof window === "undefined") { return; }
    //     if ( !executed.current){

    //     }
    // }, [])

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
                            imgSrc = "./assets/profile_01.png"
                            name = "Directors Name"
                            about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        />
                        <OnBoardItem
                            imgSrc = "./assets/profile_02.png"
                            name = "Prosit Roy"
                            about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.."
                        />
                        <div className="OnBoard-listItem OtherDirectors-List">
                            <h3 className="OtherDirectors-title u-textUppercase">Other Directors</h3>
                            <div className="OtherDirectors-ListItems">
                                <OtherDirectorItem
                                    imgSrc = "./assets/profile_01.png"
                                    name = "Jeet L."
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = "./assets/profile_02.png"
                                    name = "Prosit Roy"
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = "./assets/profile_01.png"
                                    name = "John D."
                                    about = "Sample Text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </div>
    )
}