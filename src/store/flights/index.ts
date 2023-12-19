import { selector } from "recoil";
import { getFlightsList } from "@/service/flights";
import { Flights } from "@/type/flights";
const flightsNumState = selector({
  key: "flightsState",
  get: () => {
    const getList=async()=>{
      let result = await getFlightsList();
      let flightsNums = result.map((item: Flights) => item.flightNum);
      
      return flightsNums.map((item:string) => {
        return {
          value: item,
          label: item,
        };
      });
    }
    return getList()
  },
});

export { flightsNumState };
