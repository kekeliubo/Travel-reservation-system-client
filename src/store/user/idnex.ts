import {selector} from 'recoil'
import { getCustomerList } from '@/service/customer'
import { Customer } from '@/type/customers'
const userState=selector({
    key:'userState',
    get:()=>{
     const getList=async ()=>{
      let result=await getCustomerList()
      let nameLists=result.map((item:Customer)=>item.custName)
      return nameLists.map((name:string)=>{
        return {key:name,value:name,label:name}
      })
     }
     return getList()
    }
})

export {userState}