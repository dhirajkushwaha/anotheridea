// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Link from "next/link";

// External Libraries
// import {Curtains, Plane} from 'curtainsjs'; // Cloth Waving effect
// import {Curtains, Plane} from 'react-curtains';

// Gsap
import { gsap } from "gsap/dist/gsap";

// Custom Components
import Footer from "../../components/footer/footer"
import ReadyToMake from "../../components/readytomake.js";


// Fragmented Components
function WorksListItem(props){

    if ( props.href === undefined ) props.href = "/"
    const rootElRef = useRef();
    const executed = useRef(0);

    const cl_name = `.list-${props.index}`

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            let iframe = document.querySelector(cl_name+' iframe');
            let player = new Vimeo.Player(iframe);

            // adding the popup
            document.querySelector(cl_name).addEventListener("click", (e)=>{
                document.querySelector(cl_name+" .List-popup").classList.remove("popup-hidden");
                document.querySelector(".Header").classList.add("Header-under-element");
                e.preventDefault();

                player.play();
            })

            // popup remove fn
            let popup_r_fn = (e)=>{
                document.querySelector(cl_name+" .List-popup").classList.add("popup-hidden");
                document.querySelector(".Header").classList.remove("Header-under-element");
                e.cancelBubble = true;

                player.pause();
            }

            // player.on('ended', function() {
            //     popup_r_fn();
            // });

            // removing the popup
            document.querySelector(cl_name+" .Popup-cross").addEventListener("click", popup_r_fn)
            // removing the popup
            document.querySelector(cl_name+" .List-popup").addEventListener("click", popup_r_fn)


            executed.current += 1;
        }
    }, [])



    return(
        <div className={`List-item list-${props.index}`} ref={rootElRef} >
            {/* <Link href={props.href}> */}
                {/* <a href={props.href} className="WorksListItem in-view" > */}
                <div className="WorksListItem in-view" >
                    {/* <Curtains>
                        <BasicPlane> */}
                            <div className="AppImage fit-contain fit-cover loaded plane WorksListItem-thumbnail">
                                <div className="AppImage-overlay"></div>
                                <picture>
                                    { props.source }
                                    <img src={ props.imgUrl } alt="" className="AppImage-image" />
                                </picture>
                            </div>
                        {/* </BasicPlane>
                    </Curtains> */}
                    <h3 className="WorksListItem-title u-textUppercase app-title--small">{ props.label }</h3>
                    <div className="AppImage WorksListItem-details app-text--small">
                        <span className="WorksListIem-detail u-textUppercase app-text--small">Director:</span>
                        <span className="WorksListIem-detail u-textUppercase app-text--small">{ props.dirLabel }</span>
                    </div>
                </div>
                {/* </a> */}
            {/* </Link> */}

            <div className="List-popup popup-hidden">
                <div className="Popup-frame">
                    <div className="Popup-cross">close <img src="https://img.icons8.com/ios-filled/18/FFFFFF/delete-sign--v2.png"/> </div>
                    <div className="Popup-video">
                        <iframe src={props.videoSrc} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WorksList(props){

    const worksDetailsList = [["/", "/assets/ola_scooter.png", "Ola Scooter", "Ola Scooter", "automobile", "https://player.vimeo.com/video/754220291?h=f2c9e7e7ca&amp;quality=240p&amp;"],
                              ["/", "/assets/jiomart_work.png", "Harr Ghar Annapurna", "Jio Mart", "food", "https://player.vimeo.com/video/765214389?h=d898015521&amp;quality=240p&amp;"],
                              ["/", "/assets/pampers_work.png", "#Ittakes2", "Pampers", "", "https://player.vimeo.com/video/765214389?h=d898015521&amp;quality=240p&amp;"]
                            ];



    const executed = useRef(0);
    const work_el_added_count = useRef(0);
    const [worksList, setWorksList] = useState([]);

    // Functions
    const makeListItemsAnimated = () => {
        document.querySelectorAll(".List-item").forEach((listItemEl) => {


            listItemEl.querySelector(".AppImage-overlay").style.setProperty("opacity", 1);
            gsap.set(listItemEl.querySelector(".WorksListItem-title"), { opacity:0, x:"20%" });
            gsap.set(listItemEl.querySelector(".WorksListItem-details"), { opacity:0, x:"20%" });

            const worksItemScrollTimeLine = gsap.timeline({ defaults:{ },
                scrollTrigger:{
                    trigger: listItemEl,
                    scroller: "[data-scroll-container]",
                    start: "top bottom-=15%",
                    end: "top 30%",
                }
            });

            worksItemScrollTimeLine
                .fromTo(listItemEl.querySelector(".AppImage-overlay"), { x:"0%" }, { duration: 0.5, x:"-200%", ease:"none", onComplete:()=>{
                    gsap.set(listItemEl.querySelector(".AppImage-overlay"), { opacity: 0, onComplete:()=>{
                        listItemEl.querySelector(".AppImage-overlay").style.removeProperty("transform");
                    }})
                }})
                .fromTo(listItemEl.querySelector(".WorksListItem-title"), { opacity:0, x:"20%" }, { opacity:1, x:"0%" }, "<0.05")
                .fromTo(listItemEl.querySelector(".WorksListItem-details"), { opacity:0, x:"20%" }, { opacity:1, x:"0%" }, "<0.1")
        })
    }

    const waitUntilLocomotiveTrue = (props) => {

        props.s_trigger_anim(() => {

            let l_s = document.querySelector(".Load-screen");

            let intervalRef = setInterval(() => {

                let c_s_t, s_t_a;

                try {
                    c_s_t = getComputedStyle(l_s).getPropertyValue("transform");
                    s_t_a = parseInt(c_s_t.split("(")[1].split(")")[0].split(",")[5]*(-1)) > window.innerHeight*0.6;
                } catch (error) { }


                if ( work_el_added_count.current > 1 ){
                    c_s_t = null;
                    s_t_a = true;
                }

                if ( c_s_t === "none"  ) return;
                if ( props.locomotiveScrollInstance.current === undefined || !( s_t_a ) ) return;

                props.locomotiveScrollInstance.current.update();

                // Adding the animation
                makeListItemsAnimated();

                work_el_added_count.current++;
                if ( props.locomotiveScrollInstance.current !== undefined ) clearInterval(intervalRef);

            }, 0);

        });


    }

    const createWorksComponent = (filter) => {
        setWorksList([]);
        let localWorksList = [];

        if (filter == "all"){
            worksDetailsList.forEach((work, index) => {
                localWorksList.push(<WorksListItem
                                href={work[0]}
                                imgUrl={work[1]}
                                label={work[2]}
                                dirLabel={work[3]}
                                videoSrc={work[5]}
                                index={index}
                                key={index}
                            />);

            });
        } else {
            worksDetailsList.forEach((work, index) => {
                if ( filter == work[4] ){
                    localWorksList.push(<WorksListItem
                                    href={work[0]}
                                    imgUrl={work[1]}
                                    label={work[2]}
                                    dirLabel={work[3]}
                                    videoSrc={work[5]}
                                    index={index}
                                    key={index}
                                />);
                }
            });
        }

        setWorksList(localWorksList);
    }

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( executed.current < 1){

            // Make Works Component
            if (true){
                createWorksComponent("all");

                document.querySelectorAll(".Listfilter-listItem").forEach(listfilterItem => {
                    listfilterItem.addEventListener("click", (e)=>{
                        createWorksComponent(listfilterItem.getAttribute("data-filter"));
                    })
                });
            }

            executed.current += 1;
        }
    }, [])


    useEffect(() => {

        // Locomotive with scrollTrigger
        if ( true ){
            waitUntilLocomotiveTrue(props.parentProp);
            props.parentProp.cursor_events_listen();
        }

    }, [worksList])

     return (
        <div className="List-items">
            {worksList}
        </div>
     )
}

