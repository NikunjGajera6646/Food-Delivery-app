import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allproduct, getcomment, searchproducts } from '../../../https/axios'
import Header from '../../Header/Header'
import style from "./AllProductsInfo.module.css"
import loadinggif from "../../../images/threedotsloading.gif"
import Footer from '../../Footer/Footer'
import ProductModal from '../../Products/ProductModal/ProductModal'
import vegimg from '../../../images/veg.png'
import nonvegimg from '../../../images/nonveg.png'

export default function Categories() {
    const [allProducts, setAllProducts] = useState()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true);
    const [commentsdata, setCommentsdata] = useState('')

    useEffect(async () => {
        const { data } = await allproduct()
        setAllProducts(data)
        setLoading(false)
    }, [])

    const inputHandler = () => {
        async function fetchData() {
            const { data } = await searchproducts(name)
            setAllProducts(data.result)
            setLoading(false)
        }
        fetchData()
    }

    const showcomment = async (e) => {
        const cmt = await getcomment(e)
        setCommentsdata(cmt.data.data[0].comment)
        // console.log(Boolean(cmt))
        // if (cmt == true) {
        //     setCommentsdata('')
        // }
    }

    const countRate = (rates) => {
        let total = 0
        let totalrate;
        rates.forEach(data => {
            total = total + data.rate
        })
        return (total / rates.length)
    }

    return (
        <>
            <Header />
            <div className={`${style.main} my-4`}>
                <div className="search">
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
            <div className={`row d-flex justify-content-center ${style.marginright}`}>
                {
                    loading === false ? allProducts && allProducts.map((data) =>
                        data.block === false &&
                        <>
                            <div className={`card shadow-lg m-2 ${style.stycard} ${style.cardborder}`} key={data._id} >
                                <img src={`http://localhost:5000/${data.img}`} className={`pt-2 ${style.cardimg}`} alt="..." style={{ height: "12rem" }} />
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        {/* <p className={`${style.overflowset}`}>{data.resname}</p> */}
                                        {/* <p >{data.price}</p> */}
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className={`${style.overflowset}`}>{data.itemname}</h4>
                                        <h5>{data.price}</h5>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <h5 className={`${style.overflowset} align-item-center mb-0`}>Rating</h5>
                                        <p className='mb-0'>{data.rating[0] ? countRate(data.rating).toFixed(1) : 0}/5</p>
                                        {
                                            data.itemtype === 'Veg' ?
                                                <img src={vegimg} style={{ width: '31px' }}></img>
                                                :
                                                <img src={nonvegimg} style={{ width: '35px' }}></img>
                                        }
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button type="button" className={`${style.btncolor} btn w-100 mx-2 rounded-pill`} data-bs-toggle="modal" data-bs-target={`#product_${data._id}`} onClick={() => showcomment(data._id)}>
                                            Review
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/singleproduct/${data._id}`} className={`${style.btncolor} btn w-100 mx-2 rounded-pill`} >Detail</Link>
                                    </div>
                                </div>
                            </div>
                            <ProductModal id1={`product_${data._id}`} comments={data.comment} />
                        </>
                    ) :
                        <div className='d-flex justify-content-center'>
                            <img src={loadinggif} alt="not found" className='w-25' />
                        </div>
                }
            </div >
            <Footer />
        </>
    )
}
