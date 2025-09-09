const express = require('express');
const session = require('express-session');
const { regd_users } = require('./router/auth_users.js');
const { public_users } = require('./router/general.js');

const app = express();
app.use(express.json());
app.use(session({ secret:"secret_key", resave:true, saveUninitialized:true }));

// Routerlar
app.use("/customer", public_users);       // register, public book routes
app.use("/customer", regd_users);         // login, add/delete review

app.listen(5001, () => console.log("Server running on port 5001"));
