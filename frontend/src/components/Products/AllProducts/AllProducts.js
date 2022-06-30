import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getcomment, products } from '../../../https/axios'
import style from '../AllProducts/AllProducts.module.css'
import loadinggif from "../../../images/threedotsloading.gif"
import ProductModal from '../ProductModal/ProductModal'
import vegimg from '../../../images/veg.png'
import nonvegimg from '../../../images/nonveg.png'

export default function AllProducts() {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [commentsdata, setCommentsdata] = useState('')
    const [productsItem, setProductsItem] = useState('')
    useEffect(async () => {
        const { data } = await products(id)
        setProductsItem(data.ProductsDetail)
        setLoading(false)
        // console.log(productsItem[0].rating[0].rate);
    }, [id])
    const [rate, setRate] = useState(0)


    const showcomment = async (e) => {
        const cmt = await getcomment(e)
        setCommentsdata(cmt.data.data[0].comment)
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
        <div>
            <div className="row d-flex justify-content-center">
                {
                    loading === false ? productsItem && productsItem.map((data) =>
                        data.block === false &&
                        <>
                            <div className={`card shadow-lg m-2 ${style.stycard}`} style={{ width: "18rem", borderRadius: "20px" }} key={data._id} >
                                <img src={`http://localhost:4000/${data.img}`} className={`pt-2 ${style.cardimg}`} alt="..." style={{ height: "12rem" }} />
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <h4 className={`${style.overflowset}`}>{data.itemname}</h4>
                                        <h5>{data.price}</h5>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <h5 className='mb-0'>Rating</h5>
                                        {data.rating[0] ? countRate(data.rating).toFixed(1) : 0}/5
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
                                        <Link to={`/singleproduct/${data._id}`} className={`${style.btncolor} btn  w-100 mx-2 rounded-pill`} >Detail</Link>
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
        </div>
    )
}
