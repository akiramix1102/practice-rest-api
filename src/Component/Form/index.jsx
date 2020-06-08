import React from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { Row, Col } from "reactstrap";
import { useState } from "react";

const FormControl = ({  onSubmit }) => {
    const [namevalue, setNameValue] = useState('');
    const [pricevalue, setPriceValue] = useState(0);
    const [stockvalue, setStockValue] = useState(0);

    const onChangeName = (e) => {
        setNameValue(e.target.value);
    };

    const onChangePrice = (e) => {
        setPriceValue(e.target.value);
    };

    const onChangeStock = (e) => {
        setStockValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(namevalue, pricevalue, stockvalue);
        setNameValue('');
        setPriceValue(0);
        setStockValue(0)
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="row-form">
                <Col>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            value={namevalue}
                            name="name"
                            id="name"
                            placeholder="Name product"
                            onChange={onChangeName}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                            type="text"
                            value={pricevalue}
                            name="price"
                            id="price"
                            placeholder="Price product"
                            onChange={onChangePrice}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="stock">Stock</Label>
                        <Input
                            type="text"
                            value={stockvalue}
                            name="stock"
                            id="stock"
                            placeholder="Stock product"
                            onChange={onChangeStock}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Button className="btn-custom btn btn-success">
                            Add
          </Button>
                    </FormGroup>
                </Col>
            </Row>
        </Form >
    );
};

export default FormControl;
