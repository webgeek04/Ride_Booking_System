import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RideBooking from './components/RideBooking';
import RideHistory from './components/RideHistory';
import FeedbackForm from './components/FeedbackForm';
import Payment from './pages/Payment'
import PayMethod from './pages/PayMethod'
import { AuthProvider } from './context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PzwlvHf964lYgFIN7kNTLFjPQLIalrkSVHv65xAYp9TpYpQnoQ0mcfKCNGm2R0OmRp9Bo0pY8DlOKp3C2Sf8DAV00Hh5p21Cn');


function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ride-booking" element={<RideBooking />} />
                <Route path="/ride-history" element={<RideHistory />} />
                <Route path="/feedback" element={<FeedbackForm />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payMethod" element={<PayMethod />} />
              </Routes>
            </BrowserRouter>
          </div>
        </Elements>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
