import React, { useState } from "react";
import {
    Row,
    Col,
    Button,
    DropdownMenu,
    ButtonDropdown,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";
function ControlForm({handleSearch,onSort}) {
    
    const [value,setValue]=useState('')
    const [dropdownOpen, setOpen] = useState(false);

    const onChangeValue=(e)=>{
        setValue(e.target.value)
    }
    const onHandleSearch=()=>{
        handleSearch(value);
    }
    const handleClick=(sortBy,sortValue)=>{
        onSort(sortBy,sortValue)
    }

    const toggle = () => setOpen(!dropdownOpen);
    return (
        <>
            <Col md={6}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        name="keyword"
                        value={value}
                        onChange={onChangeValue}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-outline-success" type="button" onClick={onHandleSearch}>
                          Tìm Kiếm
            </button>
                    </span>
                </div>
            </Col>
            <Col md={3}>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret className="btn btn-outline-dark">Bộ lọc</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>handleClick('name',1)}>Tên A - Z</DropdownItem>
                        <DropdownItem onClick={()=>handleClick('name',-1)}>Tên Z - A</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={()=>handleClick('price',1)}>Giá cao - thấp</DropdownItem>
                        <DropdownItem onClick={()=>handleClick('name',-1)}>Giá thấp - cao</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={()=>handleClick('stock',1)}>Dự trữ cao - thấp</DropdownItem>
                        <DropdownItem onClick={()=>handleClick('stock',-1)}>Dự trữ thấp - cao</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </>
    );
}

export default ControlForm;
