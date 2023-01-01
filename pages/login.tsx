import Head from 'next/head'
import Image from 'next/image'
import logo from '../gambar/logo.png'
import styles from '../styles/login.module.css'
import Link from 'next/link'

import axios from "axios"
import { useState, useEffect} from 'react'
import router from 'next/router'
import cookie from 'js-cookie'





export default function Login() {
    const apiEndPoint = 'https://api.lemes.my.id/auth/login';

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorUsername, seteErorUsername] = useState('')
    const [errorPass, setErrorPass] = useState('')

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleApi = (e) => {
        e.preventDefault();
        axios.post(apiEndPoint, {
            "grant_type": "",
            "username": username,
            "password": password,
            "scope": "",
            "client_id" : "",
            "client_secret" : ""
            
        }, {
            headers : {
                "accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                fetch("/api/login", {
                    method : "post",
                    headers: {
                        "Content-Type" : "application/json",
                },
                    body: JSON.stringify({token : res.data.access_token})
                })
                console.log(res.data)
                if ((username == "admin") && (password == "admin")){
                    alert("anda adalah admin")
                    router.push('adminmenu')
                }else{
                    router.push('InformasiKolamLele')
                    console.log(res.data.access_token)
                }

            })
            .catch(error => {
                    console.log(error);
            });   


        // console.log({username, password})
        // if (username.length == 0 && password.length == 0){
        //     seterrorUsername("Username tidak boleh Kosong")
        //     setErrorPass("Password tidak boleh Kosong")
        // }else if(username.length == 0 && password.length != 0){
        //     seterrorUsername("Username tidak boleh Kosong")
        //     setErrorPass("")
        // }else if(username.length != 0 && password.length == 0){
        //     seterrorUsername("")
        //     setErrorPass("Password tidak boleh Kosong")
        // }else if(username.length < 4 && password.length < 4){
        //     seterrorUsername("Username harus lebih dari 4 karakter")
        //     setErrorPass("Password harus lebih dari 4 karakter")
        // }else if(username.length > 4 && password.length < 4){
        //     seterrorUsername("")
        //     setErrorPass("Password harus lebih dari 4 karakter")
        // }else if(username.length < 4 && password.length > 4){
        //     seterrorUsername("Username harus lebih dari 4 karakter")
        //     setErrorPass("")
        // }else{
        //     axios.post(apiEndPoint, {
        //         "username": username,
        //         "password": password,
        //         "Client credentials location": "basic",
        //         "client_id" : "",
        //         "client_secret": ""
        //     })
        //         .then(res => {
                    // fetch("/api/login", {
                    //     method : "post",
                    //     headers: {
                    //         "Content-Type" : "application/json",
                    // },
                    //     body: JSON.stringify({token : username})
                    // })
                    // console.log(res.data)
                    
                    // if ((username == "admin") && (password == "admin")){
                    //     alert("anda adalah admin")
                    //     router.push('adminmenu')
                    // }else{
                    //     router.push('InformasiKolamLele')
                    // }
                    
                    
        //         })
        //         .catch(error => {
        //             console.log(error);
                
        //         });
        // }
        
    }
    
    return (
        <div>
            <Head>
                <title>Login</title>
                
            </Head>

            <main className={styles.main}>
                
                <Image
                    src={logo}
                    alt="Logo LeMES"
                    width={150}
                    height={155}
                    className={styles.logo}
                />
                <div className={styles.formText}>
                    <p className={styles.judul}>
                        Wecome to LeMES!
                    </p>
                    <p className={styles.text}>
                        Your personal catfish monitoring
                    </p>
                </div>
                <form onSubmit={handleApi}>
                    <div className={styles.input}>
                        <input onChange={handleUsername} id="username" value={username} type="text" placeholder='username' className={styles.username}/>
                        {errorUsername && <p className="error">{errorUsername}</p>}

                        <input onChange={handlePassword} id="PasswordPP" value={password} type="password" placeholder='password' className={styles.password}/>
                        {errorPass && <p className="error">{errorPass}</p>}

                        <input type="submit" placeholder='SUBMIT' className={styles.loginButton} />
                    </div>
                </form>  

                <Link href="signup" className={styles.signup}>Don't have an account <b>Register!</b></Link>
                
            </main>
        </div>
    )
}


