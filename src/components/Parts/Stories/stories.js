/**
* Libraries
*/

import React, {
    useState,
    useEffect
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import { 
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

/**
* Icons
*/

import { 
    faComments
} from '@fortawesome/free-regular-svg-icons';

/**
* Styles
*/

import './stories.scss';

/**
* Components
*/

import Button from '../../../library/Button/button';
// import * as Selectors from '../../../reducers/selectors';

/**
* Actions
*/

import * as Actions from '../../../actions';

/**
* Selectors
*/

import * as Selectors from '../../../reducers/selectors';

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
    Line1
} from '../../UtilityComponents';

/**
* Stories component definition and export
*/

export const Stories = (props) => {

    /**
    * State
    */

    /**
    * Methods
    */

    useEffect(() => {
        props.startInitStories("february20");
    }, [])

    const renderStoriesByMonth = () => {
        return(
            <>{props.stories.map((el, i) => {
                return(
                    <div key={i} className="stories-by-month">
                        <div className="stories-button">
                            <H4 className="h4-white-centered">{el.date.month}</H4>
                            <H4 className="h4-white-centered">{el.date.year}</H4>
                        </div>
                        <div className="stories-wrapper">

                        </div>
                    </div>
                )
            })}</>
        )
    }

    /**
    * Markup
    */

    return(
        <div className="stories">
            <div className="stories-icon">
                <EH1/>
                <FontAwesomeIcon icon={faComments} size="3x" color="rgb(63, 63, 63)"/>
                <EH1/>
                {renderStoriesByMonth()}
            </div>
            
        </div>
    );
}
 export default connect(
    (state) => {
        return {
            stories: Selectors.getStoriesState(state),
        };
    },
    (dispatch) => {
        return {
            startInitStories: bindActionCreators(Actions.startInitStories, dispatch),
        };
    }
)(Stories);
 