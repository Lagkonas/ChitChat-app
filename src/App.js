import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './chatStyles.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import NavigationRoute from './components/NavigationRoute';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ChatUi from './pages/ChatUi';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<NavigationRoute/>}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/chat' element={<PrivateRoute />}>
            <Route path='/chat' element={<ChatUi />} />
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer theme='dark' pauseOnHover={true} />
    </>
  );
}

export default App;
