const express = require("express")
const router = express.Router()
const Product = require("../models/product")



router.route("/products").post((req,res) =>{
    const file = req.body.file;
    const name = req.body.name;
    const country = req.body.country;
    const descr = req.body.descr;
    const price = req.body.price;
    const newProduct = new Product({
        file,
        name,
        country,
        descr,
        price
    });
    newProduct.save();
})

router.route("/products").get((req,res)=> {
    Product.find()
    .then(foundProduct => res.json(foundProduct))
})

router.route("/products/:id").get((req, res) => {
   Product.findById(req.params.id)
    .then(r => {
        res.json(r)
    })     
}) 


router.route("/products/:id").put((req, res) => {
    const id = req.params.id
    const updated = req.body
    delete updated._id
    Product.findOneAndUpdate(id, updated)
    .then(() => {
        res.end()
    })
    .catch((err) => console.log(err))
})

router.route("/products").delete((req, res) => {
    console.log(req.body)
    const id = req.body.id
    Product.findByIdAndDelete(id)
    .then(resp => console.log('resp', resp))
    .catch(err => console.log('err', err))
});

module.exports = router