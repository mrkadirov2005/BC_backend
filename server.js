// express-framework used to create API
const path=require('path')
const express = require('express');
// app is called variable of express
const app = express();
// node package manager--NPM
// mongoose is tool used to connect server with database 
const mongoose = require('mongoose');
// call connection file
const connectDB = require('./config/dbCon');
connectDB();
const verify_super_admin_route=require("./routes/verify_super_admin_route")
const handle_super_admin_action_routes=require("./routes/handle_super_admin_action_routes")
const verify_vip=require("./routes/verify_vip")
const handle_vip_actions_routes=require("./routes/handle_vip_action_routes")
const PORT = 7000;
const cors = require('cors');
app.use(cors()); // Allow all origins
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json 
app.use(express.json());
// create sub admin is no more required as it is unsecure
app.all('*',(req,res,next)=>{
    console.log(req.url)
    console.log(req.method)
    console.log(req.originalUrl)
    
    next()
})



app.post('/verify_super_admin',verify_super_admin_route)
app.get('/verify_super_admin',verify_super_admin_route)
app.post('/super_admin*', handle_super_admin_action_routes);
app.delete('/super_admin*', handle_super_admin_action_routes);
app.put('/super_admin*', handle_super_admin_action_routes);
app.get('/super_admin*', handle_super_admin_action_routes);
// vip reqs
app.all('/verify_vip',verify_vip)
app.all('/vip*',handle_vip_actions_routes)

app.all("*",async (req,res)=>{
    res.status(400).json({"got this":req.originalUrl})
})
// Start the server
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
