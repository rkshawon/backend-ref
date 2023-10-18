import { connect,ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";

async function MongooseConnect() {

    if(process.env.NODE_ENV==="jest"){
      const mongoServer = await MongoMemoryServer.create();
      await connect(mongoServer.getUri());
    }else

    await connect(process.env.MOGNO_URI!,{
      useNewUrlParser: true,
    useUnifiedTopology: true,
    }as ConnectOptions,()=>{
      console.log("Mongoddb Connected")
    } );
}

export default MongooseConnect;