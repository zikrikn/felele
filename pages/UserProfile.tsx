import Head from 'next/head'
import Image from 'next/image'
import profil from '../gambar/profil.png'
import { FaHome } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';

import styles from '../styles/UserProfile.module.css'
import Link from 'next/link'

import router from 'next/router'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserProfile({token}) {
    const [dataUser, setData] = useState([]);
    useEffect(() => {
       
        async function getData() {
            const {data: res} = await axios.get('https://api.lemes.my.id/user/profile', {
                headers : {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
                
            })
            setData(res);
            console.log(res);  
        }
        getData();
    }, []);

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
                <title>User Profile</title>
            </Head>

            <main className={styles.main}>
                <div>
                    <p className={styles.judul}>USER Profile</p>
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
                            {dataUser && (
                                <div>
                                    <p className={styles.text}>Full name: {dataUser.full_name}</p>
                                    <p className={styles.text}>Username: {dataUser.username}</p>
                                    <p className={styles.text}>Email: {dataUser.email}</p>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    
                    
                </div>

                    
                <button  className={styles.logoutButton} onClick={() => handleSubmit()}>LOGOUT</button>


                <nav className={styles.icon}>
                    <Link href="menuutama" className={styles.iconbar}>
                        <p><FaHome/></p>
                    </Link>
                    <Link href="#" className={styles.iconbar}>
                        <p><MdLibraryBooks/></p>
                    </Link>
                    <div className={styles.plus}>
                        <Link href="informasikolamdanlele" className={styles.tombolplus}>
                            <p><BsPlusLg/></p>
                        </Link>
                    </div>
                    <Link href="notifikasi" className={styles.iconbar}>
                        <p><FaBell/></p>
                    </Link>
                    <Link href="UserProfile" className={styles.iconbar}>
                        <p><GoPerson/></p>
                    </Link>
                </nav>

            </main>
        </div>
  )
}

export function getServerSideProps({req, res}){
    return {props: {token : req.cookies.token || ""} };
}

