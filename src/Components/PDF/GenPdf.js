import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const ComponentToPrint = React.forwardRef((props, ref) => {

    const getData = useSelector((state) => state.invoiceReducer.invoiceData)

    const getItems = useSelector((state) => state.itemsReducer.items)

    const [ itemTotal, setItemTotal ] = useState()

    const [ gst, setGst ] = useState()

    const [ grandTotal, setGrandTotal ] = useState()

    useEffect(() => {
        var sum = 0
        for (let i = 0; i < getItems.length; i++) {
            sum += getItems[i].total;
        }
        setItemTotal(sum)

        const GST = (itemTotal / 100) * 18
        setGst(GST)

        setGrandTotal(sum + GST)
    },[getItems, getData])

    return (
        <div ref={ref}>
            {
                getData?.map((element, index) =>
                    <div className="container">
                        <div className="invoice-header bg-primary py-5 align-items-center">
                            <div className="row px-3">
                                <div className="col-6">
                                    <h1 className="text-white fw-bold m-0 ">{element.companyName}</h1>
                                </div>
                                <div className="col-6 text-end">
                                    <h6 className="text-white">{element.fromEmail}</h6>
                                    <h6 className="text-white fs-4">{element.fromText}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-to">
                            <div className="row py-5">
                                <div className="col-6">
                                    <p className="m-0 mb-2 text-secondary">Billed To</p>
                                    <p className="m-0 mb-2 fw-bold fs-5">{element.toEmail}</p>
                                    <p className="m-0 mb-2 fw-bold fs-5">{element.toText}</p>
                                </div>
                                <div className="col-6">
                                    <div className="invoice-no">
                                        <p className="m-0 mb-2 text-secondary">Invoice Number</p>
                                        <p className="m-0 mb-2 fw-bold fs-5">{element.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-item border-top border-2 border-primary py-3">
                            <div className="row">
                                <div className="col-3 text-start">
                                    <p className="fw-bold text-primary fs-5">Description</p>
                                </div>
                                <div className="col-3 text-center">
                                    <p className="fw-bold text-primary fs-5">Quantity</p>
                                </div>
                                <div className="col-3 text-center">
                                    <p className="fw-bold text-primary fs-5">Rate</p>
                                </div>
                                <div className="col-3 text-center">
                                    <p className="fw-bold text-primary fs-5">Total</p>
                                </div>
                            </div>
                            {
                                element.item?.map((element, index) =>
                                    <div className="row align-items-center border-bottom border-1 py-2">
                                        <div className="col-3 text-start">
                                            <h6>{element.itemName}</h6>
                                            <p>{element.itemDescription}</p>
                                        </div>
                                        <div className="col-3 text-center">
                                            <p className="fw-bold text-dark fs-5">{element.itemQty}</p>
                                        </div>
                                        <div className="col-3 text-center">
                                            <p className="fw-bold text-dark fs-5">₹{element.itemRate}</p>
                                        </div>
                                        <div className="col-3 text-center">
                                            <p className="fw-bold text-dark fs-5">₹{element.itemRate * element.itemQty}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-3 text-center">
                                <p className="fw-bold text-primary fs-5">Sub Total</p>
                                <p className="fw-bold text-primary fs-5 border-bottom border-dark pb-3">+ GST(18%)</p>
                                <p className="fw-bold text-primary fs-5">Total Payout</p>
                            </div>
                            <div className="col-3 text-center">
                                <p className="fw-bold text-dark fs-5">₹{itemTotal}</p>
                                <p className="fw-bold text-dark fs-5 border-bottom border-dark pb-3">₹{gst}</p>
                                <p className="fw-bold text-dark fs-5">₹{grandTotal}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
});