// import React,{useEffect,useState} from 'react';
// import {getOrders} from "../../api/order";
import "antd/dist/antd.css";
import { Table } from 'antd';
import { Container } from "./showOrders.styles";

const ShowOrders = () => {
    const dataSource = [
        { key: '1', username: '00000009',  dateCreation: "2021-07-15",
        sellerStore: "Exito", shippingMethod: 6, },

    ];
  
    // Sample Columns data
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Creation Date',
            dataIndex: 'dateCreation',
            key: 'age',
        },
        {
            title: 'Seller Store',
            dataIndex: 'sellerStore',
            key: 'age',
        },
        {
            title: 'Shipping Method',
            dataIndex: 'shippingMethod',
            key: 'age',
        },
    ];
    return (
        <Container>
        <div  style={{display: 'block',  padding: 30
        }}>
             <h4>Your Orders </h4>
            <Table dataSource={dataSource} columns={columns} />
          
        </div>
        </Container>
    )
}

export default ShowOrders



