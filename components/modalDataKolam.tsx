import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Modal({token}) {
    const [isOpen, setIsOpen] = useState(false);
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

    
    return (
        <div> 
            <div className='listKolam'>
                {dataKolam.map((data, i)=>
                    <button className='klik' onClick={() => setIsOpen(true)}>
                        <h4>Kolam ke {i +1}</h4>
                        
                        <h4>Nama Kolam : {data.nama_kolam}</h4>
                        
                    </button>   
                )}
              
            </div>
            
            
            {isOpen && (
                
                <table>
                    <thead>
            
                    </thead>
                    <tbody>
                    {dataKolam.map((dataKolam) => 
                            <tr key={dataKolam.key}>

                                <td>Jumlah Lele : {dataKolam.jumlah_lele}</td>
                                <td>Berat Lele : {dataKolam.berat_lele}</td>
                                <td>Jumlah Pakan Harian : {dataKolam.jumlah_pakan_harian}</td>
                                <td>Waktu Panen : {dataKolam.waktu_panen}</td>
                            </tr>
                        )}
                    </tbody>
                    <button onClick={() => setIsOpen(false)}>Tutup</button>
                </table>
            )}
        </div>
    );
}

export default Modal;

