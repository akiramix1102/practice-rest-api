import React from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import FormTable from './Component/Table';
import FormControl from './Component/Form';

import './App.css'
import { useState,useEffect } from 'react';


function App() {

  const [products, setProducts] = useState([]);

  const baseUrl = 'https://5ece614261c8480016701483.mockapi.io/Products/';

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(res => setProducts(res.data))
  }, [])

  const handleSubmit = (namevalue, pricevalue, stockvalue) => {
    axios
      .post(baseUrl, {
        name: namevalue,
        price: pricevalue * 1,
        stock: stockvalue * 1
      })
      .then(res => setProducts(products.concat(res.data)))
      .catch(error => console.error(error))

  }

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/${id}`)

      .then(() =>setProducts(products.filter(product=>product.id!==id))) 
      .catch(error => console.error(error));
    // setProducts(products.filter(product=>product.id!==id))
  }

  const getDataToPut =(nameValue,priceValue,stockValue,id)=>{
      axios
      .put(`${baseUrl}/${id}`,{
        name:nameValue,
        price:priceValue,
        stock:stockValue
      })
      .then(res=>setProducts(products.map(product=>
        product.id===id
        ? res.data
        : product
        )))
        .catch(error => console.error(error))   
  }

  return (
    <Container >
      <FormControl onSubmit={handleSubmit} />
      <FormTable products={products} onDelete={handleDelete} getDataToPut={getDataToPut}/>
    </Container>
  )
}
export default App;