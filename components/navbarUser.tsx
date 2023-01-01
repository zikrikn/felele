import { FaArrowLeft } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import styles from '../styles/menuutama.module.css'
import Link from 'next/link';

import React from 'react';

function navbarUser(){
    return(
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
    )
}

export default navbarUser();