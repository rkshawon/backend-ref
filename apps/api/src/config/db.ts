import mongoose,{ConnectOptions} from "mongoose";

mongoose.connect(process.env.MONGO_URI!,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions,():void=>{
    console.log("Database Connected")
});

