import React, { useState, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import classes from './style.module.css'
import { Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SENDDATA,RESETREDUX,RESETITEMS } from '../../Redux/Actions/Action';
import Items from './Items';
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../PDF/GenPdf';
import { v4 as uuidv4 } from 'uuid';

const Invoice = () => {

    const componentRef = useRef();

    const INITIAL_DATA = {
        id:"",
        date: "",
        companyName: "",
        fromEmail: "",
        fromText: "",
        toEmail: "",
        toText: "",
        item: []
    }

    const getData = useSelector((state) => state.invoiceReducer.invoiceData)

    const getItems = useSelector((state) => state.itemsReducer.items)

    const dispatch = useDispatch()

    const [data, setData] = useState(INITIAL_DATA)

    const { date, companyName, fromEmail, fromText, toEmail, toText } = data

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        const ALL = date && companyName && fromEmail && fromText && toEmail && toText
        if (!ALL) {
            e.preventDefault()
            toast.error('Please Fill Require Data')
            setData(INITIAL_DATA)
        } else {
            e.preventDefault()
            dispatch(SENDDATA({ ...data, item: getItems, id:uuidv4() }))
            toast.success('Successfully Send')
            setData(INITIAL_DATA)
            
        }

    }

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
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Enter Your Company Name" name='companyName' value={companyName} onChange={(e) => handleChange(e)} />
                                            <label>Enter Your Company Name</label>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
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
                                            <div className="col-6">
                                                <h6>QTY</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6>RATE</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <Items />
                            </div>
                        </div>
                        <div className="col-md-3 px-3">
                            <button type="submit" className='btn btn-primary w-100 mb-3 py-2'>Send Invoice</button>
                            
                            <ReactToPrint
                                trigger={() => <button type='button' className='btn btn-secondary w-100 py-2'>Download Invoice</button>}
                                content={() => componentRef.current}
                                onAfterPrint={() => (dispatch(RESETITEMS()))}
                            />
                            <div className='d-none'>
                                <ComponentToPrint ref={componentRef}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default Invoice