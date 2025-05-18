import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Home from'./Pages/Home/Dashboard';
import LandingPage from './Pages/InterviewPrep/LandingPage';
import InterviewPrep from './Pages/InterviewPrep/InterviewPrep';
import UserProvider from './context/userContext';
const App = () => {
  return (
    <UserProvider>
    <div className=''>
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Home/>}/>
          
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className:" ",
          style:{
            fontSize:'13px',
          },
        }}
      
      />
    </div>
    </UserProvider>
  )
}

export default App
