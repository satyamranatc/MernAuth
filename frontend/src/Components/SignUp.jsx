import React,{useState,useEffect} from 'react'
import axios from "axios"

export default function SignUp() {

  async function handleSubmit(e) {
    e.preventDefault();
    let Data = {
      fullName: e.target[0].value,
      age: e.target[1].value,
      username: e.target[2].value,
      password: e.target[3].value
    }
    let res = await axios.post("http://localhost:5500/api/SignUp",Data)
    
      if(res.data.message == true)
      {
        localStorage.setItem("isLoggedIn",true)
        localStorage.setItem("user",JSON.stringify(res.data.user))
      }
      else
      {
        localStorage.setItem("isLoggedIn",false)
        localStorage.setItem("user",null)
      }
  }


  return (
    <div>

     <br />
     <br />

     <fieldset>
      <legend>SignUp Form</legend>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Full Name' name="" id="" />
        <input type="number" placeholder='Age' name="" id="" />
        <input type="text" placeholder='UserName' name="" id="" />
        <input type="text" placeholder='Password' name="" id="" />
        <button>SignUp</button>
      </form>
     </fieldset>



    </div>
  )
}
