import React, { useEffect, useState } from 'react'
import { ordercancel, status } from '../../https/axios'
import '../OrderStatus/OrdersStatus.css'
import Header from '../Header/Header'
import moment from 'moment'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function OrderStatus() {
    const [orderstrack, setOrderstrack] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const data = await status()
            setOrderstrack(data.data.ordersdata)
            console.log(data.data.ordersdata);
        }
        fetchData()
    }, [])

    const cancelorder = async (id) => {
        const oc = await ordercancel(id)
        if (oc) {
            navigate('/ordertrack')
        }
    }

    return (
        <div>
            <Header />
            <div className='container'>
                {
                    orderstrack && orderstrack.map((data) =>
                        data.cancel === false && data.pending === true ?
                            <div className="card" style={{ width: "18rem" }}>
                                <ul className="list-group list-group-flush">
                                    <div className='d-flex justify-content-between mx-2 mt-2'>
                                        <p>Restaurant</p>
                                        <p>{data.pid.resname.resname}</p>
                                    </div>
                                    <div className='d-flex justify-content-between mx-2'>
                                        <p>item</p>
                                        <p>{data.pid.itemname}</p>
                                    </div>
                                    <div className='d-flex justify-content-between mx-2'>
                                        <p>qty</p>
                                        <p>{data.quantity}</p>
                                    </div>
                                    <div className='d-flex justify-content-between mx-2'>
                                        <p>PaymentStatus</p>
                                        <p>{data.Paymentstatus.toString()}</p>
                                    </div>

                                </ul>
                                <div className='mx-2'>
                                    <p>Delivery Address: </p>
                                    <p>{data.uid.address}</p>
                                </div>
                                {
                                    data.Paymentstatus === false ?
                                        <div className="card-footer text-end">
                                            <p className='btn mb-0' onClick={() => { cancelorder(data._id) }}>cancel</p>
                                        </div>
                                        :
                                        <p></p>
                                }
                            </div>
                            :
                            data.cancel === false && data.pending === false && data.delivered === false &&
                            <div className='row'>
                                <div className="card col-md-4" style={{ width: "18rem" }}>
                                    <ul className="list-group list-group-flush">
                                        <div className='d-flex justify-content-between mx-2 mt-2'>
                                            <p>Restaurant</p>
                                            <p>{data.pid.resname.resname}</p>
                                        </div>
                                        <div className='d-flex justify-content-between mx-2'>
                                            <p>item</p>
                                            <p>{data.pid.itemname}</p>
                                        </div>
                                        <div className='d-flex justify-content-between mx-2'>
                                            <p>Quantity</p>
                                            <p>{data.quantity}</p>
                                        </div>
                                        <div className='d-flex justify-content-between mx-2'>
                                            <p>TotalAmount</p>
                                            <p>{data.totalamount}</p>
                                        </div>
                                        <hr className='m-1' />
                                        <div className='d-flex justify-content-between mx-2 my-1'>
                                            <p className='mb-0'>Ordered By: </p>
                                            <p className='mb-0'>{data.uid.username}</p>
                                        </div>
                                        <hr className='m-1' />
                                        <div className='mx-2'>
                                            <p>Delivery Address: </p>
                                            <p>{data.uid.address}</p>
                                        </div>
                                    </ul>
                                </div>
                                <div className="col-md-8 bg-white">
                                    <div className='d-flex pt-2 text-center'>
                                        <p>Date:</p>
                                        <p className='px-2'>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    </div>
                                    <div className="col-lg-12 col-md-10 hh-grayBox pt45 pb20 bg-white">
                                        <div className={`row justify-content-between ${data.pending === false ? 'completed' : ''} `}>
                                            <div className="order-tracking completed">
                                                <span className="is-complete"></span>
                                                <p>Accepted<br /><span></span></p>
                                            </div>
                                            <div className={`order-tracking ${data.process === true ? 'completed' : ''} `}>
                                                <span className="is-complete"></span>
                                                <p>InProcess<br /><span></span></p>
                                            </div>
                                            <div className={`order-tracking ${data.dispatch === true ? 'completed' : ''} `}>
                                                <span className="is-complete"></span>
                                                <p>Dispatch<br /><span></span></p>
                                            </div>
                                            <div className={`order-tracking ${data.delivered === true ? 'completed' : ''} `}>
                                                <span className="is-complete"></span>
                                                <p>Delivered<br /><span></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                }
            </div>
        </div >
    )
}
