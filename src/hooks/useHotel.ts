import { getHotelsList } from '@/service/hotel'
import { Hotel } from '@/type/hotel'
import { useEffect, useState } from 'react'
export function useHotel(){
    const [hotelLists,setHotelLists]=useState([])
    useEffect(()=>{
        const getList=async()=>{
            let result=await getHotelsList()
            let locations= result.map((item:Hotel)=>item.location)
            let lists= locations.map((item:string)=>{
                return {value:item,label:item}
            })
            setHotelLists(lists)
           }
        getList()
    },[])
    return [hotelLists]
}