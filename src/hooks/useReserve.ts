import { Reservations } from "@/type/reservations";
import {
  deleteReservationInfo,
  getReservationsList,
  insertReservationInfo,
} from "@/service/reservations";
import { useEffect, useState } from "react";
export function useReverse() {
  const [reverseLists, setReverseLists] = useState([]);
  const getLists = async () => {
    let result = await getReservationsList();

    let lists = result.map((item: Reservations) => {
      let resvType = null;
      switch (item.resvType) {
        case 0:
          resvType = "航班";
          break;
        case 1:
          resvType = "酒店";
          break;
        case 2:
          resvType = "巴士";
          break;
      }
      return {
        id: item.id,
        customer: item.customer,
        resvType,
        resvKey: item.resvKey,
        key:item.id
      };
    });
    console.log(lists, "-------");

    setReverseLists(lists);
  };
  useEffect(() => {
    getLists();
  }, []);
  async function insertListItem(data: Reservations) {
    insertReservationInfo(data);
    let id=data.id
    let resvKey=data.resvKey
    let resvType=''
    let customer=data.customer
    switch (data.resvType) {
      case 0:
        resvType = "航班";
        break;
      case 1:
        resvType = "酒店";
        break;
      case 2:
        resvType = "巴士";
        break;
    }
    let lists=[...reverseLists,{id,customer,resvKey,resvType,key:id}] as any
    setReverseLists(lists)
  }
  async function deleteListItem(data: any) {
    let availType=-1
    switch(data.resvType){
        case '航班':
            availType=0;
            break;
        case '酒店':
            availType=1
            break;
        case '巴士':
            availType=2;
            break;
    }
    let copyData={...data,resvType:availType}
    console.log(copyData);
    await deleteReservationInfo(copyData);
    getLists();
  }
  return { reverseLists, insertListItem, deleteListItem };
}
