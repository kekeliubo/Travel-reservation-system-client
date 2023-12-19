import { selector } from "recoil";
import { getBusList } from "@/service/bus";
import { Bus } from "@/type/bus";
const busLocationState = selector({
  key: "busState",
  get: () => {
   const getList=async ()=>{
    let result = await getBusList();
    let bus = result.map((item: Bus) => item.location);
    return bus.map((item: string) => {
      return { value: item, label: item };
    });
   }
   return getList()
  },
});

export { busLocationState };
