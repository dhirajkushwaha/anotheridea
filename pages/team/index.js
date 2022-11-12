// React
import { React, useEffect, useRef } from "react";

// Nextjs components
import Head from "next/head";


// Custom Components
import Footer from "../../components/footer/footer"


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


export default function Team(){

    const executed = useRef(0);

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

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

        }
    }, [])

    return (
        <div className="Directors-page" data-scroll-container>
            <Head><title>Directors - Another IDEA</title></Head>

            <section className="Directors-onBoard">
                <div className="Title u-textUppercase">
                    <h1>The Team</h1>
                </div>
                <div className="OnBoard-wrapper">
                    <div className="OnBoard-listItems">

                        {/* Other Directors */}
                        <div className="OnBoard-listItem OtherDirectors-List">
                            <h3 className="OtherDirectors-title u-textUppercase">Other Directors</h3>
                            <div className="OtherDirectors-ListItems">
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