// Page Component
export default function Work(props){

    const executed = useRef(0);


    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            // ListFilter Listener
            if ( true ){
                const ListfilterItem = document.querySelectorAll(".Listfilter-listItem");
                var LastFilterItem = document.querySelector(".Listfilter-listItem.is_active")

                ListfilterItem.forEach(filterItem => {
                    filterItem.addEventListener("click", (e)=>{
                        LastFilterItem.classList.remove("is_active");
                        filterItem.classList.add("is_active");
                        LastFilterItem = filterItem;
                    });
                });

            }

            executed.current += 1
        }
    }, [])

    return(
        <div className="Work-page" data-scroll-container>
            <Head>
				<title>Work - Another IDEA</title>
			</Head>

            <section className="Works-Listfilter">
                <div className="Listfilter-wrapper">
                    <div className="Listfilter-list">
                        <div className="Listfilter-title">Explore :</div>
                        <div className="Listfilter-listItem is_active" data-filter="all" >
                            <div className="Listfilter-listItemLabel">
                                All
                            </div>
                        </div>
                        <div className="Listfilter-listItem" data-filter="automobile">
                            <div className="Listfilter-listItemLabel">
                                Automobile
                            </div>
                            <span className="Listfilters-listItemCount">01</span>
                        </div>
                        <div className="Listfilter-listItem" data-filter="food">
                            <div className="Listfilter-listItemLabel">
                                Food
                            </div>
                            <span className="Listfilters-listItemCount">01</span>
                        </div>
                        <div className="Listfilter-listItem is-disable" data-filter="beauty">
                            <div className="Listfilter-listItemLabel">
                                Beauty
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                        <div className="Listfilter-listItem is-disable" data-filter="FMCG">
                            <div className="Listfilter-listItemLabel">
                                FMCG
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                        <div className="Listfilter-listItem is-disable" data-filter="drama">
                            <div className="Listfilter-listItemLabel">
                                Drama
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                        <div className="Listfilter-listItem is-disable"  data-filter="humour">
                            <div className="Listfilter-listItemLabel">
                                Humour
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="Works-List">
                <div className="List-wrapper">
                    <WorksList parentProp={props} />
                </div>
                <ReadyToMake />
            </section>
            <Footer></Footer>
        </div>
    )
}