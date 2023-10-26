const {
  getAllRecruiter,
  countRecruiter,
  getById,
  createRecruiter,
  updateRecruiter,
  loginRecruiter,
  deleteRecruiter,
  findUserEmail,
} = require("../model/recruiterModel");
const { generateToken, refreshToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");

const userController = {
  getRecruiter: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "nama",
      search: search || "",
      sortBy: sortBy || "recruiter_id",
      sort: sort || "ASC",
      limit: limit || 10,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countRecruiter();
      const totalData = parseInt(count.total);

      const totalPage = Math.ceil(totalData / data.limit);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await getAllRecruiter(data);
      res.status(200).json({
        message: "recruiters get all by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "recruiters not found",
      });
    }
  },

  getRecruiterById: async (req, res) => {
    try {
      const recruiter_id = req.params.recruiter_id;
      const result = await getById(recruiter_id);
      res.json({
        data: result.rows,
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting recruiter",
      });
    }
  },

  createRecruiters: async (req, res) => {
    try {
      const {
        nama,
        email,
        perusahaan,
        jabatan,
        phone,
        password,
        confirmPassword,
      } = req.body;

      let { rowCount } = await findUserEmail(email);
      if (rowCount) {
        return res
          .status(400)
          .json({ message: "email already in use,please use another email" });
      }
      if (password !== confirmPassword)
        return res
          .status(401)
          .json({ message: "passsword and confirm password do not match" });

      const passwordHash = bcrypt.hashSync(password, 10);

      const user = {
        nama,
        email,
        perusahaan,
        jabatan,
        phone,
        password: passwordHash,
      };
      //   console.log(user);
      const recruiterData = await createRecruiter(user);
      // console.log("User data:", recruiterData);
      res.status(200).json({
        message: "recruiters has been created successfully",
        data: recruiterData,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error creating recruiter",
        err: err.message,
      });
    }
  },

  loginRecruiters: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await loginRecruiter(email);
      //   console.log(result.rows);

      if (result.rowCount > 0) {
        const passwordHash = result.rows[0].password;
        const PasswordValid = await bcrypt.compare(password, passwordHash);
        const user = result.rows[0];

        // console.log(result.rows);

        if (PasswordValid) {
          const token = await generateToken({
            users: user,
          });

          return res.status(200).json({
            message: "Login successful",
            token: token,
            data: user,
          });
        } else {
          res.status(400).json({ message: "Invalid email or password " });
        }
      } else {
        res.status(400).json({ message: "Invalid password " });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error, message: "An error occurred during login" });
    }
  },

  updateRecruiters: async (req, res) => {
    try {
      const recruiter_id = req.params.recruiter_id;
      //   console.log(req.file);

      const result = await getById(Number(recruiter_id));
      const recruiterData = result.rows[0];
      let recruiterImage = recruiterData.image;
      if (req.file) {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
          folder: "portofolio",
        });
        recruiterImage = uploadedImage.secure_url;
      }
      const data = {
        nama: req.body.nama || recruiterData.nama,
        image: recruiterImage,
        bidang: req.body.bidang || recruiterData.bidang,
        location: req.body.location || recruiterData.location,
        description: req.body.description || recruiterData.description,
        perusahaan: req.body.perusahaan || recruiterData.perusahaan,
        jabatan: req.body.jabatan || recruiterData.jabatan,
        instagram: req.body.instagram || recruiterData.instagram,
        linkedin: req.body.linkedin || recruiterData.linkedin,
      };

      await updateRecruiter(data, Number(recruiter_id));

      res.status(200).json({
        message: "Update Successfull",
      });
    } catch (error) {
      res.status(400).json({
        message: "Update Error",
        error: error.message,
      });
    }
  },

  deleteRecruiters: async (req, res) => {
    try {
      const recruiter_id = req.params.recruiter_id;
      const result = await deleteRecruiter(recruiter_id);
      const data = await cloudinary.uploader.destroy(result);
      res.json({
        message: "delete data sucessfully",
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
