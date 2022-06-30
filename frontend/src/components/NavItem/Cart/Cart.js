import React, { useEffect, useState } from 'react'
import { deletecart, fetchcart, loginuser, order, payments, updateUser } from '../../../https/axios'
import Header from '../../Header/Header'
import { toast } from 'react-toastify'
import style from '../Cart/Cart.module.css'
import StripeCheckout from "react-stripe-checkout"
import vegimg from '../../../images/veg.png'
import nonvegimg from '../../../images/nonveg.png'
import { Link } from 'react-router-dom'

export default function Cart() {
    const [ucart, setUcart] = useState()
    const [total, setTotal] = useState(0)
    const [remount, setRemount] = useState(1)
    const [mobile, setMobile] = useState()
    const [address, setAddress] = useState()
    const [dcharge, setDcharge] = useState(30)
    const [userInfo, setUserInfo] = useState('')
    const [PaymentType, setPaymentType] = useState('')
    const [totalamount, setTotalamount] = useState('')

    useEffect(async () => {
        const userdata = await loginuser()
        if (userdata) {
            setUserInfo(userdata.data)
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            const data = await fetchcart()
            if (data) {
                setUcart(data.data.cartdata)
            }
        }
        fetchData()
    }, [remount])

    useEffect(() => {
        if (ucart) {
            let totalPrice = 0
            for (let index = 0; index < ucart.length; index++) {
                var tprice = ucart[index].count * ucart[index].product.price
                totalPrice = totalPrice + tprice
                var tam = (tprice * 5) / 100
            }
            setTotalamount(tam + dcharge + tprice)
            setTotal(totalPrice)
        }
    }, [ucart])

    const removeitem = async (id) => {
        const cart = await deletecart(id);
        if (cart) {
            setUcart(cart.data.data)
            toast("Product Removed From Cart", { theme: "dark", type: "warning" })
        }
    }

    const sendData = async () => {
        window.alert("function called")
        const data = await updateUser({ mobile, address })
        for (let index = 0; index < ucart.length; index++) {
            let pid = ucart[index].product._id
            let uid = ucart[index].userId._id
            let rid = ucart[index].product.resname._id
            let quantity = ucart[index].count
            let cartid = ucart[index]._id
            const data = await order({ pid, rid, uid, quantity, cartid, PaymentType, totalamount })
        }
        toast("order placed successfully", { theme: "dark", type: "success" })
        setRemount(2)
    }

    const [product, setProduct] = useState({
        name: "React from foodzone",
        price: 10,
        productBy: "foodzone"
    })

    const makepayment = token => {
        const body = {
            token,
            product
        }
    }

    const selecttype = (e) => {
        console.log(e)
        setPaymentType(e)
    }

    async function handletoken(token, addresses) {
        // await sendData()
        var Paymentstatus = true;
        const data = await updateUser({ mobile, address })
        for (let index = 0; index < ucart.length; index++) {
            let pid = ucart[index].product._id
            let uid = ucart[index].userId._id
            let rid = ucart[index].product.resname._id
            let quantity = ucart[index].count
            let cartid = ucart[index]._id
            const data = await order({ pid, rid, uid, quantity, cartid, PaymentType, totalamount, Paymentstatus })
        }
        toast("order placed successfully", { theme: "dark", type: "success" })
        setRemount(2)
        console.log({ token, addresses })
        const pay = await payments({ token, ucart })
        // console.log("pay", pay)
        const { status } = pay.data
        console.log(status)
        // console.log('status', status)
        // if (status === 'success') {
        //     const data = await updateUser({ mobile, address })
        //     for (let index = 0; index < ucart.length; index++) {
        //         let pid = ucart[index].product._id
        //         let uid = ucart[index].userId._id
        //         let rid = ucart[index].product.resname._id
        //         let quantity = ucart[index].count
        //         let cartid = ucart[index]._id
        //         const data = await order({ pid, rid, uid, quantity, cartid, PaymentType, totalamount })
        //     }
        // }
        // else {
        //     toast("Something went wrong", { theme: "dark", type: "fail" })
        // }
    }

    return (
        <div>
            <Header />
            <div className={`row ${style.widthset}`}>
                {
                    ucart && ucart.length != 0 ?
                        <div>
                            <div className="row">
                                <div className="col-md-7 col-sm-12 flex-wrap">
                                    {
                                        ucart && ucart.map((data) =>
                                            <div className="bg-white m-1" style={{ width: "45rem" }}>
                                                <div className='row'>
                                                    <div className='col-md-2 col-sm-2'>
                                                        <img src={`http://localhost:5000/${data.product.img}`} className='rounded' alt="..." style={{ height: "5rem", width: "5rem" }} />
                                                    </div>
                                                    <div className='col-md-3 col-sm-3 d-flex align-self-center justify-content-center'>
                                                        <h5 className="card-title mb-0 overflow-hidden ">{data.product.resname.resname}</h5>
                                                    </div>
                                                    <div className='col-md-3 col-sm-3 text-center'>
                                                        <p className='fs-5 mb-0'>Item</p>
                                                        <p className='fs-5 mt-3 mb-0 overflow-hidden'>{data.product.itemname}</p>
                                                    </div>
                                                    <div className='col-md-1 col-sm-1 d-flex align-self-center'>
                                                        {
                                                            data.product.itemtype === 'Veg' ?
                                                                <img src={vegimg} style={{ width: '31px' }}></img>
                                                                :
                                                                <img src={nonvegimg} style={{ width: '32px' }}>
                                                                </img>
                                                        }
                                                    </div>
                                                    <div className='col-md-2 col-sm-3 text-center'>
                                                        <p className='fs-5 mb-0'>qty</p>
                                                        <p className='fs-5 mt-3 mb-0'>{data.count}</p>
                                                    </div>
                                                    <div className="col-md-1 col-sm-1 d-flex align-self-center">
                                                        <p className="btn fw-bold mb-0" onClick={() => { removeitem(data._id) }}>X</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='col-md-5 col-sm-12'>
                                    {total !== 0 &&
                                        <div className='container row'>
                                            <div className='col-md-12 col-sm-12'>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                User Information
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <div className='row'>
                                                                    <h6 className='col-md-4'>Name: </h6><span className='col-md-8'>{userInfo.username}</span>
                                                                </div>
                                                                <div className='row'>
                                                                    <h6 className='col-md-4'>Email: </h6><span className='col-md-8'>{userInfo.email}</span>
                                                                </div>
                                                                <div className='row'>
                                                                    <h6 className='col-md-4'>Contact no: </h6><span className='col-md-8'>{userInfo.mobile}</span>
                                                                </div>
                                                                <div className='row'>
                                                                    <h6 className='col-md-4'>Address: </h6><span className='col-md-8'>{userInfo.address}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingTwo">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                Change User Mobile No. and Address
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <input type="text" className="form-control my-1" id="contactno"
                                                                    placeholder="Enter Contact Number"
                                                                    value={mobile}
                                                                    onChange={(e) => { setMobile(e.target.value) }} />
                                                                <input type="text" className="form-control" id="address"
                                                                    placeholder="Enter Address"
                                                                    value={address}
                                                                    onChange={(e) => { setAddress(e.target.value) }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end h4 mt-5'>
                                                <div className="card" style={{ width: "18rem" }}>
                                                    <ul className="list-group list-group-flush">
                                                        <table className="table">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Tax</td>
                                                                    <td></td>
                                                                    <td>{total * 5 / 100} ₹</td>
                                                                </tr>
                                                                <tr>

                                                                    <td>Delivery Charge</td>
                                                                    <td></td>
                                                                    <td>{dcharge} ₹</td>
                                                                </tr>
                                                                <tr>

                                                                    <td>Grand Total</td>
                                                                    <td></td>
                                                                    <td>{totalamount} ₹</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='px-5 bg-white'>

                                                <div className="accordion-body">
                                                    <p className='text-center fw-bold'>Select One Method to process</p>
                                                    <div className="form-check d-flex justify-content-center">
                                                        <input className="form-check-input" type="radio" value="COD" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => selecttype(e.target.value)} />
                                                        <label className="form-check-label mx-1" htmlFor="flexRadioDefault1">
                                                            Cash on Delivery
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex justify-content-center flex-column">
                                                        <div className='d-flex justify-content-center'>
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Card" id="flexRadioDefault2" onChange={(e) => selecttype(e.target.value)} />
                                                            <label className="form-check-label mx-1" htmlFor="flexRadioDefault2" >
                                                                Credit and Debit card
                                                            </label>
                                                        </div>
                                                        <div className=''>
                                                            <div className='d-flex justify-content-center mt-3'><br />
                                                                {
                                                                    PaymentType == "Card" ?
                                                                        <StripeCheckout
                                                                            stripeKey="pk_test_51KnyReSDCz2BE6zEGFDOYqKPKf18HSROmrfRusyGyo2OzbUnisb4PmMiUFSjz6U6pt2tnhgBjyAlFRlQ59yQ6J8f000URcXVTc"
                                                                            token={handletoken}
                                                                            name="Buy React"
                                                                            amount={((total) + (total * 5 / 100) + (dcharge)) * 100}
                                                                            currency='inr'
                                                                            onClick={sendData}

                                                                        >
                                                                        </StripeCheckout>
                                                                        : <button className='btn btn-success' onClick={sendData}>Place Order</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className='d-flex justify-content-center mt-5'>
                            <Link className='btn btn-warning text-white m-4 p-2' to="/allproducts">
                                Lets Order Something
                            </Link>
                        </div>
                }
            </div>
        </div >
    )
}
