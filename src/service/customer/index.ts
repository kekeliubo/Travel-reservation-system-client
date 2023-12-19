import hyRequest from "..";
import { Customer } from "@/type/customers";
export const getCustomerList = () => {
  return hyRequest.get({
    url: "/customers/lists",
  });
};

export const insertCustomerInfo = (data: Customer) => {
  return hyRequest.post({
    url: "/customers/insert",
    data,
  });
};

export const deleteCustomer = (id: number) => {
  return hyRequest.delete({
    url: `/customers/delete/${id}`,
  });
};
