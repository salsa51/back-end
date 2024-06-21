const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');
// console.log(db);
// console.log(typeof db.query);

const mysql = require('mysql2');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Database connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});
//     // Endpoint untuk menambahkan catatan baru
//     app.post('/notes', (req, res) => {
//         // Mendapatkan data dari body permintaan
//         const { title, datetime, note } = req.body;
        
//         // Kueri SQL untuk menambahkan catatan baru
//         const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
        
//         // Menjalankan kueri SQL
//         connection.query(query, [title, datetime, note], (error, results) => {
//             if (error) {
//                 // Jika terjadi kesalahan, kirim respon dengan kode status 500
//                 return res.status(500).send(error);
//             }
//             // Jika berhasil, kirim respon dengan kode status 201 dan data catatan yang baru ditambahkan
//             res.status(201).send({ id: results.insertId, title, datetime, note });
//         });
//     });
// });

// // Jangan lupa untuk menutup koneksi setelah selesai menggunakannya
// connection.end();

// Create a new note
app.post('/notes', (req, res) => {
    console.log('Received data:', req.body);
    const { title, datetime, note } = req.body;
   
    if (!title || !datetime || !note) {
        return res.status(400).send({ error: "All fields (title, datetime, note) are required" });
      }    
   
   
    const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';


    connection.query(query, [title, datetime, note], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).send({ id: results.insertId, title, datetime, note });
    });
});

// Get all notes
app.get('/notes', (req, res) => {
    const query = 'SELECT * FROM notes';
    db.query(query, (error, results) => {
        if (error) return res.status(500).send(error);
        res.status(200).send(results);
    });
});

// Get a single note by ID
app.get('/notes/:id', (req, res) => {
    const query = 'SELECT * FROM notes WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
        if (error) return res.status(500).send(error);
        if (results.length === 0) return res.status(404).send({ message: 'Note not found' });
        res.status(200).send(results[0]);
    });
});

// Update a note
app.put('/notes/:id', (req, res) => {
    const { title, datetime, note } = req.body;
    const query = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    db.query(query, [title, datetime, note, req.params.id], (error, results) => {
        if (error) return res.status(500).send(error);
        res.status(200).send({ message: 'Note updated successfully' });
    });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    const query = 'DELETE FROM notes WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
        if (error) return res.status(500).send(error);
        res.status(200).send({ message: 'Note deleted successfully' });
    });
});

// Start the server
const PORT = process.env.APP_PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
