const db = require("../config/db");

const getAllRecruiter = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
 *
FROM 
  recruiter
 WHERE recruiter.${searchBy} ILIKE '%${search}%' ORDER BY recruiter.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const countRecruiter = () => {
  return db.query("SELECT COUNT(*) AS total FROM recruiter");
};

const getById = (recruiter_id) => {
  return db.query(
    `SELECT * FROM recruiter WHERE recruiter.recruiter_id=${recruiter_id}`
  );
};

const findUserEmail = (email) => {
  return new Promise((resolve, reject) =>
    db.query(
      `SELECT * FROM recruiter WHERE recruiter.email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err.message);
        }
      }
    )
  );
};

const createRecruiter = (data) => {
  const { nama, email, perusahaan, jabatan, phone, password } = data;
  const role = 0;
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO recruiter(nama, email,perusahaan,jabatan,phone, password,role) VALUES('${nama}','${email}','${perusahaan}','${jabatan}','${phone}','${password}',${role})`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err.message);
        }
      }
    )
  );
};

const loginRecruiter = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recruiter WHERE email = '${email}'`, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const updateRecruiter = (data, recruiter_id) => {
  const {
    nama,
    image,
    bidang,
    location,
    description,
    perusahaan,
    jabatan,
    instagram,
    linkedin,
  } = data;
  return db.query(
    `UPDATE recruiter SET nama='${nama}',image='${image}',bidang='${bidang}',location='${location}',description='${description}',perusahaan='${perusahaan}',jabatan='${jabatan}',instagram='${instagram}',linkedin='${linkedin}' WHERE recruiter.recruiter_id = ${recruiter_id}`
  );
};

const deleteRecruiter = (recruiter_id) => {
  return db.query(
    `DELETE FROM recruiter WHERE recruiter.recruiter_id=${recruiter_id}`
  );
};

module.exports = {
  getAllRecruiter,
  countRecruiter,
  getById,
  createRecruiter,
  updateRecruiter,
  loginRecruiter,
  deleteRecruiter,
  findUserEmail,
};
