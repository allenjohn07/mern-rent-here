import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
    houseName: {
        type: String,
        required: true
    },
    houseType: {
        type: String,
        required: true
    },
    minPrice: {
        type: Number,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    },
    priceType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    postingDate: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    houseImage: {
        type: String,
        required: true,
    },
    postedBy: {
        type: String,
        required: true
    },
    createAt:{
        type: String,
        required:true
    }
});

export const House = mongoose.model('houses', houseSchema);
