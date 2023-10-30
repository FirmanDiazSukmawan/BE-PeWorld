const db = require("../config/db");

const getAllWorkers = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
 workers.*
 FROM 
     workers
 WHERE workers.${searchBy} ILIKE '%${search}%' ORDER BY workers.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const countWorkers = () => {
  return db.query("SELECT COUNT(*) AS total FROM workers");
};

const getById = (workers_id) => {
  return db.query(
    `SELECT 
    workers.*

   FROM 
     workers
      WHERE workers.workers_id=${workers_id}`
  );
};

const findUserEmail = (email) => {
  return new Promise((resolve, reject) =>
    db.query(
      `SELECT * FROM workers WHERE workers.email = '${email}'`,
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

const createWorkers = (data) => {
  const { nama, email, phone, password } = data;
  const role = 1;
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO workers(nama, email,phone, password,role ) VALUES('${nama}','${email}','${phone}','${password}',${role})`,
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

const loginWorkers = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM workers WHERE email = '${email}'`, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const updateWorkers = (data, workers_id) => {
  const {
    nama,
    image,
    profesi,
    location,
    description,
    company,
    instagram,
    github,
    gitlab,
  } = data;
  return db.query(
    `UPDATE workers SET nama='${nama}',image='${image}',profesi='${profesi}',location='${location}',description='${description}',company='${company}',instagram='${instagram}',github='${github}',gitlab='${gitlab}' WHERE workers.workers_id = ${workers_id}`
  );
};

const updateSkillWorkers = (skills, workers_id) => {
  return db.query(
    `UPDATE workers SET skills='${skills}'WHERE workers.workers_id = ${workers_id}`
  );
};

const deleteWorkers = (workers_id) => {
  return db.query(`DELETE FROM workers WHERE workers.workers_id=${workers_id}`);
};

module.exports = {
  getAllWorkers,
  countWorkers,
  getById,
  createWorkers,
  updateWorkers,
  updateSkillWorkers,
  loginWorkers,
  deleteWorkers,
  findUserEmail,
};
