import { getBusList } from "@/service/bus";
import { Bus } from "@/type/bus";
import { useEffect, useState } from "react";
export function useBus(){
    const [busLists,setBusLists]=useState([])
    useEffect(()=>{
        const getList=async ()=>{
            let result = await getBusList();
            let bus = result.map((item: Bus) => item.location);
            let lists= bus.map((item: string) => {
              return { value: item, label: item };
            });
            setBusLists(lists)
           }
        getList()
    },[])
    return [busLists]
}