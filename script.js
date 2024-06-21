// // Menggunakan fetch
// fetch('/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       title: 'My Note Title',
//       datetime: '2024-06-21T10:00:00Z',
//       note: 'This is the content of the note'
//     })
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));
  
//   // Menggunakan axios
//   axios.post('/notes', {
//     title: 'My Note Title',
//     datetime: '2024-06-21T10:00:00Z',
//     note: 'This is the content of the note'
//   })
//   .then(response => console.log(response.data))
//   .catch(error => console.error('Error:', error));
  

document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const datetime = document.getElementById('datetime').value;
    const note = document.getElementById('note').value;

    const data = {
        title: title,
        datetime: datetime,
        note: note
    };

    // Menggunakan fetch
    fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Note saved successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save note: ' + (error.error || 'Unknown error'));
    });

    // Atau menggunakan axios
    
    axios.post('/notes', data)
    .then(response => {
        console.log(response.data);
        alert('Note saved successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save note: ' + (error.response.data.error || 'Unknown error'));
    });
    
});
