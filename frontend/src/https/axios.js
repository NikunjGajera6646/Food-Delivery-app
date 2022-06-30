import axios from 'axios'

const api = axios.create({

    baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

export const login = (data) => api.post('/api/login', data)
export const loginuser = () => api.get('/api')
export const logout = () => api.post('/api/logout')
export const Registeruser = (data) => api.post('/api/createuser', data)
export const RestaurantData = () => api.get('/api/restaurants')
export const CategoriesData = () => api.get('/api/categories')
export const SingleRestaurantData = (id) => api.get(`/api/singlerestaurant/${id}`)
export const products = (id) => api.get(`/api/products/${id}`)
export const contactus = (data) => api.post('/api/contactus', data)
export const addtocart = (id) => api.post(`/api/addtocart/${id}`)
export const addtofav = (id, data) => api.post(`/api/addtofav/${id}`, data)
export const fetchcart = () => api.get('/api/fetchcart')
export const statecity = () => api.get('/api/stateandcity')
export const updateUser = (data) => api.post('/api/updateuser', data)
export const deletecart = (id) => api.post(`/api/deletecart/${id}`)
export const oneproduct = (id) => api.get(`/api/singleproduct/${id}`)
export const order = (data) => api.post('/api/orders', data)
export const ratingproduct = (id, data) => api.post(`/api/rating/${id}`, data)
export const allproduct = (id) => api.get('/api/products')
export const searchproducts = (name) => api.get(`/api/search/${name}`)
export const commentproduct = (id, data) => api.post(`/api/comment/${id}`, data)
export const getcomment = (id) => api.get(`/api/viewcomment/${id}`)
export const searchrestaurant = (name) => api.get(`/api/restaurantsearch/${name}`)
export const status = () => api.get('/api/status')
export const billinfo = () => api.get('/api/bill')
export const ordercancel = (id) => api.post(`/api/cancelorder/${id}`)
export const payments = (data) => api.post(`/api/payments`,data)