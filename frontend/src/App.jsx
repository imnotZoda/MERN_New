import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminSidebar from './layouts/AdminSideBar';

// Pages
import Home from './Home';
import ProductList from './pages/product/ProductList';
import ProductCreate from './pages/product/ProductCreate';
import ProductUpdate from './pages/product/ProductUpdate';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Cart from './pages/Cart';
import OrdersList from './pages/order/OrdersList';

// Firebase and Notifications
import { auth, messaging } from './utils/firebase';
import { getToken, onMessage } from 'firebase/messaging';

// Redux
import { useSelector } from 'react-redux';

// Axios
import axios from 'axios';

// Constants
import { baseUrl, VAPID_KEY } from './assets/constant';

function App() {
  const [user, setUser] = useState(null);
  const { access_token } = useSelector((state) => state.auth);

  // Function to send the token to the server
  const sendTokenToServer = async ({ token }) => {
    try {
      await axios.post(
        `${baseUrl}/user/token`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (err) {
      console.error('Error sending token to the server:', err);
    }
  };

  // Function to request notification permissions and generate token
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });

      if (access_token) {
        sendTokenToServer({ token });
      }

      console.log('Notification token generated:', token);
    } else if (permission === 'denied') {
      alert('You denied the notification permission.');
    }
  };

  // Firebase Auth State Listener
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Firebase Messaging Listener
  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Notification received:', payload);
    });

    return () => {
      unsubscribe();
    };
  }, [access_token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Navigate to="/products/list" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/products/list" /> : <Login />} />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* Product CRUD Routes */}
        <Route path="/products/list" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/update/:id" element={<ProductUpdate />} />

        {/* Orders Route */}
        <Route
          path="/orders"
          element={user ? <OrdersList /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
