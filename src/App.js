import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';

import { Container, Row, Col, Button } from "reactstrap";
import FormTable from "./Component/Table";
import Form from "./Component/Form";
import Pagination from "./Component/Pagination";
import ControlForm from './Component/ControlForm'
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(5);
  const [sortBy,setSortBy]=useState('');
  const [sortValue,setSortValue]=useState(1)

  const [showForm, setShowForm] = useState(false);

  const baseUrl = "http://localhost:3001/products";

  useEffect(() => {
    axios.get(baseUrl).then((res) => setProducts(res.data));
  }, []);

  const handleSubmit = (namevalue, pricevalue, stockvalue) => {
    axios
      .post(baseUrl, {
        name: namevalue,
        price: pricevalue * 1,
        stock: stockvalue * 1,
      })
      .then((res) => setProducts(products.concat(res.data)))
      .catch((error) => console.error(error));
      addSucc();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Product will be delete!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`${baseUrl}/${id}`)

          .then(() => {
            // setProducts(products.filter(product=>product.id!==id))
            let filterList = products.filter((product) => product.id !== id);
            setProducts(filterList);
          })
          .catch((error) => console.error(error));
        // setProducts(products.filter(product=>product.id!==id))

        deleteSucc();
      }
    })
  };

  const getDataToPut = (nameValue, priceValue, stockValue, id) => {
    axios
      .put(`${baseUrl}/${id}`, {
        name: nameValue,
        price: priceValue,
        stock: stockValue,
      })
      .then((res) =>
        setProducts(
          products.map((product) => (product.id === id ? res.data : product))
        )
      )
      .catch((error) => console.error(error));
      updateSucc();
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = products.slice(indexOfFirstProduct,indexOfLastProduct);

  const paginate = (number) => {
    setCurrentPage(number);
  };

//toast
  const addSucc = () => toast("Added successfully!"); 
  const deleteSucc = () => toast("Deleted successfully!");
  const updateSucc = () => toast("Updated successfully!");

  const handleSearch = keyword => {
    if (keyword.length>0) {
      const result= products.filter(product=>{
        return product.name.toLowerCase().includes(keyword.toLowerCase())
      });
      setProducts(result)
     }


    // else
    // {
    //   return products;
    // }

  }

  const onSort=(sortBy,sortValue)=>{
   setSortBy(sortBy);
   setSortValue(sortValue)
    if(sortBy==='name'){
      products.sort((a,b)=>{
        if(a.name>b.name) return sortValue;
        else if(a.name<b.name) return -sortValue;
        else return 0;
      })
    }
    else if(sortBy==='price'){
      products.sort((a,b)=>{
        if(a.price>b.price) return -sortValue;
        else if(a.price<b.price) return sortValue;
        else return 0;
      })
    }
    else{
      products.sort((a,b)=>{
        if(a.stock>b.stock) return -sortValue;
        else if(a.stock<b.stock) return sortValue;
        else return 0;
      })
    }
  }
  return (
    <>
      <Container>
        <div className="text-center title">
          <h1>Quản Lý Sản Phẩm</h1>
        </div>
        <Row className="control">
          <Col md={3}>
            <Button color="danger" outline onClick={() => setShowForm(!showForm)}>
              Add Product
          </Button>
          </Col>
          <ControlForm handleSearch={handleSearch} onSort={onSort} />
        </Row>

        

        <Row>
          <Col xs={showForm ? 4 : 12}>
            {showForm ? <Form onSubmit={handleSubmit} /> : ""}
          </Col>

          <Col xs={showForm ? 8 : 12}>
            <FormTable
              products={currentProduct}
              onDelete={handleDelete}
              getDataToPut={getDataToPut}
            />
          </Col>

          <Col xs={12}>
            <Pagination
              productPerPage={productPerPage}
              totalProduct={products.length}
              paginate={paginate}
            
            />
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
