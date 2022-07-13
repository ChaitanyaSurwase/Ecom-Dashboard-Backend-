const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())

require('./src/db/conn')
app.use(express.json())
const User = require('./src/model/user.model')
const Product = require('./src/model/Product.model');
// posting first user
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        // result = result.toObject();
        delete result.password
        res.send(result);

    } catch (e) {
        res.sendStatus(400).send(e);
    }
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user)
        } else {
            res.send({ result: "No user Found" })
        }
    } else {
        res.send({ result: "No user Found" })
    }
})

app.post('/add-Product', async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);

    } catch (e) {
        res.sendStatus(400).send(e);
    }
})

app.get("/productList", async (req, res) => {
    try {

        const product = await Product.find()
        if (product.length > 0) {
            res.send(product)
        } else {
            res.send({ result: "No DataFound" })
        }
    } catch (error) {

    }
})

app.delete("/deleteProduct/:id", async (req, res) => {

    try {
        let result = await Product.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (error) {

    }


})

app.get("/product/:id", async (req, res) => {


    try {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            res.send(result)
        } else {
            res.send({ result: "No Data Found" })
        }

    } catch (error) {
        res.send({ result: "No Data Found" })
    }

})

app.put("/product/:id", async (req, res) => {

    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

app.get("/search/:key", async (req, res) => {

    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key },
            },
            {
                companey: { $regex: req.params.key }
            },
            {
                category:{$regex:req.params.key}
            }

        ]
    });

    res.send(result)
})


app.listen(4000)