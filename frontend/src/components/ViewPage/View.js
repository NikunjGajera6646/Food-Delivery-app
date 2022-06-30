import React from 'react'
import style from "../ViewPage/View.module.css"
import asdas from "../../images/asdas.png"
import food from "../../images/food.png"
import quotation from "../../images/quotation.png"
import ghgf from "../../images/ghgf.png"
import { Link } from 'react-router-dom'
import HomeRestaurant from '../Restaurant/HomeRestaurant/HomeRestaurant'
import HomeProducts from '../Products/HomeProducts/HomeProducts'
import Footer from '../Footer/Footer'

export default function View() {
    return (
        <>
            <div className='container-sm'>
                <div className="row">
                    <div className={`col-md-6 ${style.displayImg}`}>
                        <img src={food} alt="" className='img-fluid' />
                    </div>
                    <div className="col-md-6 d-flex">
                        <div className="align-self-center flex-column">
                            <section>
                                <h2 className='m-4'>
                                    Wel-come to <br /> FoodZone
                                </h2>
                                <p className='m-4 fw-bold'>
                                    For us, it's not just about bringing you good food from your favourite restaurants. It's about making a connection, which is why we sit down with the chefs, dreaming up menus that will arrive fresh and full of flavour. Try us!
                                </p>
                                <Link className='btn btn-warning text-white m-4' to="/allproducts">
                                    Lets Eat
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
                <h2 className='m-5 text-center'><span className={` ${style.textdec}`}>About</span> Us</h2>
                <div className="row">
                    <div className={`col-md-6 d-flex`}>
                        <div className='align-self-center flex-column'>
                            <section>
                                <h3 className={`m-4 ${style.headingtag}`}>
                                    Who we are ?
                                </h3>
                                <p className={`m-4 ${style.headingtag} fw-bold`}>
                                    Our technology platform connects customers and restaurant partners serving their multiple needs. Customers use our platform to search and discover restaurants, read and write customer generated reviews and Restaurants are connected with us for growing thier bussiness
                                </p>
                            </section>
                            <section>
                                <h3 className={`m-4 ${style.headingtag}`}>
                                    What we are doing ?
                                </h3>
                                <p className={`m-4 ${style.headingtag} fw-bold`}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book printer too
                                </p>
                            </section>
                        </div>
                    </div>
                    <div className={`col-md-6 ${style.displayImg}`}>
                        <img src={asdas} className="img-fluid" alt="" />
                    </div>
                </div>
                <h2 className='m-5 text-center'>Top <span className={` ${style.textdec}`} >Products</span></h2>
                <div className="row d-flex justify-content-center">
                    <HomeProducts />
                </div>
                <h2 className='m-5 text-center'><span className={` ${style.textdec}`} >Testim</span>onial</h2>
                <div className="row mb-5">
                    <div className={`card ${style.reviewcard}`}>
                        <div className="card-body">
                            <div className="card-title d-flex justify-content-between">
                                <div className='d-flex align-item-center'>
                                    <img src="https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE=" className='rounded-circle' alt="" style={{ width: "7rem" }} />
                                    <div className='d-flex flex-column align-item-center  justify-content-center mx-3'>
                                        <h3>Mr. John Deo</h3>
                                        <p className='mb-0'>CEO ,Abc infotech</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={quotation} className={`${style.quatimg}`} alt="" />
                                </div>
                            </div>
                            <p className="card-text mt-4 fw-bold ">I just wanted to say that I have fallen IN LOVE with your foods. I have sacrificed good wholesome food to “treat” myself and fulfill my hunger in the past, but i have found such satisfaction with awesome foods products, that i no longer need to eat the junk. I was just having my carrot sticks paired with my two faves- sprouted hummus and better than turkey salad, and had to tell you how much i enjoy this stuff. It really is so good! i have never been so satisfied by raw roods. my husband agrees! as a busy mom who not always has time to dedicate to preparing healthy food for myself, I appreciate you! keep making great products.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-md-6 ${style.displayImg}`}>
                        <img src={ghgf} alt="" className='img-fluid' />
                    </div>
                    <div className="col-md-6 d-flex">
                        <div className='align-self-center flex-column'>
                            <section>
                                <h2 className='m-4'>
                                    Our Food Delivey Service
                                </h2>
                                <p className='m-4 fw-bold'>
                                    As in any industry, technology can be embraced to improve business practices. Food Delivery is no different. Decision makers in this sector need new solutions that allow them to be more efficient at delivering on time, or handling customers’ expectations if delays occur.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
                <h2 className='m-5 text-center'><span className={` ${style.textdec}`} >Top</span> Restaurant</h2>
                <HomeRestaurant />
            </div>
            <Footer />
        </>
    )
}
