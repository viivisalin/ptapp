import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react"

export default function CustomerList() {

    const [customers, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }]);
    const URLC = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

    const colums = [
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true, flex: 1 },
        { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, flex: 1 },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true, flex: 1 },
        { headerName: 'Post Code', field: 'postcode', sortable: true, filter: true, flex: 1 },
        { headerName: 'City', field: 'city', sortable: true, filter: true, flex: 1 },
        { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1 },
        { headerName: 'Phone number', field: 'phone', sortable: true, filter: true, flex: 1 }
    ];

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(URLC)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata._embedded.customers);
                setCustomers(responsedata._embedded.customers);
            })
            .catch(error => console.error(error))
    }

    const gridRef = useRef();

    return (
        <>
            <div className="ag-theme-material" style={{ width: 1200, height: 600}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colums}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 30, 50]}
                />
            </div>
        </>
    )
}