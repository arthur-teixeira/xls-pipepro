const app = require("express")();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./helpers/errorHandler").middleware;
dotenv.config();

app.use(cors());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://arthur:${process.env.MONGO_PASSWORD}@cluster0-j90rd.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  //eslint-disable-next-line no-console
  .then(() => console.log("mongoDB conectado"))
  //eslint-disable-next-line no-console
  .catch(err => console.log(err));

//rotas
const uploadRoute = require("./routes/upload.routes");
const authRoute = require("./routes/auth.routes");

app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);

//error handler 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
//eslint-disable-next-line no-console
app.listen(PORT, () => console.log("servidor ligado na porta", PORT));