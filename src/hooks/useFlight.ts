import { getFlightsList } from "@/service/flights";
import { Flights } from "@/type/flights";
import { useEffect, useState } from "react";
export function useFlight(){
    const [flightLists,setFlightLists]=useState([])
    useEffect(()=>{
        const getList=async()=>{
            let result = await getFlightsList();
            let flightsNums = result.map((item: Flights) => item.flightNum);
            
            let lists= flightsNums.map((item:string) => {
              return {
                value: item,
                label: item,
              };
            });
            setFlightLists(lists)
          }
          getList()
    },[])
    return [flightLists]
}