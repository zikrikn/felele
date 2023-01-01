import Head from 'next/head'
import { FaHome } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import styles from '../styles/notifikasi.module.css'
import Link from 'next/link'

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function notifikasi({token}) {
    const [notif, setNotif] = useState([])
    useEffect(() => { 
        async function getNotif() {
            try {
                const {data: res} = await axios.get('https://api.lemes.my.id/user/notifikasi', {
                    headers : {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                    
                })
                setNotif(res);
                console.log(res); 
            }catch(error){
                console.log(error)
            }
             
        }
        getNotif();
    }, []);

    return (
        <div>
            <Head>
                <title >notifikasi</title>
            </Head>

            <main className={styles.main}>
                <div>
                    <p className={styles.NamePage}>Notifikasi</p>
                </div>
                <table className={styles.table}>
                    <thead>

                    </thead>
                    <tbody>
                       {notif.map((notif) =>
                            <tr key={notif.key} className={styles.tr}>
                                <td className={styles.judulNotif}>{notif.nama_kolam}</td>
                                
                                <td className={styles.td}>{notif.messages}</td>
                                <td className={styles.waktu}>{notif.waktu_keluar}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* <hr className={styles.hr}/>
                <div className={styles.notifpakan}>
                    <p className={styles.textnotif}>Waktu Memberi Pakan</p>
                    <p className={styles.text1}>Now</p>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.kolam1}>
                    <p className={styles.text}>Segera Restock Pakan Kolam 1</p>
                    <p className={styles.text1}>26 May</p>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.kolam2}>
                    <p className={styles.text}>Segera Restock Pakan Kolam 2</p>
                    <p className={styles.text1}>22 May</p>
                </div>
                <hr className={styles.hr}/> */}


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