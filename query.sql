-- Active: 1696510194872@@localhost@5432@peworld

CREATE TABLE workers (
  workers_id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  image TEXT NULL,
  profesi VARCHAR(255) NULL,
  location VARCHAR(255) NULL,
  description TEXT NULL,
  company VARCHAR(255) NULL,
  instagram TEXT NULL,
  github TEXT NULL,
  gitlab TEXT NULL,
  role INT
);

CREATE TABLE recruiter (
  recruiter_id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  perusahaan VARCHAR(255) NOT NULL,
  jabatan VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  image TEXT NULL,
  bidang VARCHAR(255) NULL,
  location VARCHAR(255) NULL,
  description TEXT NULL,
  instagram TEXT NULL,
  linkedin TEXT NULL,
  role INT
);

CREATE TABLE portofolio (
  portofolio_id SERIAL PRIMARY KEY,
  namaAplikasi VARCHAR(255) NOT NULL,
  linkRepo TEXT NOT NULL,
  typePortofolio VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  workers_id INT
);

CREATE TABLE experience (
  experience_id SERIAL PRIMARY KEY,
  profesi VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  dateIn DATE NOT NULL,
  dateOut DATE NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  workers_id INT
);

CREATE TABLE skills (
  skills_id SERIAL PRIMARY KEY,
  skill VARCHAR(255) NOT NULL,
  workers_id INT
);

CREATE TABLE hire (
  hire_id SERIAL PRIMARY KEY,
  objective VARCHAR(255) NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  handphone VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  workers_id INT,
  recruiter_id INT
);

DROP TABLE recruiters

DROP TABLE portofolio

DROP TABLE experience

DROP TABLE hire