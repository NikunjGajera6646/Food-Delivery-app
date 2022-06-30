import React, { useEffect, useState } from 'react'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import AllRestaurant from '../../Restaurant/AllRestaurant'

export default function Restaurant() {
    return (
        <>
            <Header />
            <AllRestaurant />
            <Footer />
        </>
    )
}
