const {
  getAllPortofolio,
  countPortofolio,
  getPortofolioId,
  getPortofolioWorkersId,
  createPortofolio,
  updatePortofolio,
  deletePortofolio,
} = require("../model/portofolioModel");
const cloudinary = require("../config/cloudinaryConfig");

const userController = {
  getPortofolio: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "namaAplikasi",
      search: search || "",
      sortBy: sortBy || "portofolio_id",
      sort: sort || "ASC",
      limit: limit || 6,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countPortofolio();
      const totalData = parseInt(count.count);

      const totalPage = Math.ceil(totalData / limit);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await getAllPortofolio(data);
      res.status(200).json({
        message: "portofolio get all by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "portofolio not found",
      });
    }
  },

  getPortofolioById: async (req, res) => {
    try {
      const portofolio_id = req.params.portofolio_id;
      const result = await getPortofolioId(portofolio_id);
      res.json({
        data: result.rows[0],
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting portofolio",
      });
    }
  },

  getPortofolioByWorkersId: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const result = await getPortofolioWorkersId(workers_id);
      //   console.log(result.rows);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting portofolio",
      });
    }
  },

  createdPortofolio: async (req, res) => {
    try {
      const { namaAplikasi, linkRepo, typePortofolio, workers_id } = req.body;

      if (!req.file || !req.file.path) {
        return res.status(401).json({
          message: "You need to upload an image",
        });
      }

      const portofolioImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "portofolio",
      });

      const portofolio = {
        namaAplikasi,
        linkRepo,
        typePortofolio,
        image: portofolioImage.secure_url,
        workers_id,
      };
      //   console.log(portofolio);
      const portofolioData = await createPortofolio(portofolio);
      // console.log("portofolio data:", portofolioData);
      res.status(200).json({
        message: "portofolio has been created successfully",
        data: portofolioData,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error creating portofolio",
        err: err.message,
      });
    }
  },

  updatedPortofolio: async (req, res) => {
    try {
      const portofolio_id = req.params.portofolio_id;
      //   console.log(req.file);
      const portofolioImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "portofolio",
      });

      if (!portofolioImage) {
        return res.status(401).json({
          message: "u need upload image",
        });
      }
      const result = await getPortofolioId(Number(portofolio_id));
      const portofolioData = result.rows[0];
      const data = {
        namaAplikasi: req.body.namaAplikasi || portofolioData.namaAplikasi,
        linkRepo: req.body.linkRepo || portofolioData.linkRepo,
        typePortofolio:
          req.body.typePortofolio || portofolioData.typePortofolio,
        image: portofolioImage.secure_url,
      };

      await updatePortofolio(data, Number(portofolio_id));

      res.status(200).json({
        message: "Update Portofolio Successfull",
      });
    } catch (error) {
      res.status(400).json({
        message: "Update Portofolio Error",
        error: error.message,
      });
    }
  },

  deletedPortofolio: async (req, res) => {
    try {
      const portofolio_id = req.params.portofolio_id;
      const result = await deletePortofolio(portofolio_id);
      const data = await cloudinary.uploader.destroy(result);
      res.json({
        message: "deleted Portofolio Successfull",
        data: `id ${data} has been deleted`,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error deleting data",
      });
    }
  },
};

module.exports = userController;
