import { Link } from "react-router-dom"

export function BottomWarning({label,to,buttonText}){
  

  return <div className="flex mt-1 mb-2">

    <div>{label}</div>
    <Link className="pointer underline pl-1 cursor-pointer" to={to}>{buttonText} </Link>
    
  </div>
}