import React from "react";
import Select from 'react-select';
import { Row,Col } from "reactstrap";

function TableRows({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { groupName } = data;
            return (
                <tr key={index}>
                    <td>
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                    </td>

                    <td ><button className="btn btn-success">Save</button>  <button className="btn btn-primary" onClick={() => (deleteTableRows(index))}>Cancel</button></td>
                </tr>
            )
        })
    )
}




function Checklist({ rowsData, deleteTableRows, handleChange, handleSelectSingle, singleOptions }) {
    const SingleOptions = [
        { value: 'Choices 1', label: 'Choices 1' },
        { value: 'Choices 2', label: 'Choices 2' },
        { value: 'Choices 3', label: 'Choices 3' },
        { value: 'Choices 4', label: 'Choices 4' }
    ];

    return (
        rowsData.map((data, index) => {
            const { groupName } = data;
            return (
         
                    <tr key={index}>
                  
                            <td>
                                <Select
                                    value={{ label: groupName, value: groupName }}
                                    onChange={() => {
                                        handleSelectSingle();
                                    }}
                                    options={SingleOptions}
                                />
                            </td>
                        
                     
                            <td >
                                <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                            </td>
                  
                            <td ><button className="btn btn-success">Save</button>  <button className="btn btn-primary" onClick={() => (deleteTableRows(index))}>Cancel</button></td>

                     

                    </tr>
    




            )
        })
    )
}




export default TableRows;

export { Checklist };