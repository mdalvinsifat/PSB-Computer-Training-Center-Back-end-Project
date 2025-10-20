const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const ConnectDB = require("./Config/Connect")
const router = require("./route/admissionRoute")
const contact = require("./route/ContactRoute")
const guest = require("./route/guestroute")
const auth = require("./route/authRoute")
const course = require("./route/courseRoute")
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173' // your React app URL & port
}));
dotenv.config()
app.use(morgan("dev"))


const PORT = process.env.PORT || 3000 ; 
ConnectDB()

app.use("/admission", router)
app.use("/contact", contact)
app.use("/guest", guest)
app.use("/auth", auth)
app.use("/course", course)
app.listen(PORT ,  () => console.log(`http://localhost:${PORT}`.bgGreen))