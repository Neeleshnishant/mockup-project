import React from "react";


function TableRows({ rowsData, deleteTableRows, handleChange }) {
    return (

        rowsData.map((data, index) => {
            
            const { groupName } = data;
            console.log(groupName)
            return (  
                <tr key={index} >
                    <td className="custom-td">
                        <input type="text" value={groupName} onChange={(evnt) => (handleChange(index, evnt))} name="groupName" className="form-control" />
                    </td>
                    <td>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>                   
                    <td className="d-flex"><button className="btn btn-success">Save</button> <button className="btn btn-primary saveBtn"  onClick={()=>(deleteTableRows(index))}>Cancel</button></td>
                </tr>
            )
        })

    )

}
export default TableRows;