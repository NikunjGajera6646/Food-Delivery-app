import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from "../../https/axios"
import style from "./Login.module.css"
import { useDispatch } from 'react-redux'
import { setLogIn, setUser } from '../../redux/Slice/userDataSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const senddata = async () => {
        const loginUser = await login({ email, password })
        console.log(loginUser);
        console.log((loginUser) === true);
        // if (loginUser.data.success) {
        //     dispatch(setUser(loginUser.data.user))
        //     dispatch(setLogIn(true))
        //     navigate("/")
        // }
        // else {
        //     navigate("/login")
        // }
    }

    return (
        <>
            {/* <div className=''>
                <div className="mb-3">
                    <label className="form-label">UserName or Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => { setPassword(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={senddata}>LogIn</button>
            </div> */}

            <section className={`h-100 ${style.gradientcustom}`}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className={`card text-white ${style.cardback}`} style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-2 mt-md-2">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>

                                        <form action="">
                                            <p className="text-white-50 mb-3">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-2">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={e => { setEmail(e.target.value) }} required />
                                                <label className="form-label">Email</label>
                                            </div>

                                            <div className="form-outline form-white mb-2">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={e => { setPassword(e.target.value) }} required />
                                                <label className="form-label">Password</label>
                                            </div>

                                            {/* <p className="small pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={senddata}>Login</button>
                                        </form>
                                        {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                        </div> */}

                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to="/registeruser" className="text-white-50 fw-bold">Sign Up</Link></p>
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
