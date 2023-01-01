import Head from 'next/head'
import { FaArrowLeft } from 'react-icons/fa'
import styles from '../styles/signup.module.css'
import Link from 'next/link'

import axios from "axios";
import { useState } from 'react';
import Router from 'next/router';


export default function signup() {
  const apiEndPoint = 'https://api.lemes.my.id/auth/signup';

  const [data, setData] = useState({
    fullName: "",
    email : "",
    username: "",
    password: ""
  })

  const [errorusername, setErrorusername] = useState('')
  const [errorPass, setErrorPass] = useState('')
  const [errorName, setErrorName] = useState('')


  function Submit(e){
    e.preventDefault();
    if (data.fullName.length == 0 && data.username.length == 0 && data.password.length == 0){
      setErrorName("Nama Tidak Boleh kosong")
      setErrorusername("Username Tidak Boleh Kosong")
      setErrorPass("password Tidak Boleh Kosong")
    }else if (data.fullName.length != 0 && data.username.length == 0 && data.password.length == 0){
      setErrorName("")
      setErrorusername("Username Tidak Boleh Kosong")
      setErrorPass("password Tidak Boleh Kosong")
    }else if (data.fullName.length == 0 && data.username.length != 0 && data.password.length == 0){
      setErrorName("Nama Tidak Boleh kosong")
      setErrorusername("")
      setErrorPass("password Tidak Boleh Kosong")
    }else if (data.fullName.length == 0 && data.username.length == 0 && data.password.length != 0){
      setErrorName("Nama Tidak Boleh kosong")
      setErrorusername("Username Tidak Boleh Kosong")
      setErrorPass("")
    }else if (data.fullName.length < 4 && data.username.length < 4 && data.password.length < 4){
      setErrorName("Nama harus lebih dari 4 karakter")
      setErrorusername("Username harus lebih dari 4 karakter")
      setErrorPass("password harus lebih dari 4 karakter")
    }else if (data.fullName.length > 4 && data.username.length < 4 && data.password.length < 4){
      setErrorName("")
      setErrorusername("Username harus lebih dari 4 karakter")
      setErrorPass("password harus lebih dari 4 karakter")
    }else if (data.fullName.length < 4 && data.username.length > 4 && data.password.length < 4){
      setErrorName("Nama harus lebih dari 4 karakter")
      setErrorusername("")
      setErrorPass("password harus lebih dari 4 karakter")
    }else if (data.fullName.length < 4 && data.username.length < 4 && data.password.length > 4){
      setErrorName("Nama harus lebih dari 4 karakter")
      setErrorusername("Username harus lebih dari 4 karakter")
      setErrorPass("")

    }else{
      axios.post(apiEndPoint, {
        "full_name": data.fullName,
        "email": data.email,
        "username": data.username,
        "password": data.password
      })
        .then(res => {
          console.log(res.data)
          setErrorPass(" ")
          Router.push('login')
          
         
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function handle(e) {
    const newData= {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  return (
    <div>
        <Head>
            <title>Sign Up</title>
        </Head>

        <main className={styles.main}>
            <div className={styles.arrowback}>
              <Link href="login">
                  <p className={styles.back}><FaArrowLeft/> Back</p>
              </Link>
            </div>

            <div>
              <p className={styles.judul}>Sign up</p>
              <p className={styles.textPanjang}>make a new account</p>
            </div>

            <form onSubmit={(e) => Submit(e)} className={styles.formInput} >
              
              <p className={styles.text}>Nama</p>
              <input onChange={(e) => handle(e)} id="fullName" value={data.fullName} type="text" className={styles.nama} placeholder="nama" />
              {errorName && <p className="error">{errorName}</p>}

              <p className={styles.text}>Username</p>
              <input onChange={(e) => handle(e)} id="username" value={data.username} type="text" className={styles.username} placeholder="username"/>
              {errorusername && <p className="error">{errorusername}</p>}

              <p className={styles.text}>Email</p>
              <input onChange={(e) => handle(e)} id="email" value={data.email} type="email" className={styles.username} placeholder="email"/>

              <p className={styles.text}>password</p>
              <input onChange={(e) => handle(e)} id="password" value={data.password} type="password" className={styles.password} placeholder="password" />
              {errorPass && <p className="error">{errorPass}</p>}
              <br />


              <br />
              <input type="submit" className={styles.submit} placeholder="SUBMIT" />
            </form>
        </main>
    </div>
  )
}

