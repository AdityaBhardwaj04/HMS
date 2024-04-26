const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Patient = require("./models/Patient");
const app = express();
const port = 3000;

// Database Connection (Replace with your MongoDB credentials)
mongoose
  .connect("mongodb://localhost:27017/clinicDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Helper function to calculate the next patient ID
const calculateNextPID = async () => {
  const lastPatient = await Patient.find().sort({ id: -1 }).limit(1);
  return lastPatient.length === 0 ? 1 : lastPatient[0].id + 1;
};

// Middleware
app.use(cors()); // Use the cors middleware
app.use(express.json());

// Placeholder API route (You'll expand this later)
app.get("/test", (req, res) => {
  res.json({ message: "Test!" });
});

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/patients", async (req, res) => {
  try {
    const nextPID = await calculateNextPID();

    const newPatient = new Patient({
      id: nextPID,
      patientName: req.body.patientName,
      patientAge: req.body.patientAge,
      patientAddress: req.body.patientAddress,
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
