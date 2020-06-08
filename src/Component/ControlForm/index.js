import React, { useState } from "react";
import {
    Col,
    Button,
    DropdownMenu,
    ButtonDropdown,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";
function ControlForm({ handleSearch, onSort, onShowForm,onChangeProductPerPage }) {

    const [value, setValue] = useState('')
    const [dropdownOpen, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(true)
    const [selectValue, setSelectValue] = useState(5)
    const onChangeValue = (e) => {
        setValue(e.target.value)
    }
    const onHandleSearch = () => {
        handleSearch(value);
    }
    const handleClick = (sortBy, sortValue) => {
        onSort(sortBy, sortValue)
    }

    const toggle = () => setOpen(!dropdownOpen);

    const handleShowForm = () => {
        setShowForm(!showForm);
        onShowForm(showForm);
    }
    const handleChangeValue = (e) => {
            setSelectValue(e.target.value*1);
            onChangeProductPerPage(e.target.value*1);
    }
    return (
        <>
            <Col md={2}>
                <Button color="danger" outline onClick={handleShowForm}>
                    Add Product
          </Button>
            </Col>
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
            <Col md={2}>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret className="btn btn-outline-dark">Bộ lọc</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleClick('name', 1)}>Tên A - Z</DropdownItem>
                        <DropdownItem onClick={() => handleClick('name', -1)}>Tên Z - A</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => handleClick('price', 1)}>Giá cao - thấp</DropdownItem>
                        <DropdownItem onClick={() => handleClick('price', -1)}>Giá thấp - cao</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => handleClick('stock', 1)}>Dự trữ cao - thấp</DropdownItem>
                        <DropdownItem onClick={() => handleClick('stock', -1)}>Dự trữ thấp - cao</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Col>
            <Col md={2}>
                <form>
                    <div className="form-group">
                        <select className="form-control" id="exampleFormControlSelect1" value={selectValue} onChange={handleChangeValue}>
                            <option value="5">5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                        </select>
                    </div>
                </form>
            </Col>
        </>
    );
}

export default ControlForm;
