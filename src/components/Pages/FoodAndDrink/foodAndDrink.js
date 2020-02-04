/**
* Libraries
*/

import React, {
    useEffect
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

/**
* Styles
*/

import './foodAndDrink.scss';

/**
* Components
*/

import Toolbar from '../../Parts/Toolbar/toolbar';
import MenuFood from '../../Parts/MenuFood/menuFood';
import Reservations from '../../Parts/Reservations/reservations';
import Advantages from '../../Parts/Advantages/advantages';
import Footer from '../../Parts/Footer/footer';

/**
* Actions
*/

// import * as Actions from '../../../actions';

/**
* Selectors
*/

// import * as Selectors from '../../../reducers/selectors';

/**
* Images
*/

import Background from '../../../images/700_FO36064926_7b9fb5c531d9ef758ada11137a039fa4.jpg';

/**
* Utility
*/

import {
    H1,
    H2,
    H3,
    H4,
    H5,
    EH1,
    EH2,
    EW1,
    Line1,
    Line2
} from '../../UtilityComponents';

/**
* FoodAndDrink component definition and export
*/

export const FoodAndDrink = (props) => {

    /**
    * Methods
    */

    /**
    * Markup
    */

    return(
        <>
            <div className="food-and-drink-cover-wrapper">
                <div className="food-and-drink-wrapper-backgroud-div"/>
            </div>
            <div className="food-and-drink-header-text">
                <H1 center>FOOD & DRINK</H1>
                <EH1/>
                <Line2/>
                <EH1/>
                <H3 center>TENDER STEAKS, TASTY BURGERS AND LIGHT BITES. WASH IT DOWN WITH A COFFEE OR A BEER.</H3>
            </div>
            <div className="food-and-drink-wrapper">
                <MenuFood/>
                <Reservations/>
                <Advantages/>
                <Footer/>
            </div>
        </>
    );
}

export default connect(
    (state) => {
        return {
            // feedback: Selectors.getFeedbackState(state),
            // dots: Selectors.getDotsState(state)
        };
    },
    (dispatch) => {
        return {
            // startChangingFeedbacks: bindActionCreators(Actions.startChangingFeedbacks, dispatch),
            // stopChangingFeedbacks: bindActionCreators(Actions.stopChangingFeedbacks, dispatch)
        };
    }
)(FoodAndDrink);
 