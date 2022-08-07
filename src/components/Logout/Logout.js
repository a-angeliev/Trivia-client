import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"


export default function Logout() {
    let navigate = useNavigate()
    let {user, userLogout} = useContext(AuthContext)


    // if(confirm("Are you sure you want to logout")==true){
    //     useEffect(()=>{
    //         userLogout()
    //         navigate('/')

    //     })
    // }else{
    //     navigate('/')
    // }
    useEffect(()=>{
        // let res = window.confirm("Are you sure you want to logout");
        // console.log(res);
        if(window.confirm("Are you sure you want to logout")==true){
            userLogout()
            navigate('/')
        }else{
            navigate('/')
        }
    })
    return null
}