import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function checkAuth(isAuthenthicated,user,children) {

    const location = useLocation()
    if(!isAuthenthicated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){
        return <Navigate to='/login'/>

    }

    if(isAuthenthicated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
        if(user.role === "freenlancer"){
            return <Navigate to= "/freelancer-dashboard" />
        }else{
            return <Navigate to="/home"/>
        }
    }

    if(isAuthenthicated && user.role !== 'freelancer' && location.pathname.includes('freelancer')){
        return <Navigate to="/unauth-page"/>

    }

    if(isAuthenthicated && user.role === 'freelancer' && location .pathname.includes('user')){
        return <Navigate to="/freenlancer-dashboard"/>
    }


    return <>{children}</>

}

export default checkAuth