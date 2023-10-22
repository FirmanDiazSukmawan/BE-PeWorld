const {
  getAllSkills,
  countSkills,
  getSkillsId,
  getSkillsWorkersId,
  createSkills,
  updateSkills,
  deleteSkills,
} = require("../model/skillsModel");
const cloudinary = require("../config/cloudinaryConfig");

const userController = {
  getSkills: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "skills",
      search: search || "",
      sortBy: sortBy || "skills_id",
      sort: sort || "ASC",
      limit: limit || 6,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countSkills();
      const totalData = parseInt(count.count);

      const totalPage = Math.ceil(totalData / limit);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await getAllSkills(data);
      res.status(200).json({
        message: "skills get all by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "skills not found",
      });
    }
  },

  getSkillsById: async (req, res) => {
    try {
      const skills_id = req.params.skills_id;
      const result = await getSkillsId(skills_id);
      res.json({
        data: result.rows[0],
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting skills",
      });
    }
  },

  getSkillsByWorkersId: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const result = await getSkillsWorkersId(workers_id);
      //   console.log(result.rows);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting skills",
      });
    }
  },

  createdSkills: async (req, res) => {
    try {
      const { skill, workers_id } = req.body;

      const skills = {
        skill,
        workers_id,
      };
      //   console.log(skill);
      const skillData = await createSkills(skills);
      // console.log("skill data:", skillData);
      res.status(200).json({
        message: "skill has been created successfully",
        data: skillData,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error creating skills",
        err: err.message,
      });
    }
  },

  updateSkill: async (req, res) => {
    try {
      const skills_id = req.params.skills_id;
      //   console.log(req.file);
      const result = await getSkillsId(Number(skills_id));
      const skillData = result.rows[0];
      const data = {
        skill: req.body.skill || skillData.skill,
      };

      await updateSkills(data, Number(skills_id));

      res.status(200).json({
        message: "Update skills Successfull",
      });
    } catch (error) {
      res.status(400).json({
        message: "Update skills Error",
        error: error.message,
      });
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const skills_id = req.params.skills_id;
      const result = await deleteSkills(skills_id);
      const data = await cloudinary.uploader.destroy(result);
      res.json({
        message: "deleted skills Successfull",
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
