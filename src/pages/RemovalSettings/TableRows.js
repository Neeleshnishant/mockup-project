import React from "react";
function TableRows({ rowsData, deleteTableRows, handleChange }) {
    return (

        rowsData.map((data, index) => {
            const { groupName } = data;
            return (
                
                <tr key={index}>
                    <td>
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                    </td>
                    <td><button className="btn btn-success">Save</button>  <button className="btn btn-primary"  onClick={()=>(deleteTableRows(index))}>Cancel</button></td>
                </tr>
            )
        })

    )

}
function TableCheckList({ rowsData, deleteTableRows, handleChange }) {
    return (

        rowsData.map((data, index) => {
            const { groupName } = data;
            return (

                <tr key={index}>
                    <td>
                        <select className="form-select" aria-label="Default select example">
                            <option >Brakes </option>
                            <option defaultValue="1">Documents</option>
                            <option defaultValue="2">Equipment</option>
                            <option defaultValue="3">Mirrors</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                    </td>
                    <td><button className="btn btn-success">Save</button>  <button className="btn btn-primary" onClick={() => (deleteTableRows(index))}>Cancel</button></td>
                </tr>
            )
        })

    )

}
function InvDefinitions({ rowsData, deleteTableRows, handleChange }) {
    return (

        rowsData.map((data, index) => {
            const { groupName } = data;
            return (

                <tr key={index}>
                    <td>
                        <select className="form-select" aria-label="Default select example">
                            <option >Study </option>
                            <option defaultValue="1">Bedroom</option>
                            <option defaultValue="2">Cartons & Bags</option>
                            <option defaultValue="3">Dining</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                    </td>
                    <td>
                        <select className="form-select" aria-label="Default select example">
                            <option >No </option>
                            <option defaultValue="1">Yes</option>
                           
                        </select>
                    </td>
                    <td><button className="btn btn-success">Save</button>  <button className="btn btn-primary" onClick={() => (deleteTableRows(index))}>Cancel</button></td>
                </tr>
            )
        })

    )

}
export default TableRows;
export {TableCheckList, InvDefinitions};