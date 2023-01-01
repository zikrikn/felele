import Head from 'next/head'
import Image from 'next/image'
import logo from '../gambar/logo.png'
import styles from '../styles/login.module.css'
import Link from 'next/link'

import axios from "axios"
import { useState, useEffect} from 'react'
import router from 'next/router'
import cookie from 'js-cookie'
import { useForm } from 'react-hook-form'




export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const apiEndPoint = 'https://api.lemes.my.id/auth/login';
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const [errorUsername, seteErorUsername] = useState('')
    // const [errorPass, setErrorPass] = useState('')

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
                <form onSubmit={handleSubmit(handleApi)}>
                    <div className={styles.input}>
                        <input onChange={handleUsername} value={username} type="text" placeholder='username' className={styles.username}
                            // {...register("username", {
                            //       required: 'Username is required',
                            //       minLength: {
                            //         value: 4,
                            //         message: 'Username must have at least 4 characters'
                            //       },
                                
                            //       maxLength: {
                            //         value: 6,
                            //         message: 'Username must be less than 6 characters'
                            //       }
                                
                            //     })}
                        />
                        {errors.username &&  errors.username.message}

                        <input onChange={handlePassword} id="PasswordPP" value={password} type="password" placeholder='password' className={styles.password}
                            // {...register("password", {
                            //     required: 'Password is required',
                            //     minLength: {
                            //         value: 4,
                            //         message: 'Password must have at least 4 characters'
                            //     }, 
                            //     maxLength : {
                            //         value: 6,
                            //         message: 'Password must be less than 6 characters'
                            //     }
                            // })}
                        />
                        {errors.password && errors.password.message}
                        

                        <input type="submit" placeholder='SUBMIT' className={styles.loginButton} />
                    </div>
                </form>  

                <Link href="signup" className={styles.signup}>Don't have an account <b>Register!</b></Link>
                
            </main>
        </div>
    )
}


