import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { login, Registeruser, statecity } from "../../https/axios"
import style from "../RegisterUser/RegisterUser.module.css"
import { useDispatch } from "react-redux"
import { setdata } from '../../redux/Slice/userDataSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"


export default function RegisterUser() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [allstate, setAllState] = useState()

    useEffect(async () => {
        const data = await statecity();
        setAllState(data.data)
    }, [])
    console.log(allstate);

    const senddata = async () => {
        if (email && password && username && mobile && address) {
            if (password === confirmpassword && mobile.length == 10) {
                const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!email || regex.test(email) === false) {
                    toast.error('Email or MobileNo is Not Correct!', {
                        theme: "dark",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    const log = await Registeruser({ username, email, password, confirmpassword, mobile, address })
                    if (log) {
                        setEmail('')
                        setPassword('')
                        setUserName('')
                        setMobile('')
                        setAddress('')
                        setconfirmpassword('')
                        navigate('/')
                    }
                }
            }
        }
        else {
            navigate("/registeruser")
        }

    }

    // const validat = (values) => {
    //     const errors = {};
    //     const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    //     if (!values.email) {
    //         errors.email = "Email is Required"
    //     }
    //     if (!values.password) {
    //         errors.password = "password is Required"
    //     }
    //     if (!values.confirmpassword) {
    //         errors.confirmpassword = "confirmpassword is Required"
    //     }
    //     if (!values.address) {
    //         errors.address = "address is Required"
    //     }
    //     if (!values.mobile) {
    //         errors.mobile = "mobile is Required"
    //     }
    // }

    return (
        <>
            <section className={`h-100 ${style.gradientcustom}`}>
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className={`card shadow-2-strong text-light ${style.cardregistration} ${style.cardback}`} style={{ borderRadius: "15px" }}>
                                <div className="card-body pb-lg-0 pb-md-0 p-md-4 p-md-5">
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Create Account</h3>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="text" id="Name" className="form-control form-control-lg" value={username} onChange={e => { setUserName(e.target.value) }} required />
                                                    <label className="form-label">Name</label>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="email" id="emailAddress" className="form-control form-control-lg" value={email} onChange={e => { setEmail(e.target.value) }} required />
                                                    <label className="form-label">Email</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 d-flex align-items-center">

                                                <div className="form-outline datepicker w-100">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        id="password" value={password} onChange={e => { setPassword(e.target.value) }} required
                                                    />
                                                    <label className="form-label">Password</label>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline datepicker w-100">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        id="confirmpassword" value={confirmpassword} onChange={e => { setconfirmpassword(e.target.value) }} required
                                                    />
                                                    <label className="form-label">ConfirmPassword</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 mb-4 pb-2">

                                                {/* <select className="select form-control-lg">
                                                    <option value="1" disabled>Choose option</option>
                                                    <option value="2">Subject 1</option>
                                                    <option value="3">Subject 2</option>
                                                    <option value="4">Subject 3</option>
                                                </select>
                                                <label className="form-label select-label">Choose option</label> */}
                                                <div className="form-outline">
                                                    <input type="text" id="address" className="form-control form-control-lg" value={address} onChange={e => { setAddress(e.target.value) }} required />
                                                    <label className="form-label">Address</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <input type="tel" id="phoneNumber" className="form-control form-control-lg" value={mobile} onChange={e => { setMobile(e.target.value) }} required />
                                                    <label className="form-label">Phone Number</label>
                                                </div>



                                            </div>

                                        </div>

                                        <div className="row text-center">

                                            <div className="col-md-6 mb-4 pb-2">
                                                <Link className={`btn ${style.btnloginout}`} to="/Login">
                                                    SignIn
                                                </Link>
                                            </div>
                                            <div className="col-md-6 text-center">
                                                {/* <input className="btn btn-primary btn-lg" type="submit" value="Submit" /> */}
                                                <button type="submit" className={`btn ${style.btnloginout}`} onClick={senddata} >Create Account</button>
                                            </div>
                                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
