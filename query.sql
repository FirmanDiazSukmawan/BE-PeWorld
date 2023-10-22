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

DROP TABLE recruiters