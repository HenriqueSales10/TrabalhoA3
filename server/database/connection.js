const { default: mongoose } = require('mongoose')
const mongos = require('mongoose')

const connectDB = async ()=>{
    try {
        //Mongo db connection string
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true         
        })

        console.log(`MongoDB connected : ${con.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB