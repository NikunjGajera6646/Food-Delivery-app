import './App.css';
import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation
} from "react-router-dom"
import Login from './components/Login/Login';
import RegisterUser from './components/RegisterUser/RegisterUser';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/NavItem/AboutUs/AboutUs';
import Restaurant from './components/NavItem/Restaurant/Restaurant';
import AllProductsInfo from "./components/NavItem/AllProducts/AllProductsInfo"
import UserProfile from './components/NavItem/UserProfile/UserProfile';
import ContactUs from './components/NavItem/ContactUs/ContactUs';
import ErrorPage from './components/ErrorPage/ErrorPage';
import RestaurantDetail from './components/NavItem/Restaurant/RestaurantDetail/RestaurantDetail';
import { loginuser } from './https/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogIn, setUser } from './redux/Slice/userDataSlice';
import EditProfile from '../src/components/NavItem/UserProfile/EditProfile/EditProfile'
import Cart from './components/NavItem/Cart/Cart';
import SingleProduct from './components/Products/SingleProduct/SingleProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderStatus from './components/OrderStatus/OrderStatus';
import Bill from './components/Bill/Bill';
import loadinganim from './images/loadinganim.gif'

function App() {
  const { isLoggedIn } = useSelector(state => state.userDataSlice)
  console.log(isLoggedIn);
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      const userdata = await loginuser()
      if (userdata) {
        if (userdata.data.token === undefined) {
          dispatch(setLogIn(false))
        } else {
          dispatch(setUser(userdata.data))
          dispatch(setLogIn(true))
        }
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={isLoggedIn ? <HomePage /> : <Login />}></Route> */}
          <Route exact path='/' element={<PrivateRoute> <HomePage /> </PrivateRoute>}></Route>
          <Route path='/registeruser' element={<AuthRoute><RegisterUser /></AuthRoute>}></Route>
          <Route path='/login' element={<AuthRoute><Login /></AuthRoute>}></Route >
          <Route exact path='/allrestaurant' element={<PrivateRoute> <Restaurant /> </PrivateRoute>}></Route>
          <Route exact path='/allproducts' element={<PrivateRoute> <AllProductsInfo /></PrivateRoute>}></Route >
          <Route exact path='/bill' element={<PrivateRoute> <Bill /></PrivateRoute>}></Route>
          <Route exact path='/aboutus' element={<PrivateRoute> <AboutUs /></PrivateRoute>}></Route>
          <Route exact path='/profile' element={<PrivateRoute> <UserProfile /></PrivateRoute>}></Route>
          <Route exact path='/editprofile' element={<PrivateRoute> <EditProfile /></PrivateRoute>}></Route>
          <Route exact path='/restaurantdetail/:id' element={<PrivateRoute> <RestaurantDetail /></PrivateRoute>}></Route>
          <Route exact path='/singleproduct/:id' element={<PrivateRoute> <SingleProduct /></PrivateRoute>}></Route>
          <Route exact path='/ordertrack' element={<PrivateRoute> <OrderStatus /></PrivateRoute>}></Route>
          <Route exact path='/cart' element={<PrivateRoute> <Cart /></PrivateRoute>}></Route>
          <Route exact path='/contactus' element={<PrivateRoute> <ContactUs /></PrivateRoute>}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
          {/* <Route path='*' element={<PrivateRoute><ErrorPage /></PrivateRoute>}></Route> */}
        </Routes >
      </Router >
      <ToastContainer></ToastContainer>
    </>
  );
}

const PrivateRoute = ({ children }) => {
  const [fetchData, setFetchData] = useState(false)
  const { isLoggedIn } = useSelector(state => state.userDataSlice)
  let location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setFetchData(true)
    }, 2000);
  }, [])
  if (fetchData) {
    if (isLoggedIn === true) {
      return children
    }
    return <Navigate to={{ pathname: '/login', state: { from: location } }} />
  } else {
    return (
      <>
      <div className="container">
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
        <img src={loadinganim} alt={"loader"}/>
        </div>
      </div>
      </>
    )
  }
}

const AuthRoute = ({ children }) => {
  const [fetchData, setFetchData] = useState(false)
  const { isLoggedIn } = useSelector(state => state.userDataSlice)
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setFetchData(true)
    }, 2000);
  }, [])
  if (fetchData) {
    if (isLoggedIn !== true) {
      return children;
    }
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
  } else {
    return (
      <>
      <div className="container">
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
        <img src={loadinganim} alt={"loader"}/>
        </div>
      </div>
      </>
    )
  }
}

export default App;
