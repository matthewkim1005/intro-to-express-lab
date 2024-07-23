const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// 1. Task: Create a route that responds to URLs like /greetings/<username-parameter>.
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;

    res.send(`Hello there, ${username}! How is your day going?`)
});

// 2. Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
app.get('/roll/:roll', (req, res) => {
    const roll = req.params.roll;
    if (Number.isInteger(Number(roll))) {
        let randomRoll = Math.floor(Math.random() * roll);
        res.send(`You rolled a ${randomRoll}`);
    } else {
        res.send('Invalid Number!');
    }
});

// 3. Task: Create a route for URLs like /collectibles/<index-parameter>.
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    console.log(collectibles.length);
    if (index > collectibles.length-1 || index < 0) {
        res.send('This item is not yet in stock. Check back soon!');
    } else if (!Number.isInteger(Number(index))) {
        res.send('Not a valid index!');
    } else {
        res.send(`So, you want the ${collectibles[index].name}? For $${collectibles[index].price}, it can be yours!`)
    }
});

// 4. Task: Create a route /shoes that filters the list of shoes based on query parameters.

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let list = [];
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const type = req.query.type;

    //checks if the query is blank, not sure if there is a better way to check this
    if (!req.query.minPrice && !req.query.maxPrice && !req.query.type) {
        shoes.forEach(shoe => {
            list += `${shoe.name}. `;
        });
    } else {
        shoes.forEach(shoe => {
            if (shoe.price <= maxPrice) {
                list += `${shoe.name}. `;
            } else if (shoe.price >= minPrice) {
                list += `${shoe.name}. `;
            } else if (shoe.type == type) {
                list += `${shoe.name}. `;
            }
        });
    }
        if (list.length == 0) {
            res.send('No matches for your query!');
        } else {
            res.send(list);
        }
});