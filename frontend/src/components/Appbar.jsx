import {Heading } from './Heading'

export function Appbar({user}){


    return(
        <div>
            <div className=" w-full flex justify-between  items-baseline">
                        <div className="">
                            <Heading label={"Payments APP"} />

                        </div>
                        
                        <div className="flex items-center">
                            <div className="  mr-3  ">
                                Hello, {user.firstName || null} 
                            </div>
                            <div className="my-3  bg-slate-600 min-h-10 max-h-10 min-w-10 rounded-full text-white flex justify-center items-center" >
                                
                                    
                                <div >
                                
                                {user.firstName[0]}{user.lastName[0]}


                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <hr className=" h-1 my-8  bg-slate-200 border-0 rounded md: dark:bg-slate-200" />
                </div>   )
}