import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"


export default function Logout() {
    let navigate = useNavigate()
    let {user, userLogout} = useContext(AuthContext)

    useEffect(()=>{
        if(window.confirm("Are you sure you want to logout")==true){
            userLogout()
            navigate('/')
        }else{
            navigate('/')
        }
    })
    
    return null
}