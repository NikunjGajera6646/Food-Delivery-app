import React from 'react'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import style from "./AboutUs.module.css"

export default function AboutUs() {
    return (
        <>
            <Header />
            <div className='container'>
                <div className={` ${style.aboutsection}`}>
                    <h1>About Us</h1>
                    <h5>When we say good, we don’t just mean good food. We also mean the goodness that good food leads to. Good memories, a good temper, a good day, a good burp. And we know that when our food leaves our kitchens, we’re creating all that. It’s rewarding, this belief in good. Now take a look at how we go about it.</h5>
                </div>

                <h1 className='text-center m-5'>Our Team</h1>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMT4ijByacF8zGtjnKrVqDyJdtoK1PNRD8jA&usqp=CAU" alt="..." className="rounded-circle w-50 m-auto mt-3" />
                            <div className="card-body">
                                <h5 className="card-title text-center">Parth Gangani</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMT4ijByacF8zGtjnKrVqDyJdtoK1PNRD8jA&usqp=CAU" className="rounded-circle w-50 m-auto mt-3" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title text-center">Bhargav Korat</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMT4ijByacF8zGtjnKrVqDyJdtoK1PNRD8jA&usqp=CAU" className="rounded-circle w-50 m-auto mt-3" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">Ashish Harsoda</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMT4ijByacF8zGtjnKrVqDyJdtoK1PNRD8jA&usqp=CAU" className="rounded-circle w-50 m-auto mt-3" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">Pratham Lad</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}
