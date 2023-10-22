const db = require("../config/db");

const getAllHire = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
 *
FROM 
  hire
 WHERE hire.${searchBy} ILIKE '%${search}%' ORDER BY hire.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const countHire = () => {
  return db.query("SELECT COUNT(*) AS total FROM hire");
};

const getHireId = (hire_id) => {
  return db.query(`SELECT * FROM hire WHERE hire.hire_id=${hire_id}`);
};

const getHireWorkersId = (workers_id) => {
  return db.query(
    `SELECT hire.* FROM hire LEFT JOIN workers ON hire.workers_id = workers.workers_id WHERE hire.workers_id=${workers_id}`
  );
};

const getHireRecruiterId = (recruiter_id) => {
  return db.query(
    `SELECT hire.* FROM hire LEFT JOIN recruiter ON hire.recruiter_id = recruiter.recruiter_id WHERE hire.recruiter_id=${recruiter_id}`
  );
};

const createHire = (data) => {
  const {
    objective,
    fullName,
    email,
    handphone,
    description,
    workers_id,
    recruiter_id,
  } = data;
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO hire(objective,fullName,email,handphone,description, workers_id,recruiter_id) VALUES('${objective}','${fullName}','${email}','${handphone}','${description}',${workers_id},${recruiter_id})`,
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

const updateHire = (data, hire_id) => {
  const { description } = data;
  return db.query(
    `UPDATE hire SET description='${description}' WHERE hire.hire_id = ${hire_id}`
  );
};

const deleteHire = (hire_id) => {
  return db.query(`DELETE FROM hire WHERE hire.hire_id=${hire_id}`);
};

module.exports = {
  getAllHire,
  countHire,
  getHireId,
  getHireWorkersId,
  getHireRecruiterId,
  createHire,
  updateHire,
  deleteHire,
};
