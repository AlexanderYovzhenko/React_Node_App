import express from "express";
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;

const server = express();

const Schema = mongoose.Schema;

const FormSchema = new Schema({
  RequestId: {
    type: String,
    required: [true, "RequestId is required"]
  }, 
  CardNumber: {
        type: String,
        required: [true, "CardNumber is required"]
  }, 
  ExpirationDate: {
      type: String,
      required: [true, "ExpirationDate is required"]
  },
  CVV: {
    type: String,
    required: [true, "CVV is required"]
  },
  Amount: {
    type: String,
    required: [true, "Amount is required"]
  }
})

const FormModel = mongoose.model("form", FormSchema);

const connectionUrl = "mongodb+srv://Alexander:senior2020@cluster0.37kyr.mongodb.net/form?retryWrites=true&w=majority"

mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    console.log("Connected") 
});

server.listen(PORT, () => {
  console.info('Server is running!');
});

server.use(express.urlencoded({extended: false}));
server.use(bodyParser.json());

server.post('/api', (req, res) => {
  req.body.RequestId = uuidv4();

  const SaveData = new FormModel(req.body)
    SaveData.save((error, savedData)=>{
      if(error) throw error
      res.status(201);
      res.header({'Content-Type': 'application/json'});
      res.send({ "message": "Server response!", savedData });
    });  
});
