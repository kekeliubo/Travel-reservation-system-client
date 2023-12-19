import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useFlight } from "@/hooks/useFlight";
import { useHotel } from "@/hooks/useHotel";
import { useBus } from "@/hooks/useBus";
import { useReverse } from "@/hooks/useReserve";
import { Select, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.less";
import { Reservations as DataType } from "@/type/reservations";


const reserve: React.FC = () => {
  const [avaiKey, setAvaiKey] = useState([]);
  const [useLists] = useUser();
  const [flightLists] = useFlight();
  const [busLists] = useBus();
  const [hotelLists] = useHotel();
  const { reverseLists, insertListItem ,deleteListItem} = useReverse();
  const [availType, setAvailType] = useState(-1);
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const handlerSeleteName = (value: string) => {
    setName(value);
  };
  const handlerSeleteType = (value: string) => {
    switch (value) {
      case "00":
        setAvailType(0);
        setAvaiKey(flightLists);
        break;
      case "01":
        setAvailType(1);
        setAvaiKey(hotelLists);
        break;
      case "02":
        setAvailType(2);
        setAvaiKey(busLists);
        break;
    }
  };
  const handlerSeleteKey = (value: string) => {
    setKey(value);
  };
  const handlerSubmit = () => {
    insertListItem({
      customer: name,
      resvType: availType,
      resvKey: key,
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "预约人姓名",
      dataIndex: "customer",
      key:'customer',
      width: "150px",
    },
    {
      title: "预约类型",
      dataIndex: "resvType",
      key:'resvType'
    },
    {
      title: "预约地点/航班号",
      dataIndex: "resvKey",
      key:'resvKey'
    },
    {
      key: "controls",
      title: "操作",
      dataIndex: "controls",
      align: "center",
      width: "200px",
      render: (_text, record) => (
        <div className="controls">
          <Button
            danger
            onClick={() =>deleteListItem(record)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="reverse">
      <div className="reverse-content">
        <div className="advance">
          <div className="advance-title">预约登记</div>
          <div className="advance-list">
            <div className="advance-item">
              <span className="title">预约人姓名:</span>
              <div>
                <Select
                  placeholder="请选择预约人姓名"
                  style={{ width: "150px" }}
                  options={useLists}
                  onSelect={(value: string) => handlerSeleteName(value)}
                />
              </div>
            </div>
            <div className="advance-item">
              <span className="title">预约类型:</span>
              <Select
                placeholder="请选择预约类型"
                style={{ width: "150px" }}
                options={[
                  { value: "00", label: "航班" },
                  { value: "01", label: "酒店" },
                  { value: "02", label: "巴士" },
                ]}
                onSelect={(value: string) => handlerSeleteType(value)}
              />
            </div>
            <div className="advance-item">
              <span className="title">预约地点/航班号:</span>
              <Select
                placeholder="请选择预约地点/航班号"
                style={{ width: "150px" }}
                options={avaiKey}
                onSelect={(value: string) => handlerSeleteKey(value)}
              />
            </div>
            <Button
              onClick={() => handlerSubmit()}
              type="primary"
              disabled={!(key !== "" && name !== "" && availType !== -1)}
            >
              确定预约
            </Button>
          </div>
        </div>
        <div className="order">
          <div className="order-title">预约记录</div>
          <Table
            className="table"
            style={{ width: "800px" }}
            columns={columns}
            dataSource={reverseLists}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default reserve;
