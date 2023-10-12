const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors')
app.use(cors())
// helps to make the file accessible from anywhere
app.use("/files",express.static("files")) 


// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb+srv://sonasreedhar44:RjD8EYQSP5zn8oOc@cluster0.mdndnh7.mongodb.net/bookStore?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});



// multer
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+file.originalname)
    }
  })
  

  // PdfDetails as the collection name
require("./pdfDetails")
const PdfSchema = mongoose.model("PdfDetails")
const upload = multer({ storage: storage })

//   file is the value from the form 
app.post("/upload-files",upload.single("file"),async(req,res)=>{
    // console.log(req.file)
    const title = req.body.title
    const fileName = req.file.filename
    try {
      await PdfSchema.create({title:title,pdf:fileName})
      res.send({status:"ok"})
    } catch (error) {
      res.json({status:error})
    }
})

app.get('/get-files',async(req,res)=>{
  try {
    await PdfSchema.find({}).then((data)=>{
      res.send({status:"ok",data:data})
    })
  } catch (error) {
    
  }
})


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

