import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const BASE_URL = 'http://localhost:4000/bills';
const TableFacturasComponent = () => {

    /* 
        HOOKS
    ************************************/
    const [state, setState] = useState({
        bills: []
    });
    const { bills } = state;

    useEffect(() => {
        axios.get(BASE_URL)
            .then(res => {
                setState({
                    bills: res.data
                });
            })
    }, []);

    return (
        <div className='align container'>
            <h1 className='mt-3'>Facturas</h1>
            <hr />
            <div className='flex-align'>
                <Table striped bordered hover className="width-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Importe</th>
                            <th>Nº Factura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bills.map(bill => {
                                return (
                                    <tr key={bill.id}>
                                        <td>{bill.client}</td>
                                        <td>{bill.amount}€</td>
                                        <td><Link to={`/detail/${bill.id}`}>{bill.id}</Link></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <Link to='/create'>
                <button className='btn btn-outline-primary button'>
                        Create Bill
                </button>
            </Link>
        </div>
    )
}

export default TableFacturasComponent;