import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    app.listen(process.env.PORT, () => {
      console.log(`Ahshan Habib app is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
