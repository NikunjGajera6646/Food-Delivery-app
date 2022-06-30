import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../../../https/axios'
import Header from '../../../Header/Header'
import style from '../EditProfile/EditProfile.module.css'


export default function EditProfile() {
    const [mobile, setMobile] = useState()
    const [address, setAddress] = useState()
    const [username, setUserName] = useState()
    const navigate = useNavigate()
    const updateuser = async () => {
        const data = await updateUser({ mobile, address, username })
        if (data) {
            navigate("/profile")
        }
    }

    return (
        <>
            <Header />
            <div className={`container ${style.empprofile}`}>

                <div className="mt-2">
                    <div className="row m-0">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className={`${style.cardheader} card-header p-0 position-relative mx-3 z-index-2`}>
                                    <div className={`shadow-primary ${style.cardheaderback} p-3`}>
                                        <h5 className="text-white text-capitalize text-center ps-3">Edit Profile</h5>
                                    </div>
                                </div>

                                <div encType="multipart/form-data">
                                    <div className="m-3 ps-4 text-dark">
                                        <div className="row mt-2">
                                            <div className='col-md-5'>
                                                <label htmlFor="text" className="">UserName:</label>
                                                <input type="text" className="form-control" id="username" placeholder="Enter Name" value={username} onChange={(e) => { setUserName(e.target.value) }} />
                                            </div>
                                            <div className="col-md-5">
                                                <label htmlFor="text" className="">Contact No:</label>
                                                <input type="text" className="form-control" id="contactno"
                                                    placeholder="Enter Contact Number"
                                                    value={mobile}
                                                    onChange={(e) => { setMobile(e.target.value) }} />
                                            </div>
                                        </div>
                                        {/* <div className="row d-flex mt-2">
                                            <div className="col-md-5">
                                                <label htmlFor="inputState">State</label>
                                                <select id="state" className="form-control" name="state">
                                                    <option selected>Gujarat</option>
                                                    <option>Maharashtra</option>
                                                    <option>Panjab</option>
                                                    <option>Kerela</option>
                                                    <option>Goa</option>
                                                </select>
                                            </div>
                                            <div className="col-md-5">
                                                <label htmlFor="inputCity">City</label>
                                                <input type="text" className="form-control" id="city" placeholder="Enter City" />
                                            </div>
                                        </div> */}
                                        <div className="row d-flex mt-2">
                                            <div className="col-md-5 mt-2">
                                                <label htmlFor="inputAddress2">Address: </label>
                                                <input type="text" className="form-control" id="address"
                                                    placeholder="Enter Address"
                                                    value={address}
                                                    onChange={(e) => { setAddress(e.target.value) }}
                                                />
                                            </div>

                                        </div>

                                        <button type="submit" className="btn btn-danger mt-4" style={{ backgroundColor: "red" }} onClick={updateuser}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
