
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const eventRoutes = require("./routes/eventRoutes");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
const port = 3000;
dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Express Swagger Crud App",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb Connected!!"))
  .catch((err) => console.log(err));

  // Enable All CORS Requests
app.use(cors());

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(eventRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
