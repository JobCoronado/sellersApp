import React from 'react';
import styled from 'styled-components';


const intro = () => {
    return (
        <Container>
    
            <Description>
              Manage your orders with Melonn Sellers App
              <br></br>
               and make your customers happy!
            </Description>

            <CTALogoOne src="/images/cover_melonn.jpg" alt="cover-melonn" />
   
   
      </Container>
    );
  };
  
  const Container = styled.section`
  
    /* margin-top: 40px; */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    height: 100vh;
    color:#fff;
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,27,91,1) 45%, rgba(19,61,69,1) 100%);
  `;
  

  
  
  
 
  
  const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 650px;
    min-height: 1px;
    display: block;
    width: 400px;
    height: 400px;
    border-radius: 50%;

    :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    }
  `;
  
   const Description = styled.h2`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    font-family:'Poppins', sans-serif;
    align-items: center;
    margin: 60px 10px 20px 10px;
    line-height: 1.0;
    /* letter-spacing: 1.5px; */
  `;
  



export default intro
