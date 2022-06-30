import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addtofav, commentproduct, oneproduct, ratingproduct } from '../../../https/axios'
import Header from '../../Header/Header'
import { toast } from 'react-toastify'
import loadinggif from "../../../images/threedotsloading.gif"
import style from '../SingleProduct/SingleProduct.module.css'
import vegimg from '../../../images/veg.png'
import nonvegimg from '../../../images/nonveg.png'

export default function SingleProduct() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [count, setCount] = useState(1)
    // const [remount, setRemount] = useState(1)
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(1)
    const [commenttext, setCommenttext] = useState('')

    useEffect(() => {
        async function fetchData() {
            const product = await oneproduct(id)
            setData(product.data.productinfo)
            setLoading(false)
        }
        fetchData()
    }, [id])

    // console.log(data)

    const addtocardid = async (id) => {
        const cart = await addtofav(id, { count });
        if (count > 0) {
            toast("Product Added To Cart", { theme: "dark", type: "success" })
        }
    }

    const decrement = (e) => {
        if (e > 1) {
            setCount(parseInt(e) - parseInt(1))
        }
    }

    const increment = (e) => {
        setCount(parseInt(e) + parseInt(1))
    }

    const changerating = async (rate) => {
        const ratepr = await ratingproduct(id, { rate })
    }

    const comment = async () => {
        const textdata = await commentproduct(id, { commenttext })
        // console.log(Boolean(cmt))
        if (textdata) {
            setCommenttext('')
        }
    }

    return (
        <div>
            <Header />
            {
                loading === false ?
                    <div className='container my-5'>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <img src={`http://localhost:5000/${data.img}`} className={`${style.imgfluid} sm-w-75`} alt="..." />
                                </div>
                                <div className="col-md-6 d-flex align-self-center">
                                    <div className="card-body">
                                        <div className="row">
                                            <h3 className={`card-title col-md-6 col-sm-6 ${style.textcenter}`}>Restaurant</h3>
                                            <h3 className={`card-title col-md-6 col-sm-6 ${style.textcenter}`}>{data?.resname?.resname}</h3>
                                        </div>
                                        <hr className='mt-0' />
                                        <div className="row">
                                            <h4 className={`card-title col-md-6 col-sm-6 ${style.textcenter}`}>Item</h4>
                                            <h4 className={`card-title col-md-6 col-sm-6 d-flex align-items-center ${style.textcenter}`}>{data.itemname}
                                                {
                                                    data.itemtype === 'Veg' ?
                                                        <img src={vegimg} className='mx-3' style={{ width: '31px' }}></img>
                                                        :
                                                        <img src={nonvegimg} className='mx-3' style={{ width: '32px' }}></img>
                                                }
                                            </h4>
                                        </div>
                                        <hr className='mt-0' />
                                        <div className="row">
                                            <p className={`card-text col-md-6 col-sm-6 ${style.textcenter}`}>Description</p>
                                            <p className={`card-text col-md-6 col-sm-6 ${style.textcenter}`}>{data.description}</p>
                                        </div>
                                        <hr className='mt-0' />
                                        <div className="row">
                                            <p className={`card-text col-md-6 col-sm-6 ${style.textcenter}`}>Price</p>
                                            <p className={`card-text col-md-6 col-sm-6 ${style.textcenter}`}>{data.price} ₹</p>
                                        </div>
                                        <hr className='mt-0' />
                                        <div className='row'>
                                            <div className={`col-md-6 col-sm-6 ${style.textcenter}`}>
                                                <button className='btn btn-primary' value={count} onClick={(e) => decrement(e.target.value)}>
                                                    -
                                                </button>
                                                <span className='mx-3'>{count}</span>
                                                <button className='btn btn-primary' value={count} onClick={(e) => increment(e.target.value)}>
                                                    +
                                                </button>
                                            </div>
                                            <div className={`col-md-6 col-sm-6 ${style.textcenter}`}>
                                                <button type="button" className="btn btn-primary" onClick={() => addtocardid(data._id)}>
                                                    AddToOrder
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row'>
                                            <div className={`col-md-6 col-sm-6 ${style.textcenter}`}>
                                                <h4>Rate This Product</h4>
                                                <fieldset className="rating">
                                                    <input type="radio" id="star1" name="rating" value={5} onClick={(e) => changerating(e.target.value)} /><label className="full" htmlFor="star1"></label>
                                                    <input type="radio" id="star2" name="rating" value={4} onClick={(e) => changerating(e.target.value)} /><label className="full" htmlFor="star2"></label>
                                                    <input type="radio" id="star3" name="rating" value={3} onClick={(e) => changerating(e.target.value)} /><label className="full" htmlFor="star3"></label>
                                                    <input type="radio" id="star4" name="rating" value={2} onClick={(e) => changerating(e.target.value)} /><label className="full" htmlFor="star4"></label>
                                                    <input type="radio" id="star5" name="rating" value={1} onClick={(e) => changerating(e.target.value)} /><label className="full" htmlFor="star5"></label>
                                                </fieldset>
                                            </div>
                                            <div className={`col-md-6 col-sm-6 ${style.textcenter}`}>
                                                <div className={`d-flex align-self-center ${style.commentbtn}`}>
                                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Comment
                                                    </button>
                                                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel">Comment</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="mb-3">
                                                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="message" value={commenttext} onChange={(e) => { setCommenttext(e.target.value) }}
                                                                        />
                                                                    </div>
                                                                    <div className='d-flex justify-content-end'>
                                                                        <button type="button" className="btn btn-primary" onClick={comment}>Save changes</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='d-flex justify-content-center'>
                        <img src={loadinggif} alt="not found" className='w-25' />
                    </div>
            }
        </div >
    )
}
