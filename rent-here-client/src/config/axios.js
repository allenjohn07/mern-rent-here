import axios from 'axios'

export const instance = axios.create({
    // baseURL: 'http://localhost:10000',
    baseURL: 'https://mern-rent-here.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
})