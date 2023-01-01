import Head from 'next/head'
import { FaArrowLeft } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import styles from '../styles/restockpakan.module.css'
import Link from 'next/link'

import axios from 'axios';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function restockpakan({token}) {
    const apiEndPoint = 'https://api.lemes.my.id/kolam/inputdatarestock';
    const [namaKolam, setNamaKolam] = useState('')

    const handleNama = (e) => {
        setNamaKolam(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(namaKolam)
        axios.post(`${apiEndPoint}?nama_kolam=${namaKolam} `, {
            
        },{
            headers : {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(res => {
                alert('data berhasil ditambahkan')
                console.log(res)
                Router.push('menuutama')
            })
            .catch(error => {
                alert(error.response.data.detail)
                console.log(error.response.data.detail)
            });
    }

    return (
        <div>
            <Head>
                <title>Restockpakan</title>
            </Head>

            <main className={styles.main}>
                <div className={styles.arrowback}>
                    <Link href="menuutama">
                        <p className={styles.back}><FaArrowLeft/> Back</p>
                    </Link>
                </div>
                <div>
                    <p className={styles.restock}>Pengingat Restock Pakan</p>
                </div>
            
                <form onSubmit={handleSubmit} className={styles.formInput}>
                    <p className={styles.text}>Nama Kolam</p>
                    <input onChange={handleNama} id="NamaKolam" value={namaKolam} type="text" placeholder='Input Here' className={styles.jumlah}/>
                    <br/>
                    <input type="submit" className={styles.submit} placeholder="Restock" />
                </form>
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
