import React from "react";
import Select from 'react-select';
import { Row,Col } from "reactstrap";


function TableInput({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { groupName } = data;
            return (
                <tr key={index}>
                    <td>
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
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



export default TableInput;

