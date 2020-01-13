const db = require('../config/database')

let controller = {}

controller.storeDataAduan = async (req, res) => {
    res.status(201).send(req.body)
}

controller.getDataJenis = async (req, res) => {
    let query = "SELECT * FROM pengaduan.tm_jenis_aduan"
    await db.query(query, (err, data) => {
        if (err) {
            res.json({
                status: 200,
                error: true,
                data: err
            })
        } else {
            res.json({
                status: 200,
                error: false,
                data: data
            })
        }
    })
}

controller.getDataWilayah = async (req, res) => {
    let query = "SELECT * FROM pbaru.m_unit"
    await db.query(query, (err, data) => {
        if (err) {
            res.json({
                status: 200,
                error: true,
                data: err
            })
        } else {
            res.json({
                status: 200,
                error: false,
                data: data
            })
        }
    })
}

controller.getDataRiwayat = async (req, res) => {
    let nomor_hp = takeOnlyNumber(req.params.nomor_hp)
    if (nomor_hp.length < 10) {
        res.status(400).json({
            status: 400,
            error: true,
            message: 'Nomor HP tidak valid...'
        })
    } else {
        let query = `SELECT 
                    dTglSelesaiInput AS tgl_input,
                    cIdPel as id,
                    cNama as nama,
                    cAlamat as alamat,
                    cIsiPengaduan as isi_aduan,
                    dTglMulaiKerja as tgl_kerja,
                    dTglSelesaiKerja as tgl_selesai,
                    cLinkFotoSebelum as foto_sebelum,
                    cLinkFotoSedang as foto_kerja,
                    cLinkFotoSesudah as foto_selesai
                FROM 
                    pengaduan.tt_aduan 
                WHERE 
                    cKontak = ${nomor_hp}
                ORDER BY 
                    dTglSelesaiInput DESC
                LIMIT
                    10`
        db.query(query, (err, data) => {
            if (err) {
                res.json({
                    status: 200,
                    error: true,
                    data: err
                })
            } else {
                res.json({
                    status: 200,
                    error: false,
                    data: data
                })
            }
        })
    }
}

function takeOnlyNumber(data) {
    return data.replace(/\D/g, '')
}

module.exports = controller
