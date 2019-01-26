// Joi validator
const Joi = require('joi');
// Express package
const express = require('express');
// Get si package
const app = express();
// Sampel data
const belajars = [{
    id: 1,
    nama: 'Anam'
}, {
    id: 2,
    nama: 'Nuzul'
}, {
    id: 3,
    nama: 'Asep'
}];
// Entah apa
app.use(express.json());
// Awal belajar
app.get('/', (req, res) => {
    res.send('Selamat datang!!!');
});
// Get All Data
app.get('/api/belajars', (req, res) => {
	// Menampilkan datanya
    res.send(belajars);
});
// Insert
app.post('/api/belajars', (req, res) => {
	// validasi
    const { error } = validasi(req.body);
    // ketika error
    if (error) return res.status(404).send(error.details[0].message);
    // array untuk menambah
    const belajar = {
        id: belajars.length + 1,
        nama: req.body.nama
    };
    // Menambah
    belajars.push(belajar);
    // Outputnya
    res.send(belajar);
});
// Get one data
app.get('/api/belajars/:id', (req, res) => {
    // Cek id nya apakah ada atau tidak
    const belajar = belajars.find(c => c.id === parseInt(req.params.id));
    // Jika data tidak ditemukan
    if (!belajar) return res.status(404).send('Data tidak ditemukan..');
    // Outputnya
    res.send(belajar);
});
// Update
app.put('/api/belajars/:id', (req, res) => {
    // Cek id nya apakah ada atau tidak
    const belajar = belajars.find(c => c.id === parseInt(req.params.id));
    // Jika data tidak ditemukan
    if (!belajar) return res.status(404).send('Data tidak ditemukan..');
    // Memvalidasi inputan :-D
    const { error } = validasi(req.body);
    // Ketika error
    if (error) return res.status(404).send(error.details[0].message);
    // Mengubah namanya
    belajar.nama = req.body.nama;
    // Outputnya
    res.send(belajar);
});
//Delete
app.delete('/api/belajars/:id', (req, res) => {
    // Cek id nya apakah ada atau tidak
    const belajar = belajars.find(c => c.id === parseInt(req.params.id));
    // Jika data tidak ditemukan
    if (!belajar) res.status(404).send('Data tidak ditemukan..');
    // cari index dari id tsb
    const index = belajars.indexOf(belajar);
    // Aksi menghapusnya :-D
    belajars.splice(index, 1);
    // Outputnya
    res.send(belajar);
});

// Funsi dari validasi :-D
const validasi = (belajar) => {
    const schema = {
        nama: Joi.string().min(3).required()
    };
    return Joi.validate(belajar, schema);
}
// Mengikuti port bawaan os
const port = process.env.PORT || 3000;
// Outputnya :-D
app.listen(port, () => console.log(`Berjalan di port ${port} ...`));