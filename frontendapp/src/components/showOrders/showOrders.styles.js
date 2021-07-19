import styled from "styled-components";

export const Container = styled.div`

    margin-top: 100px;
    align-items: center;
    /* padding-left: 10px; */
    display: flex;
    
    flex-direction: column;
    
    .button-primary{
    margin-top: 15px;
    color: white;
    margin-left: -8px;
    top: 5px;
    border-radius: 4px;
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,27,91,1) 45%, rgba(19,61,69,1) 100%);
   
  }
   


`

export const Td = styled.td `
    justify-content: space-around;
    padding-bottom: 10px;
    padding-right: 20px;
    padding-left: 20px;
    background: #fafafa;
    color:#201b5b;
    align-items: center;
    
    border-radius: 4px;
  
`
export const Th = styled.th `
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
`
export const Tr = styled.tr `
 background: rgb(211,205,249);
    color:#201b5b;
    background: linear-gradient(90deg, rgba(211,205,249,1) 0%, rgba(201,238,247,1) 45%);
    border-radius: 4px;
`
export const Thead = styled.thead `

`

export const DataTable = styled.td `
    padding-left: 30px;
    font-size: 16px;
    
    text-align: left;
    
`


export const Description = styled.h2`
color: #201b5b;
margin-bottom: 20px 0px 20px 0px;
font-size: 22px;
font-weight: bold;
font-family:'Poppins', sans-serif;
align-items: center;
line-height: 1.0;
`