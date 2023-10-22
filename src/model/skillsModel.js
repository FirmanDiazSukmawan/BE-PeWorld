const db = require("../config/db");

const getAllSkills = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
 *
FROM 
  skills
 WHERE skills.${searchBy} ILIKE '%${search}%' ORDER BY skills.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const countSkills = () => {
  return db.query("SELECT COUNT(*) AS total FROM skills");
};

const getSkillsId = (skills_id) => {
  return db.query(`SELECT * FROM skills WHERE skills.skills_id=${skills_id}`);
};

const getSkillsWorkersId = (workers_id) => {
  return db.query(
    `SELECT skills.* FROM skills LEFT JOIN workers ON skills.workers_id = workers.workers_id WHERE skills.workers_id=${workers_id}`
  );
};

const createSkills = (data) => {
  const { skill, workers_id } = data;
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO skills(skill,workers_id) VALUES('${skill}',${workers_id})`,
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

const updateSkills = (data, skills_id) => {
  const { skill } = data;
  return db.query(
    `UPDATE skills SET skill='${skill}' WHERE skills.skills_id = ${skills_id}`
  );
};

const deleteSkills = (skills_id) => {
  return db.query(`DELETE FROM skills WHERE skills.skills_id=${skills_id}`);
};

module.exports = {
  getAllSkills,
  countSkills,
  getSkillsId,
  getSkillsWorkersId,
  createSkills,
  updateSkills,
  deleteSkills,
};
