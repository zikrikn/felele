import Head from 'next/head'
import Image from 'next/image'
import profil from '../gambar/profil.png'
import { ImHome } from 'react-icons/im'
import { BsPencilFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';

import styles from '../styles/AdminProfile.module.css'
import Link from 'next/link'
import router from 'next/router'
import Cookies from 'js-cookie'

export default function AdminProfile({token}) {

    const handleSubmit = () => {
        fetch("/api/logout", {
            method : "post",
            headers: {
                "Content-Type" : "application/json",
         },
            body: JSON.stringify({})
        })

        router.push('login')
    }
    return (
        <div>
            <Head>
                <title>Admin Profile</title>
            </Head>

            <main className={styles.main}>
                <div>
                    <p className={styles.judul}>Admin Profile</p>
                </div>
                
                <div >
                    <div className={styles.kotak}>
                        <Image
                            src={profil}
                            alt="profil"
                            width={65}
                            height={65}
                            className={styles.foto}
                        />
                        <div>
                            <p className={styles.text}>{token}</p>
                            <p className={styles.text}>ADMIN</p>
                        </div>
                    </div>
                    
                    
                </div>

                <button  className={styles.logoutButton} onClick={() => handleSubmit()}>LOGOUT</button>
                
               

                <nav className={styles.icon}>
                    <Link href="#" className={styles.iconbar}>
                        <p><ImHome/></p>
                    </Link>
                    <Link href="#" className={styles.iconbar}>
                        <p><BsPencilFill/></p>
                    </Link>
                    <Link href="#" className={styles.iconbar}>
                        <p><BsFillPersonFill/></p>
                    </Link>
                </nav>


            </main>
        </div>
  )
}

export function getServerSideProps({req, res}){
    return {props: {token : req.cookies.token || ""} };
}
