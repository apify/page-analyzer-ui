import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => (
    <Navbar fixed="top" className="Header">
        <NavbarBrand href="https://apify.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="152" height="40" viewBox="0 0 152 40">
                <g fill="none">
                    <path id="logo-text" fill="#FFF" d="M89.597 20.667H83.92v-7.622h5.679c2.098 0 3.8 1.707 3.8 3.811a3.806 3.806 0 0 1-3.802 3.811zM90.171 9H78.75v23h5.169v-7.288h6.25c4.328 0 7.836-3.517 7.836-7.856S94.498 9 90.17 9zm19.975 23h5.167v-8.157h9.335v-4.145h-9.335v-6.452h11.602V9h-16.77v23zm36.353-23l-5.635 9.46h-.133L135.364 9h-5.868l8.602 14.275V32h5.2v-8.758L152 9h-5.501zm-45.42 23h5.168V9h-5.168v23zm-39.81-8.792l3.2-9.428h.133l3.134 9.428h-6.468zM61.534 9L53 32h5.301l1.6-4.713h9.202l1.6 4.713h5.468L67.636 9h-6.101z"></path>
                    <path fill="#6CC04A" d="M5.309 4.755c-3.37.432-5.72 3.287-5.249 6.378L3.696 35 19 3 5.309 4.755z"></path>
                    <path fill="#00A7CE" d="M39.986 23.133L38.689 5.145c-.231-3.198-3.144-5.535-6.347-5.09L27 .794 38.765 27a5.503 5.503 0 0 0 1.22-3.867"></path>
                    <path fill="#FF9012" d="M9 39.965a5.942 5.942 0 0 0 2.913-.415L33 30.886 22.975 9 9 39.965z"></path>
                </g>
            </svg>
        </NavbarBrand>
        <h1>Page analyzer</h1>
    </Navbar>
);

export default Header
