// seeders/userSeeder.js
require("dotenv").config(); // Import dotenv dan konfigurasikan

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../app/Models/Users"); // Import model Users

// Data pengguna yang akan di-seed
const seedUsers = async () => {
  try {
    // Koneksi ke database MongoDB tanpa opsi deprecated
    await mongoose.connect(process.env.MONGO_URI);

    // Hapus semua data pengguna yang ada sebelumnya
    await User.deleteMany({});

    // Data user yang akan dimasukkan
    const users = [
      {
        fullname: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10), // Hash password menggunakan bcrypt
      },
      {
        fullname: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        fullname: "Jane Doe",
        email: "jane@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    ];

    // Masukkan data user ke database
    await User.insertMany(users);
    console.log("User seeding completed!");

    // Tutup koneksi ke database
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedUsers();
