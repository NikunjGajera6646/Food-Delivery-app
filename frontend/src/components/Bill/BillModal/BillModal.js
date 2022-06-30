import React, { useState } from 'react'
import style from '../BillModal/BillModal.module.css'
import moment from 'moment'
import Pdf from 'react-to-pdf'

const BillModal = ({ id1, bill }) => {
    const [dcharge, setDcharge] = useState(30)
    const ref = React.createRef();
    return (
        <div className="modal fade" id={id1} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{bill._id}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" >
                        <div id={`${style.invoice_holder}`}>
                            <div id={`${style.invoice}`} className={`${style.effect2}`} ref={ref}>

                                <div id={`${style.invoice_top}`}>
                                    <div className={`${style.logo} fs-4`}>{bill.pid.resname.resname}</div>
                                    <div className={`${style.title}`}>
                                        <h1 className={`${style.h1}`}>Invoice :<span className={`${style.invoiceVal} ${style.invoice_num}`}>{bill._id}</span></h1>
                                        <p className={`${style.p}`}>Invoice Date: <span className='p-0' id="invoice_date">{moment(bill.createdAt).format('Do MMM YYYY')}</span></p>
                                    </div>
                                </div>
                                <div id={`${style.invoice_mid}`}>
                                    <div id={`${style.message}`}>
                                        <h2 className='h2'>Hello {bill.uid.username},</h2>
                                        <p className={`${style.p}`}>An invoice with invoice number #<span className='p-0' id="invoice_num">{bill._id}</span> is created for <span className='fw-bold' id="supplier_name">{bill.pid.resname.resname}</span></p>
                                    </div>
                                    <hr/>
                                    <div className={`${style.ctagroup} ${style.mobilebtngroup}`}>
                                        <a className={`${style.a} ${style.btnprimary}`} href="#">Approve</a>
                                        <a className={`${style.a} ${style.btndefault}`} href="#">Reject</a>
                                    </div>
                                    <div className={`${style.clearfix}`}>
                                        <div className={`${style.colleft}`}>
                                            <div className={`${style.clientlogo}`}>
                                                <img src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png" alt="Sup" />
                                            </div>
                                            <div className={`${style.clientinfo}`}>
                                                <h2 className={`${style.h2}`} id={`${style.supplier}`}>{bill.pid.resname.resname}</h2>
                                                <p className={`${style.p}`}><span>Delivered To:-</span><br /><span id="address">{bill.pid.resname.address}</span><br /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id={`${style.invoice_bot}`}>
                                    <div id={`${style.table}`}>
                                        <table className={`${style.tablemain}`}>
                                            <thead>
                                                <tr className={`${style.tabletitle}`}>
                                                    <th className='text-center'>ItemName</th>
                                                    <th className='text-center'>Payment Method</th>
                                                    <th className='text-center'>Quantity</th>
                                                    <th className='text-center'>Unit Price</th>
                                                    <th className='text-center'>Taxable Amount</th>
                                                    {/* <th>Tax Code</th> */}
                                                    <th className='text-center'>Delivery Charge</th>
                                                    <th className='text-center'>Total</th>
                                                </tr>
                                            </thead>
                                            <tr className={`${style.listitem}`}>
                                                <td data-label="Type" className={`${style.listitem}`}>{bill.pid.itemname}</td>
                                                <td data-label="Description" className={`${style.listitem} text-center`}>{bill.PaymentType}</td>
                                                <td data-label="Quantity" className={`${style.listitem}`}>{bill.quantity}</td>
                                                <td data-label="Unit Price" className={`${style.listitem}`}>{bill.pid.price}</td>
                                                <td data-label="Taxable Amount" className={`${style.listitem}`}>{bill.quantity * bill.pid.price * 5 / 100}</td>
                                                <td data-label="Delivery Charge" className={`${style.listitem}`}>{dcharge}</td>
                                                <td data-label="Total" className={`${style.listitem}`}>{bill.totalamount}</td>
                                            </tr>

                                            <tr className={`${style.listitem} ${style.totalrow}`}>
                                                <th colSpan="9" className={`${style.listitem}`}>Grand Total:-</th>
                                                <td data-label="Grand Total" className={`${style.listitem} p-0`}>{bill.totalamount}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <footer>
                                    <div id={`${style.legalcopy}`} className={`${style.clearfix}`}>
                                        <p className={`${style.p} ${style.colright}`}>Our mailing address is:
                                            <span className={`${style.email}`}><a className={`${style.a}`} href={bill.pid.resname.email}>{bill.pid.resname.email}</a></span>
                                        </p>
                                    </div>
                                </footer>
                            </div>
                        </div >
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-primary">Print</button> */}
                        <Pdf targetRef={ref} filename={`${bill._id}.pdf`}>
                            {({ toPdf }) => <button type="button" onClick={toPdf} className="btn btn-primary">Print</button>}
                        </Pdf>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BillModal
