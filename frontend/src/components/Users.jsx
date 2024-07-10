
export function Users({userList}){

    return (
        <div>
        {
            
            userList.map((user)=>{
                

                return (
                    <div  className="w-full py-2 flex justify-between items-baseline ">
                        <div className="flex items-baseline">
                            <div className="my-3 bg-slate-600 min-h-10 max-h-10 min-w-10 rounded-full text-white flex justify-center items-center mr-4 " >
                                <div >
                                    {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                                </div>
                            </div>
                            <div className="">
                                {user.firstName} {user.lastName}

                            </div>
                        </div>
                        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={(e)=>{

                            navigate('/sendmoney')
                        }} >
                            Send Money 
                        </button>
                    </div>
                        
                )
            })
        }
        
        

    </div>  

    )
}