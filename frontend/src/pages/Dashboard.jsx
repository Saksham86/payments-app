import { Heading } from "../components/Heading";
import { useState,useMemo,useEffect} from 'react';
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import {Button} from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios';
import { Users } from "../components/Users";
import { Appbar } from "../components/Appbar";



export const Dashboard=  ()=>{

    const [user,setUser]=useState({});  
    const [balance,setBalance]=useState(0);
    const [userList,setUserList] =useState([]);
    const [searchInput,setSearchInput]=useState("");
    const [ isLoading, setIsLoading ] = useState(true)
   
   



    const navigate = useNavigate();
    




    
     useMemo(async ()=>{
        const token=localStorage.getItem("token");
        const response= await axios.get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          Authorization: 'Bearer ' + token 
        }
       })
       setUser(response.data.user);
       setBalance(response.data.balance);
       console.log(response)

    },[])

    
     useMemo (async()=>{
        const response=await axios.get("http://localhost:3000/api/v1/user/bulk",{
            params:{
                filter:searchInput
            }

        })
        
        setUserList(response.data.user);
        setIsLoading(false);

        

    },[searchInput]);

    if(isLoading){
        return <div></div>
    }

    return (
        <div className=" h-screen">
            <div className="mx-6">

                <Appbar user={user} />


                <div className="font-bold text-2xl">
                    Your Balance ${balance.toFixed(2)}
                </div>
                <div className="w-full flex">
                    
                    <input placeholder=" Search for Users" className="w-full pl-4 bg-slate-200 border-white mx-2 h-8 my-4 rounded-md focus:outline-none " onChange={(e)=>{

                        setTimeout(()=>{
                            setSearchInput(e.target.value);
                        },1000)

                    }} />

                </div>
                <Users userList={userList} />
            </div>

        </div>
    )
}