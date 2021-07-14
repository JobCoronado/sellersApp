import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { 
  Row,
  Col,
  Divider,
  Form,
  Button,
  Input,
  InputNumber,
  Select,
} from "antd";
import CardOrder from "../addOrdersCard/addOrdersCard";
import { Div, Container, Formlayer } from "./addOrders.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

const URL = process.env.APP_URL;


const AddOrders = () => {
  const history = useHistory();
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //      history.push('/test');
  //    }, 3000);
  //  },[]);
  // }

  
  const notify = () => toast("Orden Creada, Está Melonn 😎!");
  
   

   
  // const notify = () => toast("Orden Creada, Está Melonn 😎!");

  const [sellerStore, setSellerStore] = useState("");
  const [method, setMethod] = useState(0);
  const [externalNumberOrder, setExternalNumberOrder] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [shippingAddress, setShippingAdress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingRegion, setShippingRegion] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingQuantity, setShippingQuantity] = useState("");
  const [shippingWeight, setShippingWeight] = useState("");
  const { Option } = Select;
  const methods = [
    { id: 1, name: "1- Recogida @ Melonn - HOY" },
    { id: 2, name: "2- Recogida @ Melonn - Siguiente Dia Habil" },
    { id: 3, name: "3- Domicilio - Express - Local" },
    { id: 4, name: "4- Domicilio - Hoy - Local" },
    { id: 5, name: "5 -Domicilio - Siguiente Dia Habil - Local" },
    { id: 6, name: "6 -Envio Nacional" },
  ];
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  function onSubmit(value) {
    console.log("changed", value);
  }
  async function handleSubmit() {
    const config = {
      method: "POST",
      url: URL,
      headers: { "Content-Type": "application/json" },
      data: {
        sellerStore: sellerStore,
        shippingMethod: method,
        orderInfo: {
          externalNumberOrderNumber: externalNumberOrder,
          buyer: {
            buyerName: buyerName,
            buyerLastName: buyerLastName,
            buyerPhone: buyerPhone,
            buyerEmail: buyerEmail,
          },
          shipping: {
            shippingAddress: shippingAddress,
            shippingCity: shippingCity,
            shippingRegion: shippingRegion,
            shippingCountry: shippingCountry,
            shippingName: shippingName,
            shippingQuantity: shippingQuantity,
            shippingWeight: shippingWeight,
          },
        },
      },
    };
    await axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    // history.push('/test');
  }

  return (
    
    <Formlayer>
      <ToastContainer />
      <CardOrder />
      <Container>
        <Divider orientation="left"> Order Information </Divider>
        <Form
          className="form"
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            v
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Seller Store"
                  onChange={(e) => setSellerStore(e.target.value)}
                />
              </Div>
            </Col>
            <Col  span={6}>
              <Div>
                <Select style={{ width: 200 }} onChange={(e) => setMethod(e)}>
                  {methods.map((meth) => (
                    <Option key={meth.id} value={meth.id_}>
                      {meth.name}
                    </Option>
                  ))}
                </Select>
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="External Number"
                  onChange={(e) => setExternalNumberOrder(e.target.value)}
                />
              </Div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Divider className="SC.Divider-text" orientation="left">
          {" "}
          Buyer Information{" "}
        </Divider>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Name"
                  onChange={(e) => setBuyerName(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="LastName"
                  onChange={(e) => setBuyerLastName(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Form.Item name="email" rules={[{type: "email", message: "The input is not valid E-mail!"},
                        {required: true,message: "Please input your E-mail!"}]}>
                  <Input
                    placeholder="E-mail"
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                </Form.Item>
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Phone"
                  onChange={(e) => setBuyerPhone(e.target.value)}
                />
              </Div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Divider orientation="left"> Shipping Data </Divider>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Adresss"
                  onChange={(e) => setShippingAdress(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="City"
                  onChange={(e) => setShippingCity(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Region"
                  onChange={(e) => setShippingRegion(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Country"
                  onChange={(e) => setShippingCountry(e.target.value)}
                />
              </Div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Divider orientation="left"> Shipping Data </Divider>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <Div>
                <Input
                  placeholder="Name"
                  onChange={(e) => setShippingName(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <InputNumber
                  placeholder="Weight"
                  min={1}
                  max={10}
                  defaultValue={3}
                  onSumbit={onSubmit}
                  onChange={(e) => setShippingWeight(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Div>
                <InputNumber
                  placeholder="Quantity"
                  min={1}
                  max={10}
                  defaultValue={3}
                  onSumbit={onSubmit}
                  onChange={(e) => setShippingQuantity(e.target.value)}
                />
              </Div>
            </Col>
            <Col className="gutter-row" span={6}></Col>
          </Row>
        </Form>
      </Container>
      <Div>
      
        <Button
          onClick={() => {
            window.setTimeout(() => {
              history.push('/test');
           }, 5000)
            notify();
            handleSubmit();
            
             
            
            

          }}
          className="button-primary"
        >
          Submit Order
        </Button>
        
      </Div>
    </Formlayer>
  );
};

export default AddOrders;
