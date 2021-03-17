import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';


const BASE_URL = 'http://localhost:4000/bills';
const EditBill = () => {

    /* 
        HOOKS
    ************************************/
    const [state, setState] = useState({
        bill: {},
        clientName: '',
        amount: '',
        updated: false
    });
    const { bill, clientName, amount, updated } = state;

    const { id } = useParams();

    useEffect(() => {
        axios.get(BASE_URL)
            .then(res => {
                let bill_found = res.data.find(bill => bill.id === parseInt(id));
                setState({
                    ...state,
                    bill: bill_found
                });
            });
    }, []);

    const onChangeClientName = (e) => {
        setState({
            ...state,
            clientName: e.target.value
        });
    }

    const onChangeAmount = (e) => {
        setState({
            ...state,
            amount: e.target.value
        })
    }

    const onClick = (e) => {
        const object = {
            client: clientName,
            amount: amount
        }
        axios.put(BASE_URL + `/${id}`, object)
            .then(res => {
                console.log(res);
                setState({
                    ...state,
                    clientName: '',
                    amount: '',
                    updated: true
                });
            })
    }

    return (
        <>
            {updated && <Redirect to='/' />}
            <div className='container'>
                <div className='flex-align'>
                    <div className='width-create'>
                        <div className='card mt-4'>
                            <div className='card-header'>
                                <h1>Edit Bill Nº {id}</h1>
                            </div>
                            <div className='card-body'>
                                <label>Client Name</label>
                                <input type='text'
                                    name='client'
                                    placeholder={bill.client}
                                    className='form-control'
                                    onChange={onChangeClientName}
                                    value={clientName} />
                                <label className='mt-2'>Amount</label>
                                <input type='number'
                                    name='client'
                                    placeholder={`${bill.amount}`}
                                    className='form-control'
                                    onChange={onChangeAmount}
                                    value={amount} />
                                <button onClick={onClick} className='btn btn-info btn-block mt-2'>
                                    Save Changes
                                </button>
                                <Link style={{textDecoration: 'none'}} to={`/detail/${id}`} >
                                    <button type='submit'
                                        className='btn btn-danger btn-block mt-2'>
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBill;