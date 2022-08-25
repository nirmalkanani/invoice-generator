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

    const getItems = useSelector((state) => state.itemsReducer.items)

    const INITIAL_ITEM = {
        itemID: "",
        itemName: "",
        itemDescription: "",
        itemQty: "",
        itemRate: "",
        total:""
    }

    const dispatch = useDispatch()

    const [itemData, setItemData] = useState(INITIAL_ITEM)

    const { itemName, itemDescription, itemQty, itemRate, itemID } = itemData

    const handleDelete = (id) => {
        dispatch(DELETEITEM(id))
    }

    const handleChange = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value })
    }

    const handleAdd = (e) => {
        const ALL = itemName && itemDescription && itemQty && itemRate

        if (!ALL) {
            toast.error("All Fill is Required")
        } else if (!/[0-9]/g.test(itemQty && itemRate)) {
            toast.error("Please Eter Only Numbers")
        }
        else {
            dispatch(ADDITEM({ ...itemData, itemID: uuidv4() }))
            setItemData(INITIAL_ITEM)
        }
    }

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
                                <div className="col-6 ">
                                    <div className='align-items-center border border-dark rounded p-2 '>
                                        <h6 className='p-0 m-0'>{element.itemQty}</h6>
                                    </div>
                                </div>
                                <div className="col-6 ">
                                    <div className='align-items-center border border-dark rounded p-2 '>
                                        <h6 className='p-0 m-0'>{element.itemRate}</h6>
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
                                <input type="text" className="form-control" id="floatingInput" placeholder="your@email.com" name='itemName' value={itemName} onChange={(e) => handleChange(e)} />
                                <label>Item Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingPassword" placeholder="Who Is This Invoice From?" name='itemDescription' value={itemDescription} onChange={(e) => handleChange(e)} />
                                <label>Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" className="form-control" id="floatingPassword" name='itemQty' value={itemQty} placeholder="QTY" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" id="floatingPassword" name='itemRate' value={itemRate} placeholder="RATE" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Divider />
            <div className="row px-3">
                <div className="col-6">
                    <button className='fw-bold btn btn-success' type='button' onClick={(e) => handleAdd(e)}>Add Item</button>
                </div>
                <div className="col-6 d-flex justify-content-between">
                    <h6 className='text-danger fw-bold'>Total</h6>
                    <h6 className='border-0 border-bottom px-5 pb-2 border-dark'>0</h6>
                </div>
            </div>
        </div>
    )
}

export default Items
