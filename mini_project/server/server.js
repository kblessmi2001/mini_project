const express = require("express");
const { connection } = require("./db");
const { productRoutes } = require("./routes/products.routes");
const cors = require("cors")

const app = express();


app.use(express.json());
app.use(cors())

app.use("/products",productRoutes)




app.listen(4500,async()=>{
    try {
        await connection
        console.log("server is running");
        console.log("DB is connected");
    } catch (error) {
        console.log(error.message);
    }
})