const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodeModel = require('./models/Food');
const Food = require('./models/Food');

app.use(express.json())
app.use(cors());
mongoose.connect(
    "mongodb+srv://newuser:manali1234@cluster0.usaud.mongodb.net/food?retryWrites=true&w=majority", 
   {
    useNewUrlParser: true,
   }
);

app.post("/insert", async(req,  res) => {
    const foodName = req.body.foodName
    const days = req.body.days

    const food = new FoodeModel({ foodName: foodName, daysSinceIAte: days});
    try{
        await food.save();
        res.send("inserted data");
    } catch(err){
        console.log(err);
    }
});

app.put("/update", async(req,  res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    
    try{
       await FoodeModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.save();
            res.send(updatedFood);
        })
    } catch(err){
        console.log(err);
    }
});

app.get("/read", async(req,  res) => {
    try{
        const foodList = await FoodeModel.find({}).sort({_id: -1});
        res.json(foodList);
    }catch(err){
        res.json("oops! foods are not found!");
    }
});

app.delete("/delete/:id", async(req,res) => {
  const id = req.params.id;
  
  await FoodeModel.findByIdAndRemove(id).exec();
  res.send("deleted");
})
app.listen(3001,() =>{
    console.log('Server running on port 3001...')
});