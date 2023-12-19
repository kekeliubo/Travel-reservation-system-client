import { useEffect, useState } from "react";
import { getCustomerList } from "@/service/customer";
import { Customer } from "@/type/customers";
export function useUser(){
    const [userLists,setUserLists]=useState([])
    useEffect(()=>{
        const getCustomerLists = async () => {
            const result = await getCustomerList();
            
            let nameLists=result.map((item:Customer)=>item.custName)
            let Lists= nameLists.map((name:string)=>{
              return {key:name,value:name,label:name}
            })
            
            setUserLists(Lists);
          };
          getCustomerLists();
    },[])
    return [userLists]
}