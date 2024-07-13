import { House } from "../models/HouseModel.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types; 

//to get all houses
export const getAllHouses = async (req, res) => {
    try {
        const houses = await House.find();
        res.status(200).send(houses);
    } catch (error) {
        res.status(500).send({ message: "Error fetching houses", error });
    }
};

//to post a house
export const postHouse = async (req, res) => {
    try {
        const body = req.body;
        body.createAt = new Date(); 
        const result = await House.create(body);
        if (result._id) {
            return res.status(201).send({
                message: "House posted successfully"
            });
        } else {
            return res.status(400).send({
                message: "Cannot insert item! Try again later.",
                status: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error posting house",
            error
        });
    }
};

//to get house by id
export const getHouseById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({
                message: "Invalid ID format",
                status: false
            });
        }
        const house = await House.findById(id);
        if (house) {
            res.status(200).send(house);
        } else {
            res.status(404).send({
                message: "House not found",
                status: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error fetching house",
            error
        });
    }
};

//to get house by email
export const getHouseByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const house = await House.find({
            postedBy: email
        });
        res.status(200).send(house);
    } catch (error) {
        res.status(500).send({
            message: "Error fetching house by email",
            error
        });
    }
};

//delete house by id
export const deleteHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHouse = await House.findByIdAndDelete({ _id: id })
        if (!deletedHouse) {
            return res.status(404).send({
                message: "House not found",
                status: false
            });
        }
        const house = await House.find()
        return res.status(200).send({house, message:'House deleted successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "An error occurred while deleting the house",
            error
        });
    }
}


//to update the house
export const updateHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedHouse = await House.findByIdAndUpdate(id, updateData, { new: true })
        if (!updatedHouse) {
            return res.status(404).send({
                message: "House not found",
                status: false
            });
        }
        return res.status(200).send({ updatedHouse, message: 'House updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "An error occurred while updating the house",
            error
        });
    }
}
