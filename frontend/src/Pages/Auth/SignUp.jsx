import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utlis/helper';
const signUp = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=useState("null");
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  
  const navigate=useNavigate();
  //Handle Sign Up 
  const handleSignUp =async(e)=>{
    e.preventDefault();
    let profileImageUrl="";
    if(!fullName)
    {
      setError("Please Enter Full Name");
      return ;
    }
    if(!validateEmail(email))
    {
      setError("Please enter a valid email address");
      return ;
    } 
    if(!password(password))
    {
      setError("Please enter a Password");
    }
    setError("");
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
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex flex-col justify-center '>
    <h3 className='text-lg font-semibold text-black'>Create An Account</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us Today by Entering your details here </p>
    <form onSubmit={handleSignUp}>
    
    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
    
    <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
    <Input
      value={fullName}
      onChange={({target})=>setFullName(target.value)}
      label="Full Name"
      placeholder={"John Doe"}
      type="text"
      className=''
    />
    <Input
      value={email}
      className=''
      label="Email"
      placeholder={"johndoe@gmail.com"}
      type={"email"}
      onChange={(target)=>setEmail(target.value)}
    />
    <Input
      value={password}
      className=''
      label="Password"
      placeholder={"Min 8 Characters"}
      type={"password"}
      onChange={(target)=>setPassword(target.value)}/>
      </div>
      {error && <p className='text-red-500 text-xs pb-2.5 '>{error}</p>}
      <buton type="submit" className='btn-primary'>Sign Up</buton>
      
      
      <p className='text-[13px] text-slate-800 mt-3'>Already Have An Account
      <button className='font-medium text-primary underline cursor-pointer' 
      onClick={()=>setCurrentPage("login")}
      >Login</button>
      </p>
    
    </form>
      

    </div>
  )
}

export default signUp
