const db = require("../config/db");

const getAllPortofolio = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
 *
FROM 
  portofolio
 WHERE portofolio.${searchBy} ILIKE '%${search}%' ORDER BY portofolio.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const countPortofolio = () => {
  return db.query("SELECT COUNT(*) AS total FROM portofolio");
};

const getPortofolioId = (portofolio_id) => {
  return db.query(
    `SELECT * FROM portofolio WHERE portofolio.portofolio_id=${portofolio_id}`
  );
};

const getPortofolioWorkersId = (workers_id) => {
  return db.query(
    `SELECT portofolio.* FROM portofolio LEFT JOIN workers ON portofolio.workers_id = workers.workers_id WHERE portofolio.workers_id=${workers_id}`
  );
};

const createPortofolio = (data) => {
  const { namaAplikasi, linkRepo, typePortofolio, image, workers_id } = data;
  return new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO portofolio(namaAplikasi, linkRepo,typePortofolio,image,workers_id) VALUES('${namaAplikasi}','${linkRepo}','${typePortofolio}','${image}',${workers_id})`,
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

const updatePortofolio = (data, portofolio_id) => {
  const { namaAplikasi, linkRepo, typePortofolio, image } = data;
  return db.query(
    `UPDATE portofolio SET namaAplikasi='${namaAplikasi}',linkRepo='${linkRepo}',typePortofolio='${typePortofolio}',image='${image}' WHERE portofolio.portofolio_id = ${portofolio_id}`
  );
};

const deletePortofolio = (portofolio_id) => {
  return db.query(
    `DELETE FROM portofolio WHERE portofolio.portofolio_id=${portofolio_id}`
  );
};

module.exports = {
  getAllPortofolio,
  countPortofolio,
  getPortofolioId,
  getPortofolioWorkersId,
  createPortofolio,
  updatePortofolio,
  deletePortofolio,
};
