import React, { useEffect, useState } from 'react'
import axios from "axios";
import styled from "styled-components";
import {Modal,Button,ModalOverlay,ModalCloseButton,ModalContent,FormLabel,FormControl,Input,ModalFooter,useDisclosure,ModalHeader,ModalBody} from "@chakra-ui/react"

const Allproducts = () => {


    const [data, setdata] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:4500/products/get").then((res) => {
            console.log(res)
            setdata(res.data.data)
        }).catch((err) => {
            console.log(err)
        })


    }, [])
 
    console.log(data)
    return (
        <DIV>
            <h1>All Products</h1>
            <PROD>

                {
                    data?.map((item) => (
                        <CARD key={item.id}>
                            <img src={item.image} alt="image" />
                            <H2>{item.name}</H2>
                            <h3>{item.price}$</h3>
                            <p>{item.description}</p>
                            <p className='cat'>{item.category}</p>

                        </CARD>
                    ))
                }
            </PROD>
        </DIV>
    )
}

export default Allproducts;


const DIV = styled.div`
width: 100%;

`

const PROD = styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    
    gap:20px;
    margin: 10px;
`

const CARD = styled.div`

box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

padding: 10px;
img{
        width: 60%;
        margin: auto;
    }

    text-align: start;
.cat{
    text-transform:uppercase;
}

`

const H2= styled.h2`
  white-space: nowrap; 
  width: 250px; 
  overflow: hidden;
  text-overflow: ellipsis;
  
`