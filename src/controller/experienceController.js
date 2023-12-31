const {
  getAllExperience,
  countExperience,
  getExperienceId,
  getExperienceWorkersId,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../model/experienceModel");
const cloudinary = require("../config/cloudinaryConfig");

const userController = {
  getExperience: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "profesi",
      search: search || "",
      sortBy: sortBy || "experience_id",
      sort: sort || "ASC",
      limit: limit || 6,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countExperience();
      const totalData = parseInt(count.total);

      const totalPage = Math.ceil(totalData / data.limit);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await getAllExperience(data);
      res.status(200).json({
        message: "Experience get all by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "Experience not found",
      });
    }
  },

  getExperienceById: async (req, res) => {
    try {
      const experience_id = req.params.experience_id;
      const result = await getExperienceId(experience_id);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting Experience",
      });
    }
  },

  getExperienceByWorkersId: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const result = await getExperienceWorkersId(workers_id);
      //   console.log(result.rows);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting Experience",
      });
    }
  },

  createdExperience: async (req, res) => {
    try {
      const { profesi, company, datein, dateout, description, workers_id } =
        req.body;

      const experience = {
        profesi,
        company,
        datein,
        dateout,
        description,
        workers_id,
      };
      console.log(experience);
      const experienceData = await createExperience(experience);
      // console.log(experienceData);
      res.status(200).json({
        message: "Experience has been created successfully",
        data: experienceData,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: "Error creating Experience",
        err: err.message,
      });
    }
  },

  updatedExperience: async (req, res) => {
    try {
      const experience_id = req.params.experience_id;
      //   console.log(req.file);

      const result = await getExperienceId(Number(experience_id));
      const experienceData = result.rows[0];
      let experienceImage = experienceData.image;
      if (req.file) {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
          folder: "portofolio",
        });
        experienceImage = uploadedImage.secure_url;
      }
      const data = {
        profesi: req.body.profesi || experienceData.profesi,
        company: req.body.company || experienceData.company,
        datein: req.body.datein || experienceData.datein,
        dateout: req.body.dateout || experienceData.dateout,
        description: req.body.description || experienceData.description,
        image: experienceImage,
      };

      await updateExperience(data, Number(experience_id));

      res.status(200).json({
        message: "Update Experience Successfull",
      });
    } catch (error) {
      res.status(400).json({
        message: "Update Experience Error",
        error: error.message,
      });
    }
  },

  deletedExperience: async (req, res) => {
    try {
      const experience_id = req.params.experience_id;
      const result = await deleteExperience(experience_id);
      const data = await cloudinary.uploader.destroy(result);
      res.json({
        message: "deleted Experience Successfull",
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
