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


    const profiles = [
                        ["./assets/team_profiles/srushti_iyer.JPG", "Shruti Iyer"],
                        ["./assets/team_profiles/nidhi_gandhi.jpg", "Nidhi Gandhi"],
                        ["./assets/team_profiles/natasha_agarwal_jagtap.jpg", "Natasha Agarwal Jagtap"],
                        ["./assets/team_profiles/nadeem_shaikh_.jpg", "Nadeem Shaikh"],
                        ["./assets/team_profiles/manish_chougule.jpg", "Manish Chougule"],
                        ["./assets/team_profiles/ishaandeep_awasty.JPEG", "Ishaandeep Awasty"],
                        ["./assets/team_profiles/inigo_nadar.jpg", "Inigo Nadar"],
                        ["./assets/team_profiles/gaurav_gandhi.jpg", "Gaurav Gandhi"],
                        ["./assets/team_profiles/anindita_mukherjee.jpg", "Anindita Mukherjee"],
                        ["./assets/team_profiles/a_aakash_rao.jpg", "A Aakash Rao"],
                    ]

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
                            name = "JEET"
                            about = {<>One that brings words to life.<br/>Our resident magician.<br/><br/>The sheer ease with which Jeet can tell a story off-screen translates directly to his work on screen with an innate ability to bring out the desired emotion impactfully.<br/><br/>An ad film director who&apos;s worked on over 150 commercials in the last seven years and earned all his tricks on-set, somewhere between reel life and real life<br/><br/>Jeet is a dire cinema addict obsessed with doing justice to every script.</>}
                        />
                        <OnBoardItem
                            imgSrc = "./assets/profile_02.png"
                            name = "THEA"
                            about = {<>The one that wore many hats until she tried on the director one, and never let that go.<br/><br/>With a foundation that required her to relocate constantly, Thea has the infinite ability to organize chaos and has mastered the art of understanding complex human emotions, which makes her dazzle brilliantly as a director. <br/><br/>In her quest to bring her favorite three weapons - music, words, and visuals together, Thea has conquered the craftwork of imagination and pulling references for everything!</>}
                        />
                        <OnBoardItem
                            imgSrc = "./assets/profile_02.png"
                            name = "PROSIT"
                            about = {<>The king of nuances and backstories.<br/><br/>One of the main reasons Prosit&apos;s work is identifiable as his own is due to his ability to get to the root of every story, deep-diving into cultures and making the characters memorable and relatable.<br/><br/>He internalizes the script and beautifully decodes it on screen. Whether it is Patal Lok or a Pampers advertisement, Prosit has the expertise to evoke emotion from all audiences.<br/><br/>He&apos;s the most incredible support system for a team but an even better Director.</>}
                        />

                        {/* Other Directors */}
                        <div className="OnBoard-listItem OtherDirectors-List">
                            <h3 className="OtherDirectors-title u-textUppercase">Other Directors</h3>
                            <div className="OtherDirectors-ListItems">
                                {/* <OtherDirectorItem
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
                                /> */}
                                <OtherDirectorItem
                                    imgSrc = {profiles[0][0]}
                                    name = {profiles[0][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[1][0]}
                                    name = {profiles[1][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[2][0]}
                                    name = {profiles[2][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[3][0]}
                                    name = {profiles[3][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[4][0]}
                                    name = {profiles[4][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[5][0]}
                                    name = {profiles[5][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[6][0]}
                                    name = {profiles[6][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[7][0]}
                                    name = {profiles[7][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[8][0]}
                                    name = {profiles[8][1]}
                                    about = "Sample Text"
                                />
                                <OtherDirectorItem
                                    imgSrc = {profiles[9][0]}
                                    name = {profiles[9][1]}
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