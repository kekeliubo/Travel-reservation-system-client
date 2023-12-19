import { selector } from "recoil";
import { getReservationsList } from "@/service/reservations";
const reservationsState = selector({
  key: "HotelState",
  get: () => {
   const getList=async()=>{
    let result = await getReservationsList();
    console.log(result);
   }
   getList()
  },
});

export { reservationsState };
