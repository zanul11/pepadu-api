const request = require('request')
const db = require('../config/database')

let controller = {}

controller.storeDataRegistrasi = async (req, res) => {
    let nomor_hp = takeOnlyNumber(req.body.nomor_hp).toString()
    let kode_validasi = Math.floor(1000 + Math.random() * 9000).toString()

    // Jika nomor HP telah terdaftar
    let query_cek_terdaftar = "SELECT * FROM pengaduan.tm_pepadu WHERE id='" + nomor_hp + "'"
    await db.query(query_cek_terdaftar, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                kirimSms(nomor_hp, data[0].kode_validasi)
                res.json({
                    status: 200,
                    error: true,
                    message: "Nomor HP Telah Terdaftar"
                })
            } else {
                // Jika nomor HP belum terdaftar
                let query_daftar = "INSERT INTO pengaduan.tm_pepadu set id='" + nomor_hp + "', kode_validasi='" + kode_validasi + "'"
                db.query(query_daftar, (err, data) => {
                    if (!err) {
                        kirimSms(nomor_hp, kode_validasi)
                        res.status(201).json({
                            status: 201,
                            error: false,
                            message: "Proses Pendaftaran Berhasil"
                        })
                    }
                })
            }
        }
    })
}

controller.validasi = async (req, res) => {
    let nomor_hp = takeOnlyNumber(req.body.nomor_hp).toString()
    let kode_validasi = takeOnlyNumber(req.body.kode_validasi).toString()

    let query = "SELECT * FROM pengaduan.tm_pepadu WHERE id='" + nomor_hp + "' AND kode_validasi='" + kode_validasi + "'"
    await db.query(query, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                let query_update = "UPDATE pengaduan.tm_pepadu SET validasi = 1, status = 1 WHERE id = '" + nomor_hp + "' AND kode_validasi = '" + kode_validasi + "'"
                db.query(query_update, (err, data) => {
                    if (data) {
                        res.status(201).json({
                            status: 200,
                            error: false,
                            message: "Proses Update Data Berhasil"
                        })
                    } else {
                        res.json({
                            status: 200,
                            error: true,
                            message: err
                        })
                    }
                })
            } else {
                res.json({
                    status: 200,
                    error: true,
                    message: "Proses Validasi Gagal"
                })
            }
        }
    })
}

controller.profil = async (req, res) => {
    let nomor_hp = takeOnlyNumber(req.body.nomor_hp).toString()
    let nama = req.body.nama
    let alamat = req.body.alamat

    let query = "SELECT * FROM pengaduan.tm_pepadu WHERE id='" + nomor_hp + "'"
    await db.query(query, (err, data) => {
        if (data) {
            res.status(201).json({
                status: 200,
                error: false,
                message: "Proses Update Data Berhasil"
            })
        } else {
            res.json({
                status: 200,
                error: true,
                message: err
            })
        }
    })
}

function kirimSms(nomor_hp, pesan) {
    let kirim_pesan = "Your code : " + pesan
    request("http://45.32.118.255/sms/smsmasking.php?username=itpdam&key=f0325d3bd4aa4dfc36a94a73e41e22c8&number=" + nomor_hp + "&message=" + kirim_pesan)
}

function takeOnlyNumber(data) {
    return data.replace(/\D/g, '')
}

module.exports = controller
