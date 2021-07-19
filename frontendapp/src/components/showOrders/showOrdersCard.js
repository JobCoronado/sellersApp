import React from 'react';
import  { Card } from 'antd';
import styled from 'styled-components';



const CardOrder = () => {
  return (
    <div className="site-card-border-less-wrapper">
    <Card  bordered={false} style={{ width: '100%' }}>
      <Wrapper>
      <CTALogoOne src="/images/cover_melonn.jpg" alt="cover-melonn" />
  
     
      <Description>Check All Your Orders! </Description>
      </Wrapper>
    
      
      
      
    </Card>
  </div>

  )
}

export default CardOrder


const Wrapper = styled.div `
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;



p {
  font-size: 24px;
  color: #201b5b;
}


`

const CTALogoOne = styled.img`
    
    max-width: 650px;
    min-height: 1px;
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;


 
  `;
  
   const Description = styled.h2`
    color: #201b5b;
    font-size: 22px;
    font-weight: bold;
    font-family:'Poppins', sans-serif;
    align-items: center;
    line-height: 1.0;
    
  `;
  