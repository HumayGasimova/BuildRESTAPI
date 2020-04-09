/**
* Libraries
*/

import React, {
    useState,
    useEffect,
    useRef
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import {
    withRouter
} from 'react-router-dom';

import { 
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

/**
* Icons
*/

import { 
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

/**
* Styles
*/

import './relatedPostsSlider.scss';

/**
* Components
*/

import RelatedPostCard from '../RelatedPostCard/relatedPostCard';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Selectors
*/

import * as Selectors from '../../../../reducers/selectors';

/**
* Hooks
*/

import {
    useInterval
} from '../../../../Hooks/useInterval';

/**
* Utility
*/

import {
    H2,
    H3,
    H4,
    H5,
    EH1,
    EH2,
    EH4,
    EW1,
    EW2,
    Line1
} from '../../../UtilityComponents';

/**
* RelatedPostsSlider component definition and export
*/

export const RelatedPostsSlider = (props) => {

    const getWidth = () => window.innerWidth;

    // let slides = [];

    let firstSlide;
    let secondSlide;
    let thirdSlide;
    let forthSlide;
    let lastSlide;

    const [state, setState] = useState({
        activeIndex: 0,
        translate: 202.5,
        transition: 0.45,
        _slides: []
    });

    const [cardWidth, setCardWidth] = useState(202.5);
    const [slides, setSlides] = useState([]);

    const {activeIndex, translate, transition, _slides} = state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();

    /**
    * Methods
    */

    useEffect(() => {
        props.startInitRelatedPosts(props.id);
        let slidesArray = [...props.relatedPosts];
        setSlides(slidesArray)
        // firstSlide = slides[0];
        // secondSlide = slides[1];
        // thirdSlide = slides[2];
        // forthSlide = slides[3];
        // lastSlide = slides[slides.length - 1];

       
        // if(props.id){
        //     props.addRelatedPostsElement();
        // }

        if(props.relatedPosts.length !== 0){
            setState({
                ...state,
                _slides: [slidesArray[slidesArray.length - 1], slidesArray[0], slidesArray[1], slidesArray[2], slidesArray[3]]
            })
        }
        return () => {
            setState({
                activeIndex: 0,
                translate: 202.5,
                transition: 0.45,
                _slides: []
            });
            setSlides([]);
            setCardWidth(202.5);
            props.startInitRelatedPosts(null);
        };
    }, [props.id, props.relatedPosts.length, slides.length]);

    useEffect(() => {
        // autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
    })

    useEffect(() => {
        if(transition === 0) {
            setState({
                ...state,
                transition: 0.45
            })
        }
    }, [transition])

    useEffect(() => {
        // const play = () => {
        //     autoPlayRef.current();
        // }

        const smooth = e => {
            if(e.target.className.includes('related-posts-slider-content')){
                transitionRef.current()
            }
        }

        const resize = () => {
            resizeRef.current()
        }

        let interval = null;

        const transitionEnd = window.addEventListener('transitionend', smooth);
        const onResize = window.addEventListener('resize', resize);

        // if(props.autoPlay){
        //     interval = setInterval(play, 3000);
        //     // return () => clearInterval(interval);
        // }

        return () => {
            window.removeEventListener('transitionend', transitionEnd);
            window.removeEventListener('resize', onResize);
            // if(props.autoPlay){
                // clearInterval(interval);
            // }
        };
    }, [])

    useInterval(() => {
        nextSlide();
    }, props.autoPlay ? 3000 : null);

    const storyOnClick = (path, obj) => {
        props.history.push(`/crypto-cafe/${path}`,{obj});
        props.startInitRelatedPosts(null);
    }
    
    const handleResize = () => {
        setState({
            ...state,
            translate: cardWidth,
            transition: 0
        })
    }

    const smoothTransition = () => {
        let _slides = [];
        
            if(activeIndex === slides.length - 1){
                _slides = [slides[slides.length - 2], slides[slides.length - 1], slides[0], slides[1], slides[2]];
            }
            if (activeIndex === 0){
                _slides = [slides[slides.length - 1], slides[0], slides[1], slides[2], slides[3]];
            }
            if(activeIndex === 1){
                _slides = slides.slice(activeIndex - 1, activeIndex + 5);
            }
            if(activeIndex === 2){
                _slides = [slides[1], slides[2], slides[3], slides[slides.length - 1], slides[0]];
            }
            if(activeIndex === 3){
                _slides = [slides[2], slides[3], slides[slides.length - 1], slides[0], slides[1]];
            }
        
        setState({
            ...state,
            _slides,
            transition: 0,
            translate: cardWidth
        })
    }

    const prevSlide = () => {
        if(slides.length !== 0){
            setState({
                ...state,
                translate: 0,
                activeIndex: activeIndex === 0 ? slides.length - 1 : activeIndex - 1
            })
        }
     
    }

    const nextSlide = () => {
        if(slides.length !== 0){
            setState({
                ...state,
                translate: translate + cardWidth,
                activeIndex: activeIndex === slides.length - 1 ? 0 : activeIndex + 1
            })
        }
    }

    const widthOfTheCard = (width) => {
        setCardWidth(width);
    }

    const renderRelatedPostsSlider = () => {
        // console.log(_slides)
        if(_slides.length !== 0){
            return(
                <div 
                    className="related-posts-slider-content" 
                    id="related-posts-slider-content"
                    style={{
                        transform: `translateX(-${translate}px)`,
                        transition: `transform ${transition}s ease-out`,
                        width: `1004px`
                    }}
                >{_slides.map((el, i) => {
                    return (
                        <RelatedPostCard
                            key={i}
                            image={el.image}
                            header={el.header}
                            day={el.day}
                            month={el.month}
                            year={el.year}
                            comments={el.comments}
                            getWidthOfCard={(w) => widthOfTheCard(w)}
                            onClick={() => storyOnClick(el.path, el)}
                            openGallery={() => props.openGallery(el.id, 'Realted posts')}
                        />
                    )
                })}</div>
            )
        }
    }

    /**
    * Markup
    */

    return(
        <div className="related-posts">
            <EH2/>
            <H3>RELATED POSTS</H3>
            <EH2/>
            <div className="related-posts-wrapper" id="slider">
                <div className="related-posts-arrow-left" onClick={prevSlide}>
                    <FontAwesomeIcon 
                        icon={faChevronLeft} 
                        size="sm" 
                        color="white" 
                        className="icon"
                    />
                </div>
                <div className="related-posts-inner-wrapper">
                    {renderRelatedPostsSlider()}
                </div>
                <div className="related-posts-arrow-right" onClick={nextSlide}>
                    <FontAwesomeIcon 
                        icon={faChevronRight} 
                        size="sm" 
                        color="white" 
                        className="icon"
                    />
                </div>
                {/* {console.log(state)} */}
            </div>
        </div>
    );
}

export default connect(
    (state) => {
        return {
            // relatedPosts: Selectors.getRelatedPostsState(state),
        };
    },
    (dispatch) => {
        return {
            startInitRelatedPosts: bindActionCreators(Actions.startInitRelatedPosts, dispatch),
            addRelatedPostsElement: bindActionCreators(Actions.addRelatedPostsElement, dispatch),
            openGallery: bindActionCreators(Actions.openGallery, dispatch),
        };
    }
)(withRouter(RelatedPostsSlider));
 