import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Divider } from 'antd';
import classes from './style.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { ADDITEM, DELETEITEM } from '../../Redux/Actions/Action';
import { DeleteFilled } from '@ant-design/icons'
import './style.module.css'
import { toast } from 'react-toastify';


const Items = () => {

    const getData = useSelector((state) => state.invoiceReducer.invoiceData)

    const getItems = useSelector((state) => state.itemsReducer.items)

    const INITIAL_ITEM = {
        itemID: "",
        itemName: "",
        itemDescription: "",
        itemQty: "",
        itemRate: "",
        total: ""
    }

    const dispatch = useDispatch()

    const [itemData, setItemData] = useState(INITIAL_ITEM)

    const { itemName, itemDescription, itemQty, itemRate, itemID } = itemData

    const [ itemTotal, setItemTotal ] = useState()

    const [ gst, setGst ] = useState()

    const [ grandTotal, setGrandTotal ] = useState()

    const handleDelete = (id) => {
        dispatch(DELETEITEM(id))
    }

    const handleChange = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value })
    }

    const handleChangeQty = (e) => {
        const QtyValue = e.target.value.replace(/\D/g, '');
        setItemData({ ...itemData, [e.target.name]: QtyValue })
    }

    const handleChangeRate = (e) => {
        const RateValue = e.target.value.replace(/\D/g, '');
        setItemData({ ...itemData, [e.target.name]: RateValue })
    }

    const handleAdd = (e) => {
        const total = itemData.itemQty * itemData.itemRate

        const ALL = itemName && itemDescription && itemQty && itemRate

        if (!ALL) {
            toast.error("All Fill is Required")
        } else if (!/[0-9]/g.test(itemQty && itemRate)) {
            toast.error("Please Eter Only Numbers")
        }
        else {
            dispatch(ADDITEM({ ...itemData, itemID: uuidv4(), total: total }))
            setItemData(INITIAL_ITEM)
        }
    }
    
    useEffect(() => {
        var sum = 0
        for (let i = 0; i < getItems.length; i++) {
            sum += getItems[i].total;
        }
        setItemTotal(sum)

        const GST = (sum / 100) * 18
        setGst(GST)

        setGrandTotal(sum + GST)
    },[itemData, getItems, getData])

    return (
        <div>
            {
                getItems?.map((element, index) =>
                    <div className="row px-3 align-items-start my-1" key={index}>
                        <div className="col-md-6 mb-3">
                            <div className="border border-dark rounded p-3 align-items-center mb-2">
                                <h6 className='p-0 m-0'>{element.itemName}</h6>
                            </div>
                            <div className="border border-dark rounded p-3 align-items-center">
                                <h6 className='p-0 m-0'>{element.itemDescription}</h6>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-4 ">
                                    <div className='align-items-center border border-dark rounded p-2 '>
                                        <h6 className='p-0 m-0'>{element.itemQty}</h6>
                                    </div>
                                </div>
                                <div className="col-4 ">
                                    <div className='align-items-center border border-dark rounded p-2 '>
                                        <h6 className='p-0 m-0'>{element.itemRate}</h6>
                                    </div>
                                </div>
                                <div className="col-4 ">
                                    <div className='align-items-center border border-dark rounded p-2 '>
                                        <h6 className='p-0 m-0'>{element.total}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-end">
                                    <DeleteFilled className='text-danger fs-3 fw-bold m-5 cursor' onClick={(e) => handleDelete(element.itemID)} />
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                )
            }
            <>
                <div className="row  px-3 align-items-start my-3">
                    <div className="col-md-6 mb-3">
                        <div className="item-form">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="your@email.com" name='itemName' value={itemName} onChange={(e) => handleChange(e)} autoComplete="off" />
                                <label>Item Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingPassword" placeholder="Who Is This Invoice From?" name='itemDescription' value={itemDescription} onChange={(e) => handleChange(e)} autoComplete="off" />
                                <label>Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" className="form-control" id="floatingPassword" name='itemQty' value={itemQty} placeholder="QTY" onChange={(e) => handleChangeQty(e)} autoComplete="off" />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" id="floatingPassword" name='itemRate' value={itemRate} placeholder="RATE" onChange={(e) => handleChangeRate(e)} autoComplete="off" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-end">
                                <button className='fw-bold btn btn-success m-5' type='button' onClick={(e) => handleAdd(e)}>Add Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Divider />
            <div className="row px-3">
                <div className="col-md-6 offset-md-6">
                    <div className="subtotal d-flex justify-content-between">
                        <h6 className='text-danger fw-bold'>Sub Total</h6>
                        <h6 className=' px-5 pb-2'>???{itemTotal}</h6>
                    </div>
                    <div className="subtotal d-flex justify-content-between">
                        <h6 className='text-danger fw-bold'>+ GST(18%)</h6>
                        <h6 className='px-5 pb-2'>???{gst?.toFixed(2)}</h6>
                    </div>
                    <div className="subtotal d-flex justify-content-between">
                        <h6 className='text-danger fw-bold'>Total</h6>
                        <h6 className='border-0 border-bottom px-5 pb-2 border-dark'>???{grandTotal}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Items
