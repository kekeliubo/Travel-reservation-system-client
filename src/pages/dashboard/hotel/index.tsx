import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.less";
import { getHotelsList, deleteHotel, insertHotelInfo } from "@/service/hotel";
import { Hotel as DataType } from "@/type/hotel";
const Hotel: React.FC = () => {
  const [lists, setLists] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [numRooms, setNumRooms] = useState(0);
  const [isEditing,setIsEditing]=useState<boolean>(false)
  const toDeteleHotel = (id: string) => {
    deleteHotel(id);
    const copyLists = [...lists];
    const index = copyLists.findIndex((item) => item.id == id);
    copyLists.splice(index, 1);
    setLists(copyLists);
  };
  const handleEdit=(record:DataType)=>{
    console.log(record);
    setId(record.id)
    setLocation(record.location)
    setPrice(record.price)
    setNumRooms(record.numRooms)
    setIsEditing(true)
    setIsModalOpen(true)
  }
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "key",
      rowScope: "row",
      align: "center",
    },
    {
      title: "编号",
      dataIndex: "id",
      width: "165px",
    },
    {
      title: "位置",
      dataIndex: "location",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "房间总数",
      dataIndex: "numRooms",
    },
    {
      title: "剩余房间数",
      dataIndex: "numAvail",
    },
    {
      title: "操作",
      dataIndex: "controls",
      align: "center",
      width: "200px",
      render: (_text, record: DataType) => (
        <div className="controls">
           <Button type="primary" ghost onClick={()=>handleEdit(record)}>编辑</Button>
          <Button danger onClick={() => toDeteleHotel(record.id)}>
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
    setId('')
    setPrice(0)
    setLocation('')
    setNumRooms(0)
    setIsEditing(false)
  }
  const handleOk = () => {
    setIsModalOpen(false);
    const info = {
      id,
      price,
      location,
      numAvail: numRooms,
      numRooms,
      key:location
    };
    insertHotelInfo(info);
    const copyLists: DataType[] = [...lists];
    let index=copyLists.findIndex((item)=>item.location==info.location)
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
    const getHotelLists = async () => {
      const result = await getHotelsList();
      let lists=result.map((item:DataType)=>{
        return {...item,key:item.location}
      })
      
      setLists(lists);
    };
    getHotelLists();
  }, []);
  return (
    <div className="home-Hotel">
      <div className="home-Hotel-content">
        <div className="top">
          <div className="title">酒店信息列表</div>
          <Button type="primary" onClick={() => showModal()}>
            添加酒店信息+
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
              <span>编号：</span>
              <Input
                style={{ width: "65%" }}
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="form-item">
              <span>位置：</span>
              <Input
                style={{ width: "65%" }}
                value={location}
                disabled={isEditing}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-item">
              <span>价格：</span>
              <Input
                style={{ width: "65%" }}
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-item">
              <span>房间总数：</span>
              <Input
                style={{ width: "65%" }}
                value={numRooms.toString()}
                onChange={(e) => setNumRooms(Number(e.target.value))}
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

export default Hotel;
