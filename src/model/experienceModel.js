const db = require("../config/db");

const getAllExperience = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
 *
FROM 
  experience
 WHERE experience.${searchBy} ILIKE '%${search}%' ORDER BY experience.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const countExperience = () => {
  return db.query("SELECT COUNT(*) AS total FROM experience");
};

const getExperienceId = (experience_id) => {
  return db.query(
    `SELECT * FROM experience WHERE experience.experience_id=${experience_id}`
  );
};

const getExperienceWorkersId = (workers_id) => {
  return db.query(
    `SELECT experience.* FROM experience LEFT JOIN workers ON experience.workers_id = workers.workers_id WHERE experience.workers_id=${workers_id}`
  );
};

const createExperience = (data) => {
  const { profesi, company, dateIn, dateOut, description, image, workers_id } =
    data;
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO experience(profesi, company,dateIn,dateOut,description,image,workers_id) VALUES('${profesi}','${company}','${dateIn}','${dateOut}','${description}','${image}',${workers_id})`,
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

const updateExperience = (data, experience_id) => {
  const { profesi, company, dateIn, dateOut, description, image } = data;

  return db.query(
    `UPDATE experience SET profesi='${profesi}',company='${company}',dateIn='${dateIn}',dateOut='${dateOut}',description='${description}',image='${image}' WHERE experience.experience_id = ${experience_id}`
  );
};

const deleteExperience = (experience_id) => {
  return db.query(
    `DELETE FROM experience WHERE experience.experience_id=${experience_id}`
  );
};

module.exports = {
  getAllExperience,
  countExperience,
  getExperienceId,
  getExperienceWorkersId,
  createExperience,
  updateExperience,
  deleteExperience,
};
