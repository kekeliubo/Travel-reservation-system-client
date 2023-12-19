import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.less";
import { getBusList, deleteBus, insertBusInfo } from "@/service/bus";
import { Bus as DataType } from "@/type/bus";
const Bus: React.FC = () => {
  const [lists, setLists] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [numBus, setNumBus] = useState(0);
  const [isEditing,setIsEditing]=useState<boolean>(false)
  const toDeteleBus = (id: string) => {
    deleteBus(id);
    const copyLists = [...lists];
    const index = copyLists.findIndex((item) => item.id == id);
    copyLists.splice(index, 1);
    setLists(copyLists);
  };
  const handleEdit=(record:DataType)=>{
    console.log(record);
    setIsEditing(true)
    setIsModalOpen(true)
    setId(record.id)
    setLocation(record.location)
    setNumBus(record.numBus)
    setPrice(record.price)
  }
  const columns: ColumnsType<DataType> = [
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
      title: "巴士总数",
      dataIndex: "numBus",
    },
    {
      title: "可预约巴士数",
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
          <Button danger onClick={() => toDeteleBus(record.id)}>
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
    setNumBus(0)
    setIsEditing(false)
  }
  const handleOk = () => {
    setIsModalOpen(false);
    const info = {
      id,
      price,
      location,
      numAvail: numBus,
      numBus,
      key:location
    };
    insertBusInfo(info);
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
    const getBusLists = async () => {
      const result = await getBusList();
      let lists=result.map((item:DataType)=>{
        return {...item,key:item.location}
      })
      setLists(lists);
    };
    getBusLists();
  }, []);
  return (
    <div className="home-Bus">
      <div className="home-Bus-content">
        <div className="top">
          <div className="title">巴士信息列表</div>
          <Button type="primary" onClick={() => showModal()}>
            添加巴士信息+
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
              <span>巴士总数：</span>
              <Input
                style={{ width: "65%" }}
                value={numBus.toString()}
                onChange={(e) => setNumBus(Number(e.target.value))}
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

export default Bus;
