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
      const totalData = parseInt(count.count);

      const totalPage = Math.ceil(totalData / limit);
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
        data: result.rows[0],
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
      const { profesi, company, dateIn, dateOut, description, workers_id } =
        req.body;

      if (!req.file || !req.file.path) {
        return res.status(401).json({
          message: "You need to upload an image",
        });
      }

      const experienceImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "experience",
      });

      const experience = {
        profesi,
        company,
        dateIn,
        dateOut,
        description,
        image: experienceImage.secure_url,
        workers_id,
      };
      //   console.log(experience);
      const experienceData = await createExperience(experience);
      // console.log("Experience data:", ExperienceData);
      res.status(200).json({
        message: "Experience has been created successfully",
        data: experienceData,
      });
    } catch (err) {
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
      const experienceImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "Experience",
      });

      if (!experienceImage) {
        return res.status(401).json({
          message: "u need upload image",
        });
      }
      const result = await getExperienceId(Number(experience_id));
      const experienceData = result.rows[0];
      const data = {
        profesi: req.body.profesi || experienceData.profesi,
        company: req.body.company || experienceData.company,
        dateIn: req.body.dateIn || experienceData.dateIn,
        dateOut: req.body.dateOut || experienceData.dateOut,
        description: req.body.description || experienceData.description,
        image: experienceImage.secure_url,
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
