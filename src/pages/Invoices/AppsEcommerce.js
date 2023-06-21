import React, { useState } from 'react'; 
import {
  Table, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu, DropdownItem, Card,CardBody
} from 'reactstrap';
import "./AppEcommerce.css"

function AppsEcommerce() {

  const [rowsData, setRowsData] = useState([]);
  const [rowsData1, setRowsData1] = useState([]);
  const [rowsData2, setRowsData2] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      groupName: '',
    }
    setRowsData([...rowsData, rowsInput])
  }

  const addTableRows1 = () => {
    const rowsInput = {
      groupName: '',
    }
    setRowsData1([...rowsData1, rowsInput])
  }

  const addTableRows2 = () => {
    const rowsInput = {
      groupName: '',
    }
    setRowsData2([...rowsData2, rowsInput])
  }

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    console.log(rows)
    rows.splice(index, 1);
    setRowsData(rows);
  }
  const deleteTableRows1 = (index) => {
    const rows = [...rowsData1];
    console.log(rows)
    rows.splice(index, 1);
    setRowsData1(rows);
  }

  const deleteTableRows2 = (index) => {
    const rows = [...rowsData2];
    console.log(rows)
    rows.splice(index, 1);
    setRowsData2(rows);
  }

  return (
    <div className='page-content'>
      
      <div className='d-flex align-items-center'><i className='ri-bill-line billIcon'></i><h1>Invoices</h1> </div>

      <div className='majorContainer'>
        <div className='d-flex align-items-center mt-5 container1 amount-container hoverDiv'>
          <div className='boxContainer'>
            <div className='d-flex align-items-center'>
              <i className='bx bx-dollar'></i>
              <p>217.8</p>
            </div>
            <p>TOTAL AMOUNT</p>
          </div>
          <i className='bx bx-money currency' />
        </div>
        <div className='d-flex align-items-center mt-5  container1 paid-container hoverDiv'>
          <div className='boxContainer'>
            <div className='d-flex align-items-center '>
              <i className='bx bx-dollar'></i>
              <p>0</p>
            </div>
            <p>TOTAL PAID</p>
          </div>
          <i className='bx bx-money currency' />
        </div>
        <div className='d-flex align-items-center mt-5 container1 due-container hoverDiv'>
          <div className='boxContainer'>
            <div className='d-flex align-items-center '>
              <i className='bx bx-dollar'></i>
              <p>217.8</p>
            </div>
            <p>TOTAL DUE</p>
          </div>
          <i className='bx bx-money currency' />
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btnJobs'>
          Job #111
        </button>
      </div>
      <div className='mt-3'>
        <Card className="ribbon-box border shadow-none mb-lg-0">
          <CardBody>
            <div className="ribbon ribbon-primary ribbon-shape">UNPAID</div>
            
          </CardBody>
        <div className='d-flex align-items-center justify-content-between mt-3 mb-3'>
        <h2 className='px-3'>Invoice</h2>
        <span className='span111 px-3'>111</span>
      </div>
      <div>
        <hr/>
        <p className='ml-3'>-</p>
      <div className='d-flex flex-column align-items-start mt-3 px-3 pb-3'>
        <button className='btn btn-primary'><i className='ri-clipboard-fill'></i>Generate Invoice PDF</button>
        <button className='btn btn-primary mt-1'><i className='ri-file-edit-line'></i>Download</button>
      </div>
      </div>
        </Card>
      </div>
      
      <div className='mt-5'>
        <Card className='col-lg-12'>
          <Table className='table-bordered'>
            <thead className='bg-soft-purple'>
              <tr>
                <th className='text-center'>Item Name & Description</th>
                <th className='text-center'>Tax</th>
                <th className='text-center'>Unit Price</th>
                <th className='text-center'>Qty</th>
                <th className='text-center'>Total Inc Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=''><p>20 m3 truck with 2 men</p><p>+ extra half hour at $49</p></td>
                <td >GST</td>
                <td>$99.00</td>
                <td>2.00</td>
                <td className='d-flex align-items-center tableDataCell'> <span>$217.80 </span>
                  <UncontrolledDropdown className='menuIcon'>
                    <DropdownToggle
                      className="btn btn-soft-info dropDownBtn btnDropDown fs-14"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ri-menu-fill"></i>
                    </DropdownToggle>
                    <DropdownMenu
                    >
                      <li>
                        <div className="d-flex mx-auto editDelete">
                          <i className="ri-edit-2-line"></i>
                          <DropdownItem>
                            <p className='edit'> Edit </p>
                          </DropdownItem>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex mx-auto editDelete">
                          <i className="ri-delete-bin-6-fill"></i>
                          <DropdownItem>
                            <p className='edit'> Delete </p>
                          </DropdownItem>
                        </div>
                      </li>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              </td>
              </tr>
            </tbody>
            <tbody>
              {rowsData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      // value={newGroupNames[index] || ''}
                      // onChange={(event) => handleNewChange(index, event)}
                      name="groupName"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input className='form-control' />
                  </td>
                  <td> <input className='form-control' /> </td>
                  <td> <input className='form-control' /> </td>
                  <td> <input className='form-control' />
                    <div className="hstack gap-2 mt-3">
                      <button className="btn btn-success" >
                        Save
                      </button>
                      <button className="btn btn-primary" onClick={() => deleteTableRows(index)}>
                        Cancel
                      </button>
                    </div> </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
      <button className='btn btn-brown mt-3' onClick={addTableRows}><i className='ri-add-line'></i></button>

      <div className='d-flex mt-4 align-items-center'>
        <p className=''>Charges</p>
        <div className='mx-3'>
          <button className='btn btn-success'>Recalculate</button>
        </div>
      </div>
      <Table className='mt-1 table-bordered col-lg-12'>
        <tbody>
          {rowsData1.map((data, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  // value={newGroupNames[index] || ''}
                  // onChange={(event) => handleNewChange(index, event)}
                  name="groupName"
                  className="form-control"
                />
              </td>
              <td>
                <input className='form-control' />
              </td>
              <td> <input className='form-control' /> </td>
              <td> <input className='form-control' /> </td>
              <td> <input className='form-control' /> </td>
              <td>
                <div className="hstack gap-2">
                  <button className="btn btn-success" >
                    Save
                  </button>
                  <button className="btn btn-primary" onClick={() => deleteTableRows1(index)}>
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='mt-1'>
        <div className=''>
          <button className='btn btn-brown mt-3' onClick={addTableRows1}><i className='ri-add-line' onClick={addTableRows1}></i></button>
        </div>
      <div className='page-content secondCard'>
        <div className='row '>
          <div className='col-lg-8'></div>
          <Card className='col-lg-4  mr-3 totalCard'>
            <Table className='balance'>
              <tbody>
                <tr>
                  <th><span>Total (excl tax)</span></th>
                  <td><span>$198.00</span></td>
                </tr>
                <tr>
                  <th><span>Discount</span></th>
                  <td><span>$0.00</span></td>
                </tr>
                <tr>
                  <th><span>Total (excl tax) after discount</span></th>
                  <td><span>$198.00</span></td>
                </tr>
                <tr>
                  <th><span>Tax</span></th>
                  <td><span>$19.80</span></td>
                </tr>
                <tr>
                  <th><span>Total (incl tax)</span></th>
                  <td><span>217.80</span></td>
                </tr>
              </tbody>
            </Table>
          </Card>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col md-12 mt-3'>
          <Table>
            <thead>
              <tr>
                <th>Payment method</th>
                <th>Reference / Notes</th>
                <th>Paid On</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rowsData2.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      // value={newGroupNames[index] || ''}
                      // onChange={(event) => handleNewChange(index, event)}
                      name="groupName"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input className='form-control' />
                  </td>
                  <td> <input className='form-control' /> </td>
                  <td> <input className='form-control' /> </td>
                  <td>
                    <div className="hstack gap-2">
                      <button className="btn btn-success" >
                        Save
                      </button>
                      <button className="btn btn-primary" onClick={() => deleteTableRows2(index)}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='mt-3'>
            <div className='addIcon'>
              <button className='btn btn-brown mt-3' onClick={addTableRows2}><i className='ri-add-line'></i></button>
            </div>
            <div className='row page-content thirdCard'>
              <div className='col-lg-9'> </div>
              <Card className='col-lg-3'>
                <Table>
                    <tbody className='paymentClass'>
                      <tr>
                        <th className='pb-3'>Payment</th>
                        <td className='pb-3 paymentValue'>$198.00</td>
                      </tr>
                      <tr>
                        <th className='pb-3 pt-3'>Balance</th>
                        <td className='pb-3 pt-3 paymentValue'>$0.00</td>
                      </tr>
                    </tbody>
                </Table>
                </Card>
            </div>
          </div>
        </div>
      </div> 
    </div>

  );
}

export default AppsEcommerce;