import React, { useState } from 'react'
import { contactus } from '../../../https/axios'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import style from '../ContactUs/ContactUs.module.css'

export default function ContactUs() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [message, setMessage] = useState('')
    const submitdata = async () => {
        const contact = await contactus({ name, email, mobile, message })
        if (contact) {
            setName('')
            setEmail('')
            setMobile('')
            setMessage('')
        }
    }
    return (
        <>
            <Header />
            <div className={`container ${style.empprofile}`}>
                <div className="row">
                    <div className='col-md-12 col-lg-5' >
                        <div className=' d-flex m-5 card'>
                            {/* <h5 for="text" className="text-center ms-3">Contact Now</h5> */}
                            <div className={`${style.cardheader} card-header p-0 position-relative mx-3 z-index-2`}>
                                <div className={`shadow-primary ${style.cardheaderback} p-3`}>
                                    <h5 className="text-white text-capitalize text-center ps-3">Contact Now</h5>
                                </div>
                            </div>

                            <div className="form-row ">
                                <div className="form-group m-3 d-flex ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt ms-2 mt-1 col-md-2" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    <p>
                                        A-555,Ambika pinekal,mota varachha, surat-394101
                                    </p>
                                </div>
                                <hr />
                                <div className='form-group m-3 d-flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill ms-2 mt-1 col-md-2" viewBox="0 0 16 16">
                                        <path fill="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                    <p>
                                        +917200072000
                                    </p>
                                </div>
                                <hr />
                                <div className='form-group m-3 d-flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill ms-2 mt-1 col-md-2" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg>
                                    <p>foodzone@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div encType="multipart/form-data">
                            {/* <div className="m-3 ps-4 text-dark">
                                            <div className="form-row d-flex">
                                                <div className="form-group ">
                                                    <label for="text" className="">contactno:</label>
                                                    <input type="text" className="form-control" id="contactno"
                                                        placeholder="Enter contact no" name="contactno" />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-danger mt-4" style={{ backgroundColor: "red" }}>Update</button>
                                        </div> */}
                        </div>
                    </div>
                    <div className="mt-4 col-md-12 col-lg-7">
                        <div className="">
                            <div className="card my-4">
                                <div className={`${style.cardheader} card-header p-0 position-relative mx-3 z-index-2`}>
                                    <div className={`shadow-primary ${style.cardheaderback} p-3`}>
                                        <h5 className="text-white text-capitalize text-center ps-3">ContactUs</h5>
                                    </div>
                                </div>
                                <div className="m-3 px-4 text-dark">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="">Name:</label>
                                            <input type="text" className="form-control" id="name"
                                                placeholder="Enter full name" value={name} onChange={e => { setName(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-6 col-12 mt-2">
                                            <label>Email: </label>
                                            <input type="text" className="form-control" id="email"
                                                placeholder="Enter email" value={email} onChange={e => { setEmail(e.target.value) }} />
                                        </div>
                                        <div className="col-md-12 col-lg-6 col-12 mt-2">
                                            <label className="">Moblie No:</label>
                                            <input type="text" className="form-control" id="contactno"
                                                placeholder="Enter contact no" value={mobile} onChange={e => { setMobile(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            <label className="">Message:</label>
                                            <input type="text" className="form-control" id="message"
                                                placeholder="Enter Message" value={message} onChange={e => { setMessage(e.target.value) }} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-danger mt-4" style={{ backgroundColor: "red" }} onClick={submitdata}>submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
