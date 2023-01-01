import Head from 'next/head'
import { BsTrashFill } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import styles from '../styles/menuutama.module.css'
import Link from 'next/link'
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function menuutama({token}) {
  
    const [dataKolam, setData] = useState([]);
    useEffect(() => { 
        async function getData() {
            try {
                const {data: res} = await axios.get('https://api.lemes.my.id/kolam/info/all', {
                    headers : {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                    
                })
                setData(res);
                console.log(res); 
            }catch(error){
                console.log(error)
            }
             
        }
        getData();
    }, []);

    const apiDel = 'https://api.lemes.my.id/kolam/delete'
    const handleDelete = async (dataKolam) => {
        const result = window.confirm('Apakah Anda yakin?')
        if (result) {
            await axios.delete(`${apiDel}?nama_kolam=${dataKolam.nama_kolam}`,{
                headers : {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            // setData(dataKolam.filter((p) => p.key !== p.key))
        } else {
            console.log("tidak jadi")
        }
    }
    
    return (
        <div>
            <Head>
                <title>Menu Utama</title>
            </Head>

            <main className={styles.main}>
            <div className={styles.MenuUtama}>      
                <div className={styles.toolsbaratas}> 
                    <input type="text" placeholder="Search" className={styles.Search}/> 
                </div>              
                <div className={styles.restockpakan}>
                    <Link className={styles.restock} href="restockpakan">Pengingat Restock Pakan <BsPlusLg/></Link>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr className={styles.judulTable}>
                            <th >Informasi List Kolam</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                       {dataKolam.map((dataKolam, index) =>
                            <tr key={dataKolam.key} className={styles.bodyTabel}>
                                <div className={styles.nomorKolam}>
                                    <td>Kolam ke {index +1}</td>
                                    <button onClick={() => handleDelete(dataKolam)} className={styles.deleteButton}>Hapus</button>
                                </div>
                                <td className={styles.td}>Nama Kolam : {dataKolam.nama_kolam}</td>
                                <td className={styles.td}>Jumlah Lele : {dataKolam.jumlah_lele}</td>
                                <td className={styles.td}>Berat Lele : {dataKolam.berat_lele}</td>
                                <td className={styles.td}>Jumlah Pakan Harian : {dataKolam.jumlah_pakan_harian}</td>
                                <td className={styles.td}>Waktu Panen : {dataKolam.waktu_panen}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


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