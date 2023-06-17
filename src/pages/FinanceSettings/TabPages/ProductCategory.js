import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Card, CardBody, Table, } from 'reactstrap';
import TableRows from './Tables/TableRows';

export const FinanceSettingsProductCategory = () => {
  //rowsdata
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {

    const rowsInput = {
      fullName: '',
      emailAddress: '',
      salary: ''
    }
    setRowsData([...rowsData, rowsInput])

  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }
  const handleChange = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

  }

  return (
    <Card>
      <CardBody>
        <div className="table-responsive mt-4 mt-xl-0">

          <Table className="table table-bordered table-nowrap align-middle mb-3">
            <thead>
              <tr>
                <th scope="col">Category Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-medium">Charges</td>
                <td>
                  <div className="hstack gap-3 flex-wrap">
                    <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                    <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="fw-medium">Extras</td>

                <td>
                  <div className="hstack gap-3 flex-wrap">
                    <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                    <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                  </div>
                </td>
              </tr>


              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

            </tbody>
          </Table>
          <button className="btn btn-primary" onClick={addTableRows} >+</button>
        </div>
      </CardBody>

    </Card>
  )
}
