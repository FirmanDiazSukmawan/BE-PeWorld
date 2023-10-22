const {
  getAllWorkers,
  countWorkers,
  getById,
  createWorkers,
  updateWorkers,
  loginWorkers,
  deleteWorkers,
  findUserEmail,
} = require("../model/workersModel");
const { generateToken, refreshToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");

const userController = {
  getWorkers: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset, page } = req.query;
    let data = {
      page: page || 1,
      searchBy: searchBy || "nama",
      search: search || "",
      sortBy: sortBy || "workers_id",
      sort: sort || "ASC",
      limit: limit || 10,
      offset: (page - 1) * limit || 0,
    };

    try {
      const {
        rows: [count],
      } = await countWorkers();
      const totalData = parseInt(count.count);

      const totalPage = Math.ceil(totalData / limit);
      // console.log(limit);
      const pagination = {
        currentPage: data.page,
        limit: data.limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      let results = await getAllWorkers(data);
      res.status(200).json({
        message: "workers get all by query",
        pagination: pagination,
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "workers not found",
      });
    }
  },

  getWorkerById: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const result = await getById(workers_id);
      res.json({
        data: result.rows[0],
        message: "get data successfully",
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting worker",
      });
    }
  },

  createWorker: async (req, res) => {
    try {
      const { nama, email, phone, password, confirmPassword } = req.body;

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
        phone,
        password: passwordHash,
      };
      // console.log(user);
      const workerData = await createWorkers(user);
      // console.log("User data:", workerData);
      res.status(200).json({
        message: "workers has been created successfully",
        data: workerData,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error creating Worker",
        err: err.message,
      });
    }
  },

  loginWorker: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await loginWorkers(email);
      //   console.log(result.rows);

      if (result.rowCount > 0) {
        const passwordHash = result.rows[0].password;
        const PasswordValid = await bcrypt.compare(password, passwordHash);
        const user = result.rows[0];

        // console.log(result);

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

  updateWorker: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      if (!req.file || !req.file.path) {
        return res.status(401).json({
          message: "You need to upload an image",
        });
      }
      const workersImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });

      const result = await getById(Number(workers_id));
      const worker = result.rows[0];
      const data = {
        nama: req.body.nama || worker.nama,
        email: req.body.email || worker.email,
        phone: req.body.phone || worker.phone,
        image: workersImage.secure_url,
        profesi: req.body.profesi || worker.profesi,
        location: req.body.location || worker.location,
        description: req.body.description || worker.description,
        company: req.body.company || worker.company,
        instagram: req.body.instagram || worker.instagram,
        github: req.body.github || worker.github,
        gitlab: req.body.gitlab || worker.gitlab,
      };

      await updateWorkers(data, Number(workers_id));

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

  deleteWorker: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const result = await deleteWorkers(workers_id);
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
