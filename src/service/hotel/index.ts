import hyRequest from "..";
import { Hotel } from "@/type/hotel";
export const getHotelsList = () => {
  return hyRequest.get({
    url: "/hotels/lists",
  });
};

export const insertHotelInfo = (data: Hotel) => {
  return hyRequest.post({
    url: "/hotels/insert",
    data,
  });
};

export const deleteHotel = (id: string) => {
  return hyRequest.delete({
    url: `/hotels/delete/${id}`,
  });
};
