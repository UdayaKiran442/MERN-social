const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dtoguorry",
  api_key: "528411381656446",
  api_secret: "hhESrXn2l4bVAaEtok_b2SXengQ",
  secure: true,
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
