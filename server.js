const { user } = require('pg/lib/defaults');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_spa'); //set up sequelize instance
const STRING = Sequelize.DataTypes.STRING;

const Artist = sequelize.define('artist', {
    name: {
        type: String,
        unique: true
    }
});

const init = async() => {
    //run sync requirement
    try{
        await sequelize.sync({ force: true});
        await Artist.create({name: 'Drake'});
        await Artist.create({name: 'The Weeknd'});
        await Artist.create({name: 'Taylor Swift'});

    }
    catch(ex){
        console.log(ex);
    }
};

init();