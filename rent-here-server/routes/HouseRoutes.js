import express from 'express'
import { deleteHouse, getAllHouses, getHouseByEmail, getHouseById, postHouse, updateHouse } from '../controllers/HouseController.js'
const router = express.Router()

//route to get all houses
router.get("/all-houses", getAllHouses)

//route to post a house
router.post("/post-house", postHouse)

//route to get a house by id
router.get("/all-houses/:id", getHouseById)

//route to get a house by email
router.get("/my-houses/:email", getHouseByEmail)

//route to delete a house 
router.delete("/delete-house/:id", deleteHouse)

//router to update a house
router.put("/update-house/:id", updateHouse)

export { router as HouseRoutes };