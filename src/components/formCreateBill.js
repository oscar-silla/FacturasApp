import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const BASE_URL = 'http://localhost:4000/bills';
const FormCreateBillComponent = () => {

    /* 
        HOOKS
    ************************************/
    const [state, setState] = useState({
        client: '',
        amount: '',
        done: false
    });
    const { client, amount, done } = state;

    /* 
        HANDLES
    ************************************/
    const onChangeClient = (e) => {
        setState({
            ...state,
            client: e.target.value
        });
    }

    const onChangeAmount = (e) => {
        setState({
            ...state,
            amount: e.target.value
        })
    }

    const onClick = (e) => {
        e.preventDefault();
        axios.post(BASE_URL, state)
            .then(res => {
                console.log(res);
                setState({
                    client: '',
                    amount: '',
                    done: true
                })
            });
    }

    return (
        <>
            {done && <Redirect to='/' />}
            <div className='container'>
                <h1 className='text-center mt-4'>Create new</h1>
                <hr />
                <div className='flex-align'>
                    <div className='width-create'>
                        <div className='card'>
                            <div className='card-header'>
                                Create new bill
                        </div>
                            <div className='card-body'>
                                <label>Client Name:</label>
                                <input type='text'
                                    name='client'
                                    placeholder='Example: "Jane Doe"'
                                    className='form-control'
                                    onChange={onChangeClient}
                                    value={client} />
                                <label className='mt-2'>Amount:</label>
                                <input type='number'
                                    name='amount'
                                    placeholder='Example: "300.00"'
                                    className='form-control'
                                    onChange={onChangeAmount}
                                    value={amount} />
                                <button type='submit'
                                    className='btn btn-primary btn-block mt-2'
                                    onClick={onClick}>
                                    Create
                                </button>
                                <Link style={{textDecoration: 'none'}} to='/' >
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
    );
}

export default FormCreateBillComponent;