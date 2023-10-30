const {
  getAllHire,
  countHire,
  getHireId,
  getHireWorkersId,
  getHireRecruiterId,
  createHire,
  updateHire,
  deleteHire,
} = require("../model/hireModel");
const cloudinary = require("../config/cloudinaryConfig");

const userController = {
  getHire: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "objective",
      search: search || "",
      sortBy: sortBy || "hire_id",
      sort: sort || "ASC",
      limit: limit || 6,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countHire();
      const totalData = parseInt(count.total);

      const totalPage = Math.ceil(totalData / data.limit);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await getAllHire(data);
      res.status(200).json({
        message: "hire get all by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "hire not found",
      });
    }
  },

  getHireById: async (req, res) => {
    try {
      const hire_id = req.params.hire_id;
      const result = await getHireId(hire_id);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting hire",
      });
    }
  },

  getHireByWorkersId: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const result = await getHireWorkersId(workers_id);
      //   console.log(result.rows);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting hire",
      });
    }
  },

  getHireByRecruiterId: async (req, res) => {
    try {
      const recruiter_id = req.params.recruiter_id;
      const result = await getHireRecruiterId(recruiter_id);
      //   console.log(result.rows);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting hire",
      });
    }
  },

  createdHire: async (req, res) => {
    try {
      const {
        objective,
        fullname,
        email,
        handphone,
        description,
        workers_id,
        recruiter_id,
      } = req.body;

      const hire = {
        objective,
        fullname,
        email,
        handphone,
        description,
        workers_id,
        recruiter_id,
      };
      //   console.log(hire);
      const hireData = await createHire(hire);
      //   console.log(hireData);
      res.status(200).json({
        message: "hire has been created successfully",
        data: hireData,
      });
    } catch (err) {
      //   console.log(err);
      res.status(400).json({
        message: "Error creating hire",
        err: err.message,
      });
    }
  },

  updatedHire: async (req, res) => {
    try {
      const hire_id = req.params.hire_id;
      //   console.log(req.file);
      const result = await getHireId(Number(hire_id));
      const hireData = result.rows[0];
      const data = {
        description: req.body.description || hireData.description,
      };

      await updateHire(data, Number(hire_id));

      res.status(200).json({
        message: "Update hire Successfull",
      });
    } catch (error) {
      res.status(400).json({
        message: "Update hire Error",
        error: error.message,
      });
    }
  },

  deletedHire: async (req, res) => {
    try {
      const hire_id = req.params.hire_id;
      const result = await deleteHire(hire_id);
      const data = await cloudinary.uploader.destroy(result);
      res.json({
        message: "deleted hire Successfull",
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
