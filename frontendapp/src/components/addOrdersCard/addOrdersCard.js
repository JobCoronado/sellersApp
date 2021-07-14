import React from 'react';
import  { Card } from 'antd';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import personCheckFill from '@iconify-icons/bi/person-check-fill';



const CardOrder = () => {
  return (
    <div className="site-card-border-less-wrapper">
    <Card  bordered={false} style={{ width: '100%' }}>
      <Wrapper>
      <Icon  className="icon-react" icon={personCheckFill} />
      <h2>Welcome Back!</h2>
      </Wrapper>
    
      
      <p>Feel confident to send all your products with us!</p>
      <p>Here you can add all your orders</p>
      
    </Card>
  </div>

  )
}

export default CardOrder


const Wrapper = styled.div `
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;


`