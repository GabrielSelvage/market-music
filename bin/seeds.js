const mongoose = require('mongoose');
const Class = require('../models/Class.model');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/market-place";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const classes = [{
    title:"Guitarra",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: "0",
    imageUrl: "https://images.pexels.com/photos/2912983/pexels-photo-2912983.jpeg",
    tags: [
        {
            tag1: "guitar",
            tag2: "violino",            
        }
    ]
    },
    {
        title:"Guitarra classica",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        price: "344",
        imageUrl: "https://images.pexels.com/photos/2531551/pexels-photo-2531551.jpeg",
        tags: [
            {
                tag1: "guitar",
                tag2: "violino",            
            }
        ]
        },
        {
            title:"Guitarra electrica",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            price: "12",
            imageUrl: "https://images.pexels.com/photos/2649113/pexels-photo-2649113.jpeg",
            tags: [
                {
                    tag1: "guitar",
                    tag2: "violino",            
                }
            ]
            },
            {
                title:"Guitarra acustica",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                price: "23",
                imageUrl: "https://images.pexels.com/photos/2912981/pexels-photo-2912981.jpeg",
                tags: [
                    {
                        tag1: "guitar",
                        tag2: "violino",            
                    }
                ]
                },
                {
                    title:"Guitarra portuguesa",
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    price: "324",
                    imageUrl: "https://images.pexels.com/photos/4158641/pexels-photo-4158641.jpeg",
                    tags: [
                        {
                            tag1: "guitar",
                            tag2: "violino",            
                        }
                    ]
                    },
                    {
                        title:"Guitarra brasileira",
                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        price: "14",
                        imageUrl: "https://images.pexels.com/photos/6580251/pexels-photo-6580251.jpeg",
                        tags: [
                            {
                                tag1: "guitar",
                                tag2: "violino",            
                            }
                        ]
                        },
];

Class.create(classes)
    .then(classesFromDB => {
        console.log(`Created ${classesFromDB.length} classes`);
        // Once created, close the DB connection
        mongoose.connection.close();
    })
    .catch(err => console.log('An error occurred while creating classes from the DB: ${err}'));





