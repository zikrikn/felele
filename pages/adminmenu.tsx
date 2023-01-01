import Head from 'next/head'
import { ImHome } from 'react-icons/im'
import { BsPencilFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';

import styles from '../styles/Adminmenu.module.css'
import Link from 'next/link'

export default function adminmenu() {
  return (
    <div>
        <Head>
            <title>adminmenu</title>
        </Head>
        <main className={styles.main}>
            <div className={styles.Adminmenu}>
                <p className={styles.judul}>Admin Menu</p>
                <div className={styles.pedoman}>
                    <Link className={styles.text} href="">Tambah Pedoman </Link>
                </div>
                <div className={styles.berita}>
                    <Link className={styles.text} href="">Tambah Berita </Link>
                </div>
            </div>
            <nav className={styles.icon}>
                <Link href="adminmenu" className={styles.iconbar}>
                    <p><ImHome/></p>
                </Link>
                <Link href="#" className={styles.iconbar}>
                    <p><BsPencilFill/></p>
                </Link>
                <Link href="AdminProfile" className={styles.iconbar}>
                    <p><BsFillPersonFill/></p>
                </Link>
            </nav>
        </main>
    </div>
  )
}
