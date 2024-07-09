import { Heading } from "../components/Heading";
import { useState,useMemo,useEffect} from 'react';
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import {Button} from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios';



export const Dashboard=  ()=>{

    const [user,setUser]=useState({});
    const [balance,setBalance]=useState(0);


    
    useMemo(async ()=>{
        const token=localStorage.getItem("token");
        const response= await axios.get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          Authorization: 'Bearer ' + token 
        }
       })
       setUser(response.data.user);
       setBalance(response.data.balance);
       

    },[])
       
    
    
    


    return (
        <div className="bg-slate-200 h-screen">
            <div className=" w-full flex justify-between pl-3 items-baseline">
                <div className="">
                <Heading label={"Payments APP"} />

                </div>
                
                <div className="flex items-center">
                    <div className="  mx-10  ">
                        Hello, {user.firstName || null} {user.lastName}
                    </div>
                    <div className="font-bold text-gray-700 rounded-full  bg-white flex items-center justify-center font-mono" >404
                        
                        
                    </div>
                </div>
            </div>
            <hr className=" h-1 my-8 mx-10 bg-gray-100 border-0 rounded md: dark:bg-gray-700" />







        </div>
    )
}