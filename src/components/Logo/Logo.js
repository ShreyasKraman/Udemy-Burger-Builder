import React from 'react';

import classes from './Logo.css';

import BurgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="Burger"/>
    </div>
);

export default logo;