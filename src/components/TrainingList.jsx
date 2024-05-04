import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import CustomerList from "./CustomerList";
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs';


export default function TrainingList() {

    const [trainings, setTrainings] = useState([{ date: '', duration: '', activity: '' }]);
    const [customerInfo, setCustomerInfo] = useState([{ firstname: '', lastname: '' }])
    const URLT = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings';

    const colums = [
        { headerName: 'Date', field: 'date', sortable: true, filter: true, flex: 1, valueGetter: (params) => {
            return dayjs(params.data.date).format('DD.MM.YYYY HH:mm') }},
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true, flex: 1 },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true, flex: 1 },
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true, flex: 1 },
        { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, flex: 1 }
    ];

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(URLT)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata._embedded.trainings);
                setTrainings(responsedata._embedded.trainings);
            })
            .catch(error => console.error(error))
    }
    
    useEffect(() => getCustomerInfo(), []);

    const getCustomerInfo = () => {
        
    }

    const gridRef = useRef();

    return (
        <>
            <div className="ag-theme-material" style={{ width: 1200, height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colums}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 30, 50]}
                />
            </div>
        </>
    )
}