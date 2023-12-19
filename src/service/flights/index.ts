import hyRequest from "..";
import { Flights } from "../../type/flights";
export const getFlightsList = () => {
  return hyRequest.get({
    url: "/flights/lists",
  });
};

export const insertFlightInfo = (data: Flights) => {
  return hyRequest.post({
    url: "/flights/insert",
    data,
  });
};

export const deleteFlight = (flightNum: string) => {
  return hyRequest.delete({
    url: `/flights/delete/${flightNum}`,
  });
};
