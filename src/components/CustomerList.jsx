import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react"
import AddCustomer from "./AddCustomer";

export default function CustomerList() {

    const [customers, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMgsSnackbar] = useState("");
    const URLC = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

    const colums = [
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true, flex: 1 },
        { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, flex: 1 },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true, flex: 1 },
        { headerName: 'Post Code', field: 'postcode', sortable: true, filter: true, flex: 1 },
        { headerName: 'City', field: 'city', sortable: true, filter: true, flex: 1 },
        { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1 },
        { headerName: 'Phone number', field: 'phone', sortable: true, filter: true, flex: 1 },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 120
        }
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

    const addCustomer = (customer) => {
        fetch(URLC, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                console.log("response" + response);
                if (response.ok) {
                    setMgsSnackbar('Customer added successfully');
                    setOpenSnackbar(true);
                    return response.json;
                } else {
                    throw new Error('Datan vienti bakkariin ei onnistunut')
                }
            })
            .then(data => {
                console.log("parsed Json = " + data);
                getCustomers();
            })
    }

    const gridRef = useRef();

    const deleteCustomer = (params) => {
        console.log("params.data._links.customer.href = " + params.data._links.customer.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMgsSnackbar("The customer was deleted successfully!");
                        setOpenSnackbar(true);
                        getCustomers();
                    } else {
                        setMgsSnackbar("Something went wrong with deleting");
                        setOpenSnackbar(true);
                    }
                })
                .catch(error => console.error(error))
        }
    }

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ width: 1200, height: 600 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colums}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 30, 50]}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false);
                        setMgsSnackbar("")
                    }}
                />
            </div>
        </>
    )
}