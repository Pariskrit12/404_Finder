import connectDB from "./db/connection.js";
import { app } from "./app.js";
import { createServer } from "http";
import dotenv from "dotenv";
import * as cheerio from 'cheerio';
import axios from "axios";
const server = createServer(app);
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server Connected Successfully At Port ${process.env.PORT}`);//server runs only if database is connected
    });
  })
  .catch((err) => {
    console.log(err);
  });


  // const first=cheerio.load('<h2 class="title">hello hi</h2>');
  // const text=first('h2.title').text();
  // console.log(text);
  
//  async function scrapeImages() {
//   const res = await axios.get("https://deerwalk.edu.np/DWIT/");
//   const $ = cheerio.load(res.data);

//   const images=[];

//   $("img").each((i,el)=>{
//     const img=$(el).attr("src")
//     if(img){
//       images.push(img)
//     }
//   })

//   console.log("Found links:", images);
// }

// scrapeImages();
  

 
