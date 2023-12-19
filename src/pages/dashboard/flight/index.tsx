import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.less";
import {
  deleteFlight,
  getFlightsList,
  insertFlightInfo,
} from "@/service/flights";
interface DataType {
  flightNum: string;
  price: number;
  numSeats: number;
  numAvail: number;
  FromCity: string;
  ArivCity: string;
}

const Flight: React.FC = () => {
  const [lists, setLists] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightNum, setFlightNum] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [numSeats, setNumSeats] = useState<number>(0);
  const [FromCity, setFromCity] = useState("");
  const [ArivCity, setArivCity] = useState("");
  const [isEditing,setIsEditing]=useState<boolean>(false)
  const toDeteleFlight = (flightNum: string) => {
    deleteFlight(flightNum);
    const copyLists = [...lists];
    const index = copyLists.findIndex((item) => item.flightNum == flightNum);
    copyLists.splice(index, 1);
    setLists(copyLists);
  };
  const handleEdit=(record:DataType)=>{
    console.log(record);
    setIsEditing(true)
    setFlightNum(record.flightNum)
    setPrice(record.price)
    setNumSeats(record.numSeats)
    setFromCity(record.FromCity)
    setArivCity(record.ArivCity)
    setIsModalOpen(true)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "航班号",
      key: "flightNum",
      dataIndex: "flightNum",
      width: "165px",
    },
    {
      title: "票价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "座位总数",
      dataIndex: "numSeats",
      key: "numSeats",
    },
    {
      title: "剩余座位数",
      dataIndex: "numAvail",
      key: "numAvail",
    },
    {
      title: "出发城市",
      dataIndex: "FromCity",
      key: "FromCity",
    },
    {
      title: "前往城市",
      dataIndex: "ArivCity",
      key: "ArivCity",
    },
    {
      title: "操作",
      dataIndex: "controls",
      key: "controls",
      align: "center",
      width: "200px",
      render: (_text, record: DataType) => (
        <div className="controls">
          <Button type="primary" ghost onClick={()=>handleEdit(record)}>编辑</Button>
          <Button danger onClick={() => toDeteleFlight(record.flightNum)}>
            删除
          </Button>
        </div>
      ),
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const initState=()=>{
    setFlightNum("");
    setPrice(0);
    setNumSeats(0);
    setFromCity("");
    setArivCity("");
    setIsEditing(false)
  }
  const handleOk = () => {
    setIsModalOpen(false);
    const info = {
      flightNum,
      price,
      numSeats,
      numAvail: numSeats,
      FromCity,
      ArivCity,
      key:flightNum
    };
    insertFlightInfo(info);
    const copyLists: DataType[] = [...lists];
    let index=copyLists.findIndex((item)=>item.flightNum==info.flightNum)
    if(index>-1){
      copyLists.splice(index,1,info)
    }else{
      copyLists.push(info);
    }
    setLists(copyLists);
    initState()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    initState()
  };
  useEffect(() => {
    const getFlightLists = async () => {
      const result = (await getFlightsList()) || [];
      let lists = result.map((item: DataType) => {
        return { ...item, key: item.flightNum };
      });
      setLists(lists);
    };
    getFlightLists();
  }, []);
  return (
    <div className="home-flight">
      <div className="home-flight-content">
        <div className="top">
          <div className="title">航班信息列表</div>
          <Button type="primary" onClick={() => showModal()}>
            添加航班信息+
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="取消"
            okText="提交"
          >
            <div className="form-item">
              <span>航班号：</span>
              <Input
                style={{ width: "65%" }}
                value={flightNum}
                disabled={isEditing}
                onChange={(e) => setFlightNum(e.target.value)}
              />
            </div>
            <div className="form-item">
              <span>票价：</span>
              <Input
                style={{ width: "65%" }}
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-item">
              <span>座位总数：</span>
              <Input
                style={{ width: "65%" }}
                value={numSeats.toString()}
                onChange={(e) => setNumSeats(Number(e.target.value))}
              />
            </div>
            <div className="form-item">
              <span>出发城市：</span>
              <Input
                style={{ width: "65%" }}
                value={FromCity}
                onChange={(e) => setFromCity(e.target.value)}
              />
            </div>
            <div className="form-item">
              <span>前往城市：</span>
              <Input
                style={{ width: "65%" }}
                value={ArivCity}
                onChange={(e) => setArivCity(e.target.value)}
              />
            </div>
          </Modal>
        </div>
        <Table
          className="table"
          dataSource={lists}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default Flight;
