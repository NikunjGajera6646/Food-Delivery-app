import React, { useEffect, useState } from 'react'
import { loginuser } from '../../https/axios'
import Header from "../Header/Header"
import HomeProducts from '../HomeProducts/HomeProducts'
import View from '../ViewPage/View'
import { useDispatch } from 'react-redux'
import { setdata } from '../../redux/Slice/userDataSlice'

export default function HomePage() {
    // const [userInfo, setUserInfo] = useState('')
    // const dispatch = useDispatch()
    // useEffect(async () => {
    //     const userdata = await loginuser()
    //     if (userdata) {
    //         setUserInfo(userdata)
    //         dispatch(setdata(userdata))
    //     }
    // }, [])
    return (
        <div>
            <Header />
            <View />
        </div>
    )
}
