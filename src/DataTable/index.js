import React, { useState, useEffect } from "react";
import axios from "axios";
import {isEmpty} from "lodash"
import { Popconfirm, Table, Button, Space, Form, Input } from "antd";

const DataTable = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const dataWithAge = gridData.map((item) => ({
    ...item,
    age: Math.floor(Math.random() * 6) + 20,
  }));


  const handleDelete = (value) => {
    console.log('value', value)
    const dataSource = [...modifiedData];
   const filteredData = dataSource.filter((item) => {
  console.log('item.id:', item.id); // Log the 'item.id' value
  return item.id !== value.id;
});
    setGridData(filteredData);
  };


  const modifiedData = dataWithAge.map(({ body, ...item }) => {
    console.log("body", body, "item", item); // Log the 'body' property
    return {
      ...item,
      key: item.id,
      message: isEmpty(body) ? item.message : body,
    };
  });


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      editTable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      editTable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      align: "center",
      editTable: false,
    },
    {
      title: "Message",
      dataIndex: "message",
      align: "center",
      editTable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) =>
        modifiedData.length >= 1 ? (
            <Space>
          <Popconfirm
            title="are you sure you want to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
         <Button onClick={()=>console.log('edit')} type="primary">
edit
         </Button>
          </Space>
        ) : null,
    },
  ];
  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setGridData(response.data);
    console.log("response", response.data);
    setLoading(false);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={modifiedData}
        bordered
        loading={loading}
      />
    </div>
  );
};

export default DataTable;
