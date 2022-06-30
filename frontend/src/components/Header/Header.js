import React from 'react'
import style from "../Header/Header.module.css"
import Navbar from '../Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../https/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLogIn, setUser } from '../../redux/Slice/userDataSlice'



export default function Header() {

    // const { state } = useSelector(state => state.userDataSlice)
    // console.log(state);
    const dispatch = useDispatch()
    // const [fetchuser, setFetchUser] = useState(false)
    const navigate = useNavigate()

    // console.log("State data is here", state);
    // useEffect(async () => {
    //     // const gettoken = Cookies.get('jwt')
    //     // console.log("Hello token", gettoken);
    //     // if (gettoken) {
    //     //     setFetchUser(true)
    //     // }
    //     const userdata = await loginuser()
    //     if (userdata) {
    //         if (userdata.data.token == undefined) {
    //             setFetchUser(false)
    //         } else {
    //             setFetchUser(true)
    //             dispatch(setdata(userdata.data))
    //         }
    //     }

    // }, [])

    const signout = () => {
        const logoutfun = logout()
        dispatch(setLogIn(false))
        dispatch(setUser(''))
        navigate("/login")
    }

    return (
        <div className='bg-light pt-1'>
            <div className="container">
                <div className='row d-flex justify-content-center align-items-center py-3'>
                    <div className={`col-md-4 col-xs-12 ${style.logoalign} ${style.zoominoutbox}`}>
                        <h2 className='fw-bold mb-0'>Food <span style={{ color: "red", fontWeight: "bolder" }}>ZONE</span></h2>
                    </div>
                    <div className={`col-md-4 ${style.headtext}`}>
                        <h4 className='mb-0'>Welcome To FoodZone</h4>
                    </div>
                    <div className={`col-md-4 col-xs-12 ${style.loginoutbtn}`}>
                        <div>
                            <div className={`${style.dropdown}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className={`${style.image} bi bi-gear-fill`} viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                                <div className={`${style.dropdowncontent}`}>
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <Link className="dropdown-item" to="/ordertrack">Orders</Link>
                                    <Link className="dropdown-item" to="/bill">Bills</Link>
                                    <p className={`nav-link dropdown-item mb-0 ${style.signoutbtn}`} onClick={signout}>SignOut</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
        </div >
    )
}
