import React, { useEffect, useState } from 'react'
import style from "./Restaurant.module.css"
import api, { RestaurantData, searchrestaurant, statecity } from '../../https/axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import loadinggif from "../../images/threedotsloading.gif"

export default function AllRestaurant() {
    const [resData, setResData] = useState()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('')
    const navigate = useNavigate()

    const inputHandler = () => {
        async function fetchData() {
            const { data } = await searchrestaurant(name)
            setResData(data.result)
            setLoading(false)
        }
        fetchData()
    }

    const inputHandl = async (name) => {
        const { data } = await searchrestaurant(name)
        setResData(data.result)
        setLoading(false)
    }

    useEffect(() => {
        async function fetchCity() {
            const city = await statecity();
            setCity(city.data)
        }
        fetchCity()
    }, [])

    useEffect(async () => {
        const { data } = await RestaurantData()
        setResData(data)
        setLoading(false)
    }, [])

    return (
        <div className='container'>
            <div className="search d-flex justify-content-around my-5">
                {/* <div>
                    <select className="form-select" aria-label="Default select example">
                        <option value="Default">Select City</option>
                        {
                            city && city.map((info) =>
                                <option key={info._id} onClick={() => inputHandl(setCity(info.city))} >{info.city}</option>
                            )
                        }
                    </select>
                </div> */}
                <div>
                    <input
                        id="outlined-basic"
                        value={name}
                        onChange={e => { setName(e.target.value) }}
                        variant="outlined"
                        label="Search"
                    />
                    <button className='btn btn-warning mx-3' onClick={inputHandler}>Search</button>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                {
                    loading === false ? resData && resData.map((data) =>
                        <Link to={`/restaurantdetail/${data._id}`} className={`card shadow-lg m-2 ${style.stycard} ${style.cardborder}`} key={data._id}>
                            <img src={`http://localhost:5000/${data.img}`} className={`pt-2 ${style.cardimg}`} alt="..." />
                            <div className="card-body">
                                <div className='d-flex justify-content-start mb-1'>
                                    <p className='mb-0'>{data.city}</p>
                                </div>
                                <div className='d-flex justify-content-between mb-1'>
                                    <h4 className={`${style.overflowset}`}>{data.resname}</h4>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link className={`btn w-100 mx-2 rounded-pill p-1 ${style.cartbtn}`} to={`/restaurantdetail/${data._id}`}>More Detail</Link>
                                </div>
                            </div>
                        </Link>
                    )
                        :
                        <div className='d-flex justify-content-center'>
                            <img src={loadinggif} alt="not found" className='w-25' />
                        </div>
                }
            </div>
        </div >
    )
}
