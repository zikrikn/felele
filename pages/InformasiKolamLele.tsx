import Head from 'next/head'
import { FaArrowLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import styles from '../styles/InformasiKolamLele.module.css'
import Link from 'next/link'


import axios from "axios";
import { useState, useEffect} from 'react';
import Router from 'next/router';

export default function InformasiKolamLele({token}) {


    const apiEndPoint = 'https://api.lemes.my.id/kolam/inputdata';

    const [namaKolam, setNamaKolam] = useState('')
    const [jumlahLele, setJumlahLele] = useState('')
    const [beratLele, setBeratLele] = useState('')
    const [stock, setStock] = useState('')

    const [errorJml, setErrorJml] = useState('')
    const [errorBerat, setErrorBerat] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorTAT, setErrorTAT] = useState('')

    const handleNama = (e) => {
        setNamaKolam(e.target.value)
    }

    const handleJumlah = (e) => {
        setJumlahLele(e.target.value)
    }
    const handleBerat = (e) => {
        setBeratLele(e.target.value)
    }
    const handleStock = (e) => {
        setStock(e.target.value)
    }   

    function handleApi(e){
        e.preventDefault();
        console.log({namaKolam, jumlahLele, beratLele, stock})
        console.log({token})
        axios.post(apiEndPoint, {
            "nama_kolam": namaKolam,
            "jumlah_lele": jumlahLele,
            "berat_lele": beratLele,
            "stock_pakan": stock
        }, {
            headers : {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                alert('data berhasil ditambahkan')
                console.log(res.data)
                if (namaKolam.length < 4){
                    setErrorName("Nama Kolam harus lebih dari 4 karakter")
                }else{
                    setErrorName(" ")
                    Router.push('/menuutama')
                }
            
            })
            .catch(error => { 
                console.log(error);
            });
    }
    
    return (
        <div>
            <Head>
                <title>Informasi Kolam Dan Lele</title>
            </Head>

            <main className={styles.main}>
                <div className={styles.arrowback}>
                    <Link href="login">
                        <p className={styles.back}><FaArrowLeft/> Back</p>
                    </Link>
                    <Link href="menuutama">
                        <p className={styles.next}>Skip <FaArrowRight/></p>
                    </Link>
                </div>

                <div>
                    <p className={styles.judul}>Informasi Lele Dan Kolam</p>
                </div>

                <form className={styles.formInput}>
                    <p className={styles.text}>Nama Kolam</p>
                    <input onChange={handleNama} id="NamaKolam" value={namaKolam} type="text" placeholder='Input Here' className={styles.inputText}/>
                    {errorName && <p className="error">{errorName}</p>}

                    <p className={styles.text}>Berat Lele</p>
                    <input onChange={handleBerat} id="BeratLele" value={beratLele} type="number" placeholder='Input Here' className={styles.inputText}/>
                    {errorBerat && <p className="error">{errorBerat}</p>}

                    <p className={styles.text}>Jumlah Lele</p>
                    <input onChange={handleJumlah} id="JumlahLele" value={jumlahLele} type="number" placeholder='Input Here' className={styles.inputText}/>
                    {errorJml && <p className="error">{errorJml}</p>}

                    <p className={styles.text}>Stock Pakan</p>
                    <input onChange={handleStock} id="stockPakan" value={stock} type="number" placeholder='Input Here' className={styles.inputDate} />
                    {errorTAT && <p className="error">{errorTAT}</p>}

                    <input onClick={handleApi} type="submit" placeholder='SUBMIT' className={styles.submitButton}/>
                    
                </form>

                
            </main>
        </div>
    )
}

export function getServerSideProps({req, res}){
    return {props: {token : req.cookies.token || ""} };
}
