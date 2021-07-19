

import React,{useEffect,useState} from 'react';
import {getOrders} from "../../api/order";
import "antd/dist/antd.css";
import {Button} from "antd";
import ShowOrdersCard from "./showOrdersCard";
import { Container, DataTable, Th, Td, Tr, Thead} from "./showOrders.styles";
const ShowOrders = () => {
    const [orders, setorders] = useState([]);
    useEffect(() => {
       (async ()=>{
        const resOrders = await getOrders();
        setorders(resOrders);
        console.log(resOrders, "the order")
       })()
    }, [])


    return (
        
        <Container className="showorder">
            <ShowOrdersCard />
                <DataTable gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Thead>
                        <Tr>
                            <Th>Order Id</Th>
                            <Th>Seller Store</Th>
                            <Th>Order Date</Th>
                            <Th>Shippinng Method</Th>
                            <Th>Buyer Name</Th>
                            <Th>Buyer Phone</Th>
                        </Tr>
                        

                    </Thead>
                    
                    {orders.map((order)=>(
                    <tbody>
                    <Td>{order.internalOrderNumber}</Td>
                    <Td>{order.sellerStore}</Td>
                    <Td>{order.creationDataTime}</Td>
                    <Td>{order.shippingMethod}</Td>
                    <Td>{order.orderInfo.buyer.buyerName}</Td>
                    <Td>{order.orderInfo.buyer.buyerPhone}</Td>
                    </tbody>
                    ))}
                </DataTable>
                <a href="/orders">
                <Button className="button-primary">
         Add a New Order
        </Button>
                </a>
        
          
        </Container>
    )
}

export default ShowOrders
