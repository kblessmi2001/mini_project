import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import styled from "styled-components";
import "./admin.css";
import { Modal, Button, ModalOverlay, ModalCloseButton, ModalContent, FormLabel, FormControl, Input, ModalFooter, useDisclosure, ModalHeader, ModalBody, Flex, Box, Heading, Spacer, ButtonGroup } from "@chakra-ui/react";

const intialupdate = {
    name: "",
    price: ""
}

const intialadd = {
    name: "",
    price: "",
    image:"",
    description:"",
    category:""
}

const Admin = () => {

    const [del, setdel] = useState(false)
    const [data, setdata] = useState([]);
    const [edit, setedit] = useState(intialupdate);
    const [addprod,setaddprod] = useState(intialadd);
    

    useEffect(() => {

        axios.get("http://localhost:4500/products/get").then((res) => {
            console.log(res)
            setdata(res.data.data)
        }).catch((err) => {
            console.log(err)
        })


    }, [del])


    const deleteProd = (id) => {
        axios.delete(`http://localhost:4500/products/delete/${id}`).then((res) => {
            console.log(res)
            setdel(!del)
        }).catch((error) => {
            console.log(error)
        })
    }


    const { isOpen: updateisOpen, onOpen: updateonOpen, onClose: updateonClose } = useDisclosure();
    const { isOpen: addisOpen, onOpen: addonOpen, onClose: addonClose } = useDisclosure();

    const initialRef = useRef(null)
    const finalRef = useRef(null)


    const handleChange = (e) => {
        const { value, name } = e.target;

        setedit({ ...edit, [name]: (name === "price") ? +value : value })

    }


    const updatebtn = (id) => {
        if (edit.name !== "" && edit.price !== "") {
            axios.patch(`http://localhost:4500/products/update/${id}`, edit).then((res) => {
                console.log(res);
                setedit(intialupdate);
                updateonClose();
                setdel(!del)
            }).catch((err) => {
                console.log(err);
            })
        }else{
            alert("Enter All Details")
        }
        console.log(id)
    }


    const handleAddChange = (e) => {
        const { value, name } = e.target;

        setaddprod({ ...addprod, [name]: (name === "price") ? +value : value })

    }


    const addBtn = () => {
        if (addprod.name !== "" && addprod.price !== "" && addprod.image !== "" && addprod.category !=="" && addprod.description !== "") {
            axios.post(`http://localhost:4500/products/post`, addprod).then((res) => {
                console.log(res);
                setaddprod(intialadd);
                addonClose();
                setdel(!del)
            }).catch((err) => {
                console.log(err);
            })
        }else{
            alert("Enter All Details")
        }
        
    }








    return (
        <DIV>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box p='2'>
                    <Heading size='md'>Admin Page</Heading>
                </Box>
                <Spacer />

               
                <Button onClick={addonOpen}>Add Product</Button>
                

                <Modal
                   
                    isOpen={addisOpen}
                    onClose={addonClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Product Title</FormLabel>
                                <Input  name='name' value={addprod.name} placeholder='Enter Product Title' onChange={handleAddChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Price</FormLabel>
                                <Input name='price' value={addprod.price} placeholder='Enter Product Price' onChange={handleAddChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>category</FormLabel>
                                <Input name='category' value={addprod.category} placeholder='Enter Product Category'  onChange={handleAddChange}/>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>image</FormLabel>
                                <Input name='image' value={addprod.image} placeholder='Enter Product Image Url' onChange={handleAddChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input name='description' value={addprod.description} placeholder='Enter Product Description' onChange={handleAddChange} />
                            </FormControl>
                           
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={addBtn}>
                                ADD
                            </Button>
                            <Button onClick={addonClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Flex>
            <PROD>

                {
                    data?.map((item) => (
                        <CARD key={item._id}>
                            <img src={item.image} alt="image" />
                            <h2>{item.name}</h2>
                            <h3>{item.price}$</h3>
                            <p>{item.description}</p>
                            <p className='cat'>{item.category}</p>

                            <div className='BTNS-ADMIN'>
                                <button className='button-del' onClick={() => deleteProd(item._id)}><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>


                                <button className="Btn" onClick={updateonOpen}>Edit
                                    <svg className="svg" viewBox="0 0 512 512">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                </button>



                                <Modal
                                    initialFocusRef={initialRef}
                                    finalFocusRef={finalRef}
                                    isOpen={updateisOpen}
                                    onClose={updateonClose}
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Update Price and Title</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                            <FormControl>
                                                <FormLabel>Title</FormLabel>
                                                <Input ref={initialRef} onChange={handleChange} value={edit.name} name='name' placeholder='Enter Product Title' />
                                            </FormControl>

                                            <FormControl mt={4}>
                                                <FormLabel>Price</FormLabel>
                                                <Input name='price' type='number' onChange={handleChange} value={edit.price} placeholder='Enter Product Price' />
                                            </FormControl>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme='blue' mr={3} onClick={() => updatebtn(item._id)}>
                                                Update
                                            </Button>
                                            <Button onClick={updateonClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        </CARD>
                    ))
                }


            </PROD>
        </DIV>
    )
}

export default Admin;


const DIV = styled.div`
width: 100%;

`

const PROD = styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-auto-rows: 500px;
    gap:20px;
    margin: 10px;
`

const CARD = styled.div`

box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

padding: 10px;
img{
        width: 60%;
       margin-left: 50px;
    }

    text-align: start;
.cat{
    text-transform:uppercase;
}
h2{
    white-space: nowrap; 
  width: 250px; 
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight:bolder;
}
`

