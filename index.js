const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/user")
const authRouer = require("./routes/auth")
const postRouter = require("./routes/post")
const multer = require("multer");
const path = require("path");
const cors = require("cors")
app.use(cors())
mongoose.connect("mongodb+srv://kuldashev:mO5JzQd3x8annG8z@cluster0.r6vwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(console.log("mongoDB ulandi"))
    .catch(error => {
        console.log(error)
    })

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(helmet())
app.use(morgan("common"))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
app.use("/api/user", userRouter)
app.use("/api/auth", authRouer)
app.use("/api/post", postRouter)


app.listen("5000", () => {
    console.log("Backend ishga tushdi")
})