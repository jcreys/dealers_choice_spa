const { append } = require('express/lib/response');
const { user } = require('pg/lib/defaults');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_spa'); //set up sequelize instance
const STRING = Sequelize.DataTypes.STRING;
const express = require('express');
const app = new express();

const Artist = sequelize.define('artist', {
    name: {
        type: STRING,
    }
});
//ph2 create a GET routes
app.get('/api/artists', async(req,res,next)=>{
    try{
        res.send(await Artist.findAll());
    }
    catch(ex){
        next(ex);
    }
});

const init = async() => {
    //run sync requirement
    try{
        await sequelize.sync({ force: true});
        await Artist.create({name: 'Drake'});
        await Artist.create({name: 'The Weeknd'});
        await Artist.create({name: 'Taylor Swift'});
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`istening on port ${port}`))
    }
    catch(ex){
        console.log(ex);
    }
};

init();