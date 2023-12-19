import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.less";
import {
  getCustomerList,
  deleteCustomer,
  insertCustomerInfo,
} from "@/service/customer";
import { Customer as DataType } from "@/type/customers";
import { getItemsByName } from "@/service/reservations";
const Customer: React.FC = () => {
  const [lists, setLists] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [custID, setCustId] = useState(0);
  const [custName, setCustName] = useState("");
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [name, setName] = useState("");
  const toDeteleCustomer = (id: number) => {
    deleteCustomer(id);
    const copyLists = [...lists];
    const index = copyLists.findIndex((item) => item.custID == id);
    copyLists.splice(index, 1);
    setLists(copyLists);
  };
  const findPath = async (name: string) => {
    setName(name);
    let result = await getItemsByName(name);
    console.log(result);
    if (result.length == 4) {
      setIsShow(true);
    }
    setIsShowDetail(true);
  };
  const columns: ColumnsType<DataType> = [
    {
      key: "custID",
      title: "用户编号",
      dataIndex: "custID",
      width: "165px",
    },
    {
      key: "custName",
      title: "用户姓名",
      dataIndex: "custName",
      width: "165px",
    },
    {
      key: "controls",
      title: "操作",
      dataIndex: "controls",
      align: "center",
      width: "200px",
      render: (_text, record: DataType) => (
        <div className="controls">
          <Button danger onClick={() => toDeteleCustomer(record.custID)}>
            删除
          </Button>
        </div>
      ),
    },
    {
      key: "control",
      title: "查询路径",
      dataIndex: "control",
      align: "center",
      width: "200px",
      render: (_text, record: DataType) => (
        <div className="controls">
          <Button danger onClick={() => findPath(record.custName)}>
            查询
          </Button>
        </div>
      ),
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const info = {
      custID,
      custName,
    };
    insertCustomerInfo(info);
    const copyLists: DataType[] = [...lists];
    copyLists.push(info);
    setLists(copyLists);
    setCustId(0);
    setCustName("");
  };
  const handleOk2 = () => {
    setIsShowDetail(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsShowDetail(false);
  };
  useEffect(() => {
    const getCustomerLists = async () => {
      const result = await getCustomerList();
      let lists = result.map((item: DataType) => {
        return { ...item, key: item.custName };
      });
      setLists(lists);
    };
    getCustomerLists();
  }, []);
  return (
    <div className="home-Customer">
      <div className="home-Customer-content">
        <div className="top">
          <div className="title">用户信息列表</div>
          <Button type="primary" onClick={() => showModal()}>
            添加用户信息+
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
              <span>用户编号：</span>
              <Input
                style={{ width: "65%" }}
                value={custID.toString()}
                onChange={(e) => setCustId(Number(e.target.value))}
              />
            </div>
            <div className="form-item">
              <span>用户姓名：</span>
              <Input
                style={{ width: "65%" }}
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
              />
            </div>
          </Modal>
          <Modal
            open={isShowDetail}
            onOk={handleOk2}
            onCancel={handleCancel2}
            cancelText="取消"
            okText="提交"
          >
            {name == "张三" ? (
              <div className="list">
                <div className="form-item">
                  <span>去程：</span>
                  <span>成都——上海</span>
                </div>
                <div className="form-item">
                  <span>返程：</span>
                  <span>上海——成都</span>
                </div>
                <div className="form-item">
                  <span>酒店编号：</span>
                  <span>2</span>
                </div>
                <div className="form-item">
                  <span>巴士编号：</span>
                  <span>2</span>
                </div>
              </div>
            ) : (
              <div style={{width:'100%',height:'200px'}}>查询失败,缺少返程航班和酒店巴士预约记录，路径不完整!</div>
            )}
          </Modal>
        </div>
        <Table
          className="table"
          style={{ width: "600px" }}
          dataSource={lists}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default Customer;
