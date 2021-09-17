require("dotenv").config();
const Express = require("express");
const app = Express();
const { sequelize } = require("./db");

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/member", controllers.memberController);

app.use("/journal", controllers.journalController);

app.use("/quote", controllers.quoteController);
app.listen(process.env.PORT, () => {
    console.log(`[Server]: App is listening on 3000.`);
});
