import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";

const ModalExample = (props) => {
    const { className, isOpen, toggleHide, product,getDataToPut } = props;

    const [nameValue, setNameValue] = useState(product.name)
    const [priceValue, setPriceValue] = useState(product.price)
    const [stockValue, setStockValue] = useState(product.stock)


    //sync props to state in React Hooks
    useEffect(() => {
        setNameValue(product.name);
        setPriceValue(product.price);
        setStockValue(product.stock);
    }, [product.name, product.price, product.stock])

    const onHideModal = () => {
        toggleHide();
    };

    const handleOnChangeName = (e) => {
        setNameValue(e.target.value)
    }

    const handleOnChangePrice = (e) => {
        setPriceValue(e.target.value*1)
    }
    const handleOnChangeStock = (e) => {
        setStockValue(e.target.value*1)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getDataToPut(nameValue,priceValue,stockValue,product.id*1);
        toggleHide();
    }   
    return (
        <div>
            <Modal isOpen={isOpen} className={className}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={nameValue}
                                        id="name"
                                        placeholder={nameValue}
                                        onChange={handleOnChangeName}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <Input
                                        type="text"
                                        name="price"
                                        value={priceValue}
                                        id="price"
                                        placeholder="Price product"
                                        onChange={handleOnChangePrice}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="stock">Stock</Label>
                                    <Input
                                        type="text"
                                        name="stock"
                                        value={stockValue}
                                        id="stock"
                                        placeholder="Stock product"
                                        onChange={handleOnChangeStock}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" onClick={(e)=>handleSubmit(e,product.id)}>
                        Save
          </Button>
                    <Button color="secondary" onClick={() => onHideModal(isOpen)}>
                        Cancel
          </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalExample;
