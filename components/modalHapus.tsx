import React, { useState } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const [namaKolam, setNamaKolam] = useState('')

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Hapus Kolam</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-body">
            <h3>Masukkan Nama Kolam Yang ingin dihapus</h3>
            <input type="text" placeholder='input here' value={namaKolam}/>
            <button onClick={() => setIsOpen(false)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;