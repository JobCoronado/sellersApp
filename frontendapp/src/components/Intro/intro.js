import React from 'react';
import styled from 'styled-components';


const intro = () => {
    return (
        <Container>
        <Content>
          <CTA>
            <CTALogoOne src="/images/cta-logo-one.svg" alt="" />
            
            <Description>
              Intro section for the Sellers App
            </Description>
            <CTALogoTwo src="/images/cta-logo-two.png" alt="" />
          </CTA>
          <BgImage />
        </Content>
      </Container>
    );
  };
  
  const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
  `;
  
  const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%;
  `;
  
  const BgImage = styled.div`
    height: 100%;
    /* background-position: top;
    background-size: cover;
    background-repeat: no-repeat; */
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,27,91,1) 45%, rgba(19,61,69,1) 100%);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
  `;
  
  const CTA = styled.div`
    max-width: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
  
  const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
  `;
  
   const Description = styled.h2`
    color: #FFF;
    font-size: 40px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
  `;
  
  const CTALogoTwo = styled.img`
    max-width: 600px;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
  `;
    


export default intro
