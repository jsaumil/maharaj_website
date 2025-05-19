const express = require("express");
const dbConnect = require("./config/dbconnect");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes");
const mealDetailsRoutes = require("./routes/mealDetailsRoutes");
const dishRoutes = require("./routes/dishRoutes");
const { notFound, errorHandler }= require("./middleware/errorHandler");

//Database Connection
dbConnect()


//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/user", authRouter);
app.use("/api/booking", bookingRoutes);
app.use("/api/meal-details", mealDetailsRoutes);
app.use("/api/dishes", dishRoutes);

//Error Handling Middlewre
app.use(notFound);
app.use(errorHandler);

//Start Server
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});