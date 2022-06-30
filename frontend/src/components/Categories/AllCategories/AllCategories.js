import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CategoriesData } from '../../../https/axios'
import style from "../AllCategories/AllCategories.module.css"
import loadinggif from "../../../images/threedotsloading.gif"

export default function AllCategories() {
    const [catData, setCatData] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(async () => {
        const { data } = await CategoriesData()
        setCatData(data)
        console.log(data)
        setLoading(false)
    }, [])
    return (
        <div className='container'>
            <div className="row d-flex justify-content-center">
                {
                    loading === false ? catData && catData.map((data) =>
                        <div className="card bg-dark text-white mx-3 my-3 p-0" style={{ height: "200px", width: "300px" }}>
                            <img src="https://image.shutterstock.com/image-photo/gourmet-tasty-steak-burgers-ham-600w-316591013.jpg" className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <h5 className="card-title">{data}</h5>
                                <p className="card-text">{data.name}</p>
                                <p className="card-text">Last updated 3 mins ago</p>
                            </div>
                        </div>
                    )
                        :
                        <div className='d-flex justify-content-center'>
                            <img src={loadinggif} alt="not found" className='w-25' />
                        </div>
                }
            </div>
        </div>
    )
}
