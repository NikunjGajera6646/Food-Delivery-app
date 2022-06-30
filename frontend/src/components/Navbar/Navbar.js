import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from "../Navbar/Navbar.module.css"

export default function Navbar() {
    const location = useLocation()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0 my-1">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${style.navitem}`} id="navbarNavAltMarkup">
                        <div className="navbar-nav d-flex justify-content-center">
                            <Link className={`nav-link mx-3 ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/" >Home</Link>
                            <Link className={`nav-link mx-3 ${location.pathname === "/allproducts" ? "active" : ""}`} to="/allproducts">Products</Link>
                            <Link className={`nav-link mx-3 ${location.pathname === "/allrestaurant" ? "active" : ""}`} to="/allrestaurant">Restaurant</Link>
                            <Link className={`nav-link mx-3 ${location.pathname === "/contactus" ? "active" : ""}`} to="/contactus">Contact Us</Link>
                            <Link className={`nav-link mx-3 ${location.pathname === "/aboutus" ? "active" : ""}`} to="/aboutus">About Us</Link>
                            <Link className={`nav-link mx-3 ${location.pathname === "/cart" ? "active" : ""}`} to="/cart">Cart</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
