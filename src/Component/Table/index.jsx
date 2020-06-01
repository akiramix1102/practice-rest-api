import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "reactstrap";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalExample from "../Modal/index";

const FormTable = ({ products, onDelete,getDataToPut }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data,setData] =useState([])


    const onShowModal = (product) => {
        setIsModalOpen(!isModalOpen);
        setData(product)
}

const handleDelete = (id) => {
    onDelete(id * 1);
};

const handleToggleHide = () => {
    setIsModalOpen(!isModalOpen)
}
const onGetData=(nameValue,priceValue,stockValue,id)=>{
    getDataToPut(nameValue,priceValue,stockValue,id)
}
return (
    <>
        <Table dark>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button onClick={() => onShowModal(product)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(product.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>

        </Table>
        <ModalExample isOpen={isModalOpen} toggleHide={handleToggleHide} product={data} getDataToPut={onGetData}/>
    </>
);
};

export default FormTable;
