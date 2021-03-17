import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const BASE_URL = 'http://localhost:4000/bills';
const DetailBillComponent = () => {

    /* 
        HOOKS
    ************************************/
    const [state, setState] = useState({
        bill: {},
        isDeleted: false
    });
    const { bill, isDeleted } = state;

    const [show, setShow] = useState(false);

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

    /* 
        HANDLES
    ************************************/
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        console.log('Hola')
        axios.delete(BASE_URL + `/${id}`)
            .then(res => {
                console.log(res);
                setState({
                    ...state,
                    isDeleted: true
                });
            });
    }

    return (
        <>
            {isDeleted && <Redirect to="/" />}
            <div className='container'>
                <div className='header-detail'>
                    <div className='flex-paragraph'>
                        <h1 className='mt-4 text-center'>Detail Bill Nº{bill.id}</h1>
                        <Link to={`edit/${id}`}>
                            <button className='btn btn-warning mt-4 ml-5'>
                                Edit
                        </button>
                        </Link>
                        <Button className='mt-4 ml-2' variant="danger" onClick={handleShow}>
                            Delete
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure to delete the bill nº {bill.id}?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <hr />
                <div className='flex-paragraph'>
                    <h5 className='color-decoration'>Client Name:</h5>
                    <h3 className='ml-3 crimson'>{bill.client}</h3>
                </div>
                <div className='flex-paragraph'>
                    <h5 className='color-decoration'>Amount:</h5>
                    <h3 className='ml-3 crimson'>{bill.amount}€</h3>
                </div>
                <Link style={{ textDecoration: 'none' }} to='/' >
                    <button type='submit'
                        className='btn btn-danger mt-2'>
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
}

export default DetailBillComponent;