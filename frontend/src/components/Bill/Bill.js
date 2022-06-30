import React, { useEffect, useState } from 'react'
import { billinfo } from '../../https/axios'
import style from '../Bill/Bill.module.css'
import Headers from '../Header/Header'
import BillModal from './BillModal/BillModal'

export default function Bill() {

    const [resinfo, setResinfo] = useState()

    useEffect(() => {
        async function fetchData() {
            const info = await billinfo();
            setResinfo(info.data)
        }
        fetchData()
    }, [])
    console.log(resinfo)

    // const fetchBill = (id) => {
    //     alert(id);
    // }

    return (
        <>
            <Headers />
            {
                resinfo && resinfo.map((data) =>
                    data.delivered === true && data.cancel === false ?
                        <>
                            <div className='d-flex justify-content-center my-4'>
                                <button type="button" className={`${style.btncolor} btn btn-primary w-25 mx-2 rounded-pill`} data-bs-toggle="modal" data-bs-target={`#bill_${data._id}`} >
                                    {data.pid.resname.resname}
                                </button>
                            </div>
                            <BillModal id1={`bill_${data._id}`} bill={data} />
                        </> :
                        <div className='d-flex justify-content-center my-0'></div>
                )
            }
        </>
    )
}
