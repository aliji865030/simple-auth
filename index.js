const express = require('express');
const fs = require('node:fs')

const app = express();


const loginMiddleware = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    
    console.log(`Received timestamp ${timestamp}, request method ${method}, and url ${url}`);

    const startTime = Date.now();

    res.on('ended', () => {
        const duration = Date.now() - startTime;
        console.log(`Request for url ${url} processed in ${duration}ms`);
    });


    next();
}
app.use(loginMiddleware)

const products = [
    {
        id: 1,
        name: "Gaming Chair",
        description: "Comfortable gaming chair with adjustable armrests and lumbar support.",
        price: 129.99,
        category: "Furniture",
        stock: 80
    },
    {
        id: 2,
        name: "Smart Light Bulb",
        description: "Wi-Fi enabled smart light bulb with color changing capabilities.",
        price: 19.99,
        category: "Home Automation",
        stock: 250
    },
    {
        id: 3,
        name: "Fitness Tracker",
        description: "Wearable fitness tracker with heart rate monitor and sleep tracking.",
        price: 49.99,
        category: "Wearables",
        stock: 180
    },
    {
        id: 4,
        name: "Noise Cancelling Headphones",
        description: "Wireless over-ear headphones with active noise cancellation.",
        price: 149.99,
        category: "Audio",
        stock: 45
    },
    {
        id: 5,
        name: "Electric Toothbrush",
        description: "Rechargeable electric toothbrush with multiple brushing modes.",
        price: 59.99,
        category: "Personal Care",
        stock: 100
    },
    {
        id: 6,
        name: "Instant Pot",
        description: "7-in-1 multi-functional pressure cooker and slow cooker.",
        price: 89.99,
        category: "Kitchen Appliances",
        stock: 60
    },
    {
        id: 7,
        name: "Graphic Tablet",
        description: "Drawing tablet with pressure-sensitive pen for digital artists.",
        price: 79.99,
        category: "Electronics",
        stock: 40
    },
    {
        id: 8,
        name: "Portable Speaker",
        description: "Bluetooth portable speaker with deep bass and 12-hour battery life.",
        price: 39.99,
        category: "Audio",
        stock: 150
    },
    {
        id: 9,
        name: "E-Reader",
        description: "E-ink display e-reader with adjustable front light and Wi-Fi.",
        price: 129.99,
        category: "Electronics",
        stock: 70
    },
    {
        id: 10,
        name: "Digital Picture Frame",
        description: "Wi-Fi enabled digital picture frame with a 10-inch display.",
        price: 99.99,
        category: "Home Decor",
        stock: 90
    }
];



app.get('/api/v1/product', (req, res, next) => {

    try {
        res.json({
            success: true,
            message: 'data fetched successfully',
            data: [...products]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'internal Server Error',
        })
    }
})

app.post('/api/v1/register/:id', (req, res, next) => {
    try {
        // console.log(products);
        const data = products.find((e) => e.id === Number(req.params.id))
        if (data) {
            // console.log("data", data);
            res.json({
                success: true,
                message: 'user registered Successfully',
                userData: data
            })
        } else {
            res.status(404).json({
                message: 'product not found'
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})

app.listen(8080, () => { console.log(`Server is running on port 8080`); })