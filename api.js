const dataCatatan = {
    title: 'Judul Catatan Baru',
    datetime: '2024-06-20 12:00:00',
    note: 'Isi catatan baru...'
  };
  
  fetch('http://localhost:7000/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataCatatan)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Gagal menambahkan catatan');
    }
    return response.json();
  })
  .then(data => {
    console.log('Catatan baru berhasil ditambahkan:', data);
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });
  