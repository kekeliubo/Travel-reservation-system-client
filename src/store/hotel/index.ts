import {selector} from 'recoil'
import { getHotelsList } from '@/service/hotel'
import { Hotel } from '@/type/hotel'
const hotelLocationState=selector({
    key:'hotelState',
    get:()=>{
       const getList=async()=>{
        let result=await getHotelsList()
        let locations= result.map((item:Hotel)=>item.location)
        return locations.map((item:string)=>{
            return {value:item,label:item}
        })
       }
       return getList()
    }
})

export {hotelLocationState}