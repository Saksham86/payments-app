import axios from "axios";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SendMoney=()=>{

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return(
        <div className="bg-slate-300 h-screen">

        </div>
    )




}