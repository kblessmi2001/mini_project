const express = require("express");
const {PorductModel} = require("../model/produccts.model");

const productRoutes = express.Router();


productRoutes.get("/get",async (req,res)=>{
    try {
        const products = await PorductModel.find();
        res.status(200).json({msg: "products",data:products })
    } catch (error) {
        res.status(200).json({error:error.message});
    }
});



productRoutes.post("/post",async (req,res)=>{
    try {
        const products = new PorductModel(req.body);
        await products.save();
        res.status(200).json({msg: "Succesfully Added Product Details",addedproduct:req.body })
    } catch (error) {
        res.status(200).json({error:error.message});
    }
});

productRoutes.patch("/update/:id",async (req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    console.log(id)
    try {
        const products = await PorductModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).json({msg: "Succesfully Updated Product Details",updatedProduct:products ,id})
    } catch (error) {
        res.status(200).json({error:error.message});
    }
});

productRoutes.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;

    try {
        const products = await PorductModel.findByIdAndDelete({_id:id});
        res.status(200).json({msg: "Succesfully Deleted Product Details",data:products })
    } catch (error) {
        res.status(200).json({error:error.message});
    }
})


module.exports = {productRoutes};