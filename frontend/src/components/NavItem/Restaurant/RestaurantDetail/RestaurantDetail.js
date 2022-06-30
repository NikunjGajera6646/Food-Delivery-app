import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { addtocart, addtofav, products, SingleRestaurantData } from '../../../../https/axios';
import Navbar from "../../../Navbar/Navbar"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../../../redux/Slice/counterSlice'
import style from "../RestaurantDetail/RestaurantDetail.module.css"
import HomeProducts from '../../../Products/HomeProducts/HomeProducts';
import AllProducts from '../../../Products/AllProducts/AllProducts';
import loadinggif from "../../../../images/threedotsloading.gif"


export default function RestaurantDetail() {
    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [singleRes, setSingleRes] = useState('')
    const [productsItem, setProductsItem] = useState('')
    const [count, setCount] = useState(3)
    const [loading, setLoading] = useState(true);
    const item = 0

    useEffect(async () => {
        const { data } = await SingleRestaurantData(id)
        setSingleRes(data)
        setLoading(false)
    }, [id])

    useEffect(async () => {
        const { data } = await products(id)
        setProductsItem(data.ProductsDetail)
    }, [id])

    return (
        <div>
            <Navbar />
            <div className="container-lg p-0">
                {
                    loading == false ?
                        <div>
                            <div className="card my-4 p-0">
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <img src={`http://localhost:5000/${singleRes.img}`} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className={`col-md-7 d-flex ${style.borderinfocard}`}>
                                        <div className={`card-body align-self-center text-center ${style.borderinfocardsecond}`}>
                                            <h1 className="card-title">{singleRes.resname}</h1>
                                            <h4 className="card-text">{singleRes.address}</h4>
                                            <h4 className="card-text">{singleRes.contactno}</h4>
                                            <h4 className="card-text">{singleRes.email}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="card text-center p-0">
                                    <div className="card-header">
                                        <ul className=" nav-tabs card-header-tabs" style={{ listStyleType: "none" }}>
                                            <li className="nav-item">
                                                <p className="nav-link text-center" aria-current="true">Foods</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <AllProducts />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='d-flex justify-content-center'>
                            <img src={loadinggif} alt="not found" className='w-25' />
                        </div>
                }
            </div>
        </div >
    )
}
