import { IRoom } from "../../../../interface/IRooms.interface";
import Room from "../../../../models/room.model";

function normalizeRoom(room: IRoom, company_id: string) {
  
  if (room.companies){
    const receiver_company = room.companies.filter(company=>company._id.toString()!==company_id.toString())
    room.receiver_company=receiver_company[0]
  }
  return room;
}

export default normalizeRoom;
