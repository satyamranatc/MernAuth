import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({IsLoggedIn}) {
    const [user, setUser] = useState(null);

     useEffect(() => {
        // Get user from local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
     },[])



  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Logo</h2>
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-white hover:text-gray-300 transition duration-300">Home</Link></li>
          <li><Link to="/Blog" className="text-white hover:text-gray-300 transition duration-300">Blog</Link></li>
         {
          IsLoggedIn?
          <>
          <h2 className='font-bold text-white' >Welcome {user ? user.fullName:null }</h2>
          <button onClick={()=>{
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("user")
            window.location.reload()
          }}  className='bg-red-500 hover:bg-red`-600 text-white py-1 px-3 rounded transition duration-300' >LogOut</button>
          </>
          :
         <>
           <li><Link to="/Login" className="text-white hover:text-gray-300 transition duration-300">Login</Link></li>
           <li><Link to="/Signup" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-300">Sign Up</Link></li>
         </>
         }
        </ul>
      </div>
    </nav>
  )
}