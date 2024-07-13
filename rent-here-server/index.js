// const express = require('express')
// const app = express()
// const cors = require('cors')
// const port = process.env.PORT || 5000;
// require('dotenv').config()

// // middleware
// app.use(express.json())
// app.use(cors())

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rent-here.xui4wdn.mongodb.net/?retryWrites=true&w=majority&appName=Rent-here`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     //create db
//     const db = client.db("mernRentHere")
//     const houseCollections = db.collection("renthouses")

//     //get all houses
//     app.get("/all-houses", async (req, res) => {
//       const houses = await houseCollections.find({}).toArray()
//       res.send(houses)
//     })

//     //get single house by id
//     app.get("/all-houses/:id", async (req, res) => {
//       const id = req.params.id
//       const house = await houseCollections.findOne({
//         _id: new ObjectId(id)
//       })
//       res.send(house)
//     })

//     //post a house
//     app.post("/post-house", async (req, res) => {
//       const body = req.body
//       body.createAt = new Date()
//       const result = await houseCollections.insertOne(body)
//       if (result.insertedId) {
//         return res.status(200).send(result)
//       } else {
//         return res.status(404).send({
//           message: "Can not insert item! try again later",
//           status: false
//         })
//       }
//     })

//     //get all houses by email
//     app.get("/my-houses/:email", async (req, res) => {
//       // console.log(req.params.email);
//       const houses = await houseCollections.find({ postedBy: req.params.email }).toArray()
//       res.send(houses)
//     })

//     //delete a house
//     app.delete("/delete-house/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) }
//       const result = await houseCollections.deleteOne(filter)
//       res.send(result)
//     })

//     //update a house
//     app.patch("/update-house/:id", async (req, res) => {
//       const id = req.params.id
//       const houseData = req.body
//       const filter = { _id: new ObjectId(id) }
//       const options = { upsert: true }
//       const updateDoc = {
//         $set: {
//           ...houseData
//         }
//       }
//       const result = await houseCollections.updateOne(filter, updateDoc, options)
//       res.send(result)
//     })

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { AuthRoutes } from './routes/AuthRoutes.js'
import { HouseRoutes } from './routes/HouseRoutes.js'
import { VerifyRoutes } from './routes/VerifyRoutes.js'
dotenv.config()
const port = process.env.PORT || 10000


const app = express()


//middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use("/auth", AuthRoutes)
app.use("/houses", HouseRoutes)
app.use("/verification", VerifyRoutes)

app.listen(port, () => console.log(`Server started at: ${port}`))

mongoose.connect(process.env.mongoDB_url).then(() => console.log("Database Connected")).catch((error) => console.error(error))

