let houses = require('./db.json')
let globalID = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body;
        let newHouse = {
            id: globalID,
            address,
            price,
            imageURL
        }
        houses.push(newHouse);
        globalID++;
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const {id} = req.params;
        const {type} = req.body; // ask in queue if we don't figure out what it does 
        let index = houses.findIndex(elem => elem.id === +id)
        console.log(type);

        if(type === 'minus'){
            houses[index].price -= 10000;
            res.status(200).send(houses);
        } else if(type === 'plus'){
            houses[index].price += 10000;
            res.status(200).send(houses);
        } else {
            res.status(400).send('Something went wrong, try again..')
        }
    },
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id ===  +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses);
    }
}
