import axios from "axios"

export const getOrders = async() => {
    const res = await axios.get("http://localhost:8000/api/v1/orders/");
    return res.data;
}