import hyRequest from "..";
import { Reservations } from "../../type/reservations";
export const getReservationsList = () => {
  return hyRequest.get({
    url: "/reservations/lists",
  });
};

export const insertReservationInfo = (data: Reservations) => {
  return hyRequest.post({
    url: "/reservations/insert",
    data,
  });
};

export const deleteReservationInfo=(data:Reservations)=>{
  return hyRequest.post({
    url:`/reservations/delete`,
    data
  })
}

export const getItemsByName=(name:string)=>{
  return hyRequest.get({
    url:`/reservations/find/${name}`
  })
}
