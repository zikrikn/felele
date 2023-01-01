import Head from 'next/head'
import Image from 'next/image'
import logo from '../gambar/logo.png'
import styles from '../styles/login.module.css'
import Link from 'next/link'

import axios from "axios"
import { useState, useEffect} from 'react'
import router from 'next/router'
import cookie from 'js-cookie'

export default function Login({token}) {
    
    const apiEndPoint = 'https://api.lemes.my.id/auth/login';

    const [key, setKey] = useState('')
    const [password, setPassword] = useState('')

    function handleKey(e) {
        setKey(e.target.value)
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleApi = (e) => {
        e.preventDefault();
        console.log({key, password})
        
        axios.post(apiEndPoint, {
            key : key,
            PasswordPP : password
            
        })
            .then(res => {
                fetch("/api/login", {
                    method : "post",
                    headers: {
                        "Content-Type" : "application/json",
                 },
                    body: JSON.stringify({token : "BLOKK"})
                })
                console.log(res.data)
               
                if (res.data.access_token != null){
                    if ((key == "admin") && (password == "admin")){
                        
                        router.push('AdminProfile')
                    }else{
                        router.push('InformasiKolamLele')
                    }
                }else{
                    alert('username atau password tidak tepat')
                }
                
            })
            .catch(error => {
                console.log(error.data);
                alert('data tidak boleh kosong')
            });
        
    }




    return (
        <div>
            <Head>
                <title>Login</title>
                
            </Head>

            <main className={styles.main}>
                <h2>Token : {token}</h2>
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
                        <input onChange={handleKey} id="key" value={key} type="text" placeholder='username' className={styles.username}/>
                        <input onChange={handlePassword} id="PasswordPP" value={password} type="password" placeholder='password' className={styles.password}/>
                        <input type="submit" placeholder='SUBMIT' className={styles.loginButton} />
                    </div>
                </form>  

                <Link href="signup" className={styles.signup}>Don't have an account <b>Register!</b></Link>
                
            </main>
        </div>
    )
}

export function getServerSideProps({req, res}){
    return {props: {token : req.cookies.token || ""} };
}

