import {Request,Response,NextFunction}from "express"

export default async (req:Request, res:Response,next:NextFunction) => {
  try{
    res.send({
      status:true,
      products:{}
    })
  
  }catch(err){
    next(err)
  }
  }
  