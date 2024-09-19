const express = require("express");
const cors = require("cors");
const recordRoute = require("./routes/record");
const dbConnection = require("./db").connection;

const app = express();

const PORT = 3233;

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use("/register", recordRoute);
app.use("/", (req, res) => res.send("App works fine 🚀"));

app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log(`Server Running on PORT ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
