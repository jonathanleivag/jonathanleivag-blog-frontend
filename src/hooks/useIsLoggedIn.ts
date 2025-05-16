"use client"

import {useEffect, useState} from "react"
import Cookies from "js-cookie"

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const token = Cookies.get("token")
        setIsLoggedIn(!!token)
    }, [])

    return isLoggedIn
}


export default useIsLoggedIn
