import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginuser } from '../../../https/axios'
import Header from '../../Header/Header'
import style from '../UserProfile/UserProfile.module.css'


export default function UserProfile() {
    const [userInfo, setUserInfo] = useState('')
    useEffect(async () => {
        const userdata = await loginuser()
        if (userdata) {
            setUserInfo(userdata.data)
        }
    }, [])
    return (
        <>
            <Header />
            <div className={`container ${style.empprofile}`}>
                <div>
                    <div className="mt-2">
                        <div className="row m-0">
                            <div className="col-12">
                                <div className="card my-4">
                                    <div className={`${style.cardheader} card-header p-0 position-relative mx-3 z-index-2`}>
                                        <div className={`shadow-primary ${style.cardheaderback} p-3`}>
                                            <h5 className="text-white text-capitalize text-center ps-3">My profile</h5>
                                        </div>
                                    </div>

                                    <div encType="multipart/form-data">
                                        <div className="m-3 ps-4 text-dark">
                                            <div className="row my-3">
                                                <div className={`${style.formtext} col-md-3 col-lg-2`}>
                                                    <label htmlFor="text" className="text-center">Name:</label>
                                                </div>
                                                <div className='col-md-9 col-lg-10'>
                                                    <p className='form-control mb-0'>{userInfo.username}</p>
                                                </div>
                                            </div>
                                            <div className="row my-3">
                                                <div className={`${style.formtext} col-md-3 col-lg-2`}>
                                                    <label htmlFor="text" className="align-item-center text-center">Email:</label>
                                                </div>
                                                <div className='col-md-9 col-lg-10'>
                                                    <p className='form-control mb-0'>{userInfo.email}</p>
                                                </div>
                                            </div>
                                            <div className="row my-3">
                                                <div className={`${style.formtext} col-md-3 col-lg-2`}>
                                                    <label htmlFor="text" className="align-item-center text-center">Contact No:</label>
                                                </div>
                                                <div className='col-md-9 col-lg-10'>
                                                    <p className='form-control mb-0'>{userInfo.mobile}</p>
                                                </div>
                                            </div>
                                            <div className="row my-3">
                                                <div className={`${style.formtext} col-md-3 col-lg-2`}>
                                                    <label htmlFor="text" className="align-item-center text-center">Address:</label>
                                                </div>
                                                <div className='col-md-9 col-lg-10'>
                                                    <p className='form-control mb-0'>{userInfo.address}</p>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <Link type="submit" to='/editprofile' className="mt-4 text-end" >Edit Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div >
        </>
    )
}
