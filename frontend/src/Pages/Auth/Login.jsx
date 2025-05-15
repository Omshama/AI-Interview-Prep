import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utlis/helper';
const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();
  
  const handleLogin =async(e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter a Valid Email ");
      return ; 
    }
    if(!password(password)){
      setError("Please Enter the Password");
      return;

    }
    setError(" ");
    //Log in Api Call
    try{

    }
    catch(error)
    {
      if(error.response && error.response.data.message)
      {
        setError(error.response.data.message);

      }
      else{
        setError("Something Went Wrong.Please Try Again Later");
      }
    }
  };
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex flex-col justify-center '>
    <h3 className='text-lg font-semibold text-black '>Welcome Back</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6 '>
      Please Enter Your Details to Login
    </p>
    <form onSubmit={handleLogin}>
      <Input 
      value={email}
      onChange={({target})=>setEmail(target.value)}
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"

      />
      <Input
      value={password}
      onChange={({target})=>setPassword(target.value)}
      label="Password"
      placeholder="Min 8 Characters"
      type="password"
      />
      
      
    {error && <p className=' text-red-500 text-xs pb-2.5  '>{error}</p>}
    <button type='submit ' 
    className='btn-primary'
    onClick={handleLogin}
    >
     LOGIN
    </button>
    <p className='text-[13px] text-slate-800 mt-3'>
    Don't have an account?
    <button className='font-medium text-primary underline cursor-pointer' onClick={()=>setCurrentPage("signup")}>SignUp</button>
    </p>
    </form>
      
    </div>
  )
}

export default Login
