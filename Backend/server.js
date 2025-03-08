require("dotenv").config();
const express = require("express");
const mongoose =require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/userRoutes");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/users", router);

mongoose.connect(process.env.CONNECTIONSTRING, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>console.log("Connected to MongoDB"))
    .catch(err=>console.log(err));


    
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});