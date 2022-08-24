import React, { useEffect, useState } from 'react'
import classes from './style.module.css'
import { DatePicker, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADDITEM, SENDDATA } from '../../Redux/Actions/Action';
import { v4 as uuidv4 } from 'uuid';

const Invoice = () => {

    const INITIAL_DATA = {
        date: "",
        companyName: "",
        fromEmail: "",
        fromText: "",
        toEmail: "",
        toText: "",
        item: []
    }

    const INITIAL_ITEM = {
        itemID:uuidv4(),
        itemName: "",
        itemDescription: "",
        itemQty: "",
        itemRate: ""
    }

    const getData = useSelector((state) => state.invoiceReducer.invoiceData)

    const getItems = useSelector((state) => state.itemsReducer.items)

    const dispatch = useDispatch()

    const [data, setData] = useState(INITIAL_DATA)

    const [itemData, setItemData] = useState(INITIAL_ITEM)

    const { date, companyName, fromEmail, fromText, toEmail, toText } = data

    const { itemName, itemDescription, itemQty, itemRate } = itemData

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        // console.log(data)
    }

    const handleItem = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value })
        console.log(itemData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        data.item.push(itemData)
        console.log(data)
        dispatch(SENDDATA(data))
    }

    const handleAdd = (e) => {
        dispatch(ADDITEM(INITIAL_ITEM))
    }

    useEffect(() => {
        console.log(getData)
    }, [data])

    return (
        <div className={classes.defaultBackground}>
            <form action="#" onSubmit={(e) => handleSubmit(e)}>
                {/* Header Section  */}
                <div className="container">
                    <div className="row p-5">
                        <div className="col-md-9">
                            <div className={classes.invoice}>
                                <div className="row align-items-baseline">
                                    <div className="col-md-6">
                                        <input type="date" onChange={(e) => handleChange(e)} name="date" value={date} className="p-2" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="Enter Your Company Name" name='companyName' value={companyName} onChange={(e) => handleChange(e)} />
                                            <label>Enter Your Company Name</label>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                {/* GET INVOICE DATA  */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className='fw-bold text-dark'>Bill From</p>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="your@email.com" name='fromEmail' value={fromEmail} onChange={(e) => handleChange(e)} />
                                            <label>Email address</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingPassword" placeholder="Who Is This Invoice From?" value={fromText} name='fromText' onChange={(e) => handleChange(e)} />
                                            <label>Who Is This Invoice From?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <p className='fw-bold text-dark'>Bill To</p>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="your@email.com" name='toEmail' value={toEmail} onChange={(e) => handleChange(e)} />
                                            <label>Email address</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingPassword" placeholder="Who Is This Invoice To?" value={toText} name='toText' onChange={(e) => handleChange(e)} />
                                            <label>Who Is This Invoice To?</label>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="row px-3 align-items-start">
                                    <div className="col-6">
                                        <h6>ITEM</h6>
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-4">
                                                <h6>QTY</h6>
                                            </div>
                                            <div className="col-4">
                                                <h6>RATE</h6>
                                            </div>
                                            <div className="col-4">
                                                <h6>TOTAL</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="row  px-3 align-items-start">
                                    {
                                        getItems?.map((element, index) =>
                                            <>
                                                <div className="col-6">
                                                    <div className="item-form">
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id="floatingInput" placeholder="your@email.com" name='itemName' defaultValue={element.itemName} onChange={(e) => handleItem(e)} />
                                                            <label>Item Name</label>
                                                        </div>
                                                        <div className="form-floating">
                                                            <input type="text" className="form-control" id="floatingPassword" placeholder="Who Is This Invoice From?" name='itemDescription' defaultValue={element.itemDescription} onChange={(e) => handleItem(e)} />
                                                            <label>Description</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" id="floatingPassword" name='itemQty' defaultValue={element.itemQty} placeholder="QTY" onChange={(e) => handleItem(e)} />
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" id="floatingPassword" name='itemRate' defaultValue={element.itemRate} placeholder="RATE" onChange={(e) => handleItem(e)} />
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="text" className="form-control" id="floatingPassword" placeholder="0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                                <Divider />
                                <div className="row px-3">
                                    <div className="col-6">
                                        <h6 className='text-primary fw-bold' onClick={(e) => handleAdd(e)}>Add Item</h6>
                                    </div>
                                    <div className="col-6 d-flex justify-content-between">
                                        <h6 className='text-danger fw-bold'>Total</h6>
                                        <h6 className='border-0 border-bottom px-5 pb-2 border-dark'>Total</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 px-3">
                            <button type="submit" className='btn btn-primary w-100 mb-3 py-2'>Send Invoice</button>
                            <button className='btn btn-secondary w-100 py-2'>Send Invoice</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Invoice