import hyRequest from "..";
import { Bus } from "@/type/bus";
export const getBusList = () => {
  return hyRequest.get({
    url: "/bus/lists",
  });
};

export const insertBusInfo = (data: Bus) => {
  return hyRequest.post({
    url: "/bus/insert",
    data,
  });
};

export const deleteBus = (id: string) => {
  return hyRequest.delete({
    url: `/bus/delete/${id}`,
  });
};
