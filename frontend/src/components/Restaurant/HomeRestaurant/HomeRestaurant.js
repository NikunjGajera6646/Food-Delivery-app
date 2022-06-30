import React, { useEffect, useState } from 'react'
import style from "./HomeRestaurant.module.css"
import { RestaurantData } from '../../../https/axios'
import { Link } from 'react-router-dom'
import loadinggif from "../../../images/threedotsloading.gif"

export default function HomeRestaurant() {
    const [resData, setResData] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data } = await RestaurantData()
            setResData(data)
            setLoading(false)
        }
        fetchData()
    }, [])
    return (
        <div className='container'>
            <div className="row d-flex justify-content-center">
                {
                    loading === false ? resData && resData.slice(0, 3).map((data) =>
                        <div className={`card shadow-lg m-2 ${style.stycard}`} style={{ width: "18rem", borderRadius: "15px" }} key={data._id}>
                            <img src={`http://localhost:5000/${data.img}`} className={`pt-2 ${style.cardimg}`} alt="..." />
                            <div className="card-body">
                                <div className='d-flex justify-content-start mb-1'>
                                    <p className='mb-0'>{data.city}</p>
                                </div>
                                <div className='d-flex justify-content-between mb-1'>
                                    <h5>{data.resname}</h5>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link className={`btn w-100 mx-2 rounded-pill p-1 ${style.cartbtn}`} to={`/restaurantdetail/${data._id}`}>More Detail</Link>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        <div className='d-flex justify-content-center'>
                            <img src={loadinggif} alt="not found" className='w-25' />
                        </div>
                }
                <div className='d-flex justify-content-center mt-5'>
                    <Link className={`${style.redirectlink} d-flex justify-content-center btn btn-warning text-light`} to="/allrestaurant">View All</Link>
                </div>
            </div>
        </div>
    )
}
