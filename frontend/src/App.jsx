import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AdminSidebar from './layouts/AdminSideBar'

import Home from './Home'

import ProductList from './pages/product/ProductList';
import ProductCreate from './pages/product/ProductCreate';

import ProductUpdate from './pages/product/ProductUpdate';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import { auth } from './utils/firebase';
import Cart from './pages/Cart';
import OrdersList from './pages/order/OrdersList';

import { baseUrl, VAPID_KEY } from './assets/constant'
import { getToken, onMessage } from 'firebase/messaging' //galing package
import { messaging } from './utils/firebase'
import { useSelector } from 'react-redux'
import axios from 'axios'

// import { getToken } from "firebase/messaging"
// import { messaging } from './utils/firebase';

function App() {
  const [user, setUser] = useState(null)
  const { access_token } = useSelector(state => state.auth);

  const sentTokenToServer = async ({ token }) => {
    try {

      const { data } = await axios.post(`${baseUrl}/user/token`, { token: token }, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })

    } catch (err) {
      console.log(err)
    }
  }

  const requestPermission = async () => {

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      if (access_token) { // if mayaccess token pang notif na, saka palang ibibigay sa token server
        sentTokenToServer({ token: token })
      }

      console.log("Token generated : ", token);

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user)
    })

  }, [])

  useEffect(() => {

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {

      console.log(payload)

    });

    return () => {
      unsubscribe();
    };

  }, [access_token])



  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Route */}

          <Route path='/register' element={user ? <Navigate to={'/products/list'} /> : <Register />} />
          <Route path='/login' element={user ? <Navigate to={'/products/list'} /> : <Login />} />

          <Route path='/' element={<Home />} />

          {/* <Route path='/cart' element={user ? <Cart /> : <Navigate to={'/login'} />} /> */}
          <Route path='/cart' element={<Cart />} />


          {/* product CRUD  */}
          <Route path='/products/list' element={<ProductList />} />
          <Route path='/products/create' element={<ProductCreate />} />
          <Route path='/products/update/:id' element={<ProductUpdate />} />


          {/* orders */}
          <Route path='orders'
            element={user ? <OrdersList /> : <Navigate to={'/login'} />}
          />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
