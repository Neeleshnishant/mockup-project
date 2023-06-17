import React from 'react';
import {Table } from 'reactstrap';
import "./InvoiceWidget.css"

function AppsEcommerce() {

  return (
    <div className='page-content'>
      <h1>Invoices!</h1>
      <div className='majorContainer'>
      <div className='d-flex align-items-center mt-5 p-3 container1 amount-container hoverDiv'>
        <div className='boxContainer'>
        <div className='d-flex align-items-center'>
            <i className='bx bx-dollar'></i>
            <p>217.8</p>
        </div>
        <p>TOTAL AMOUNT</p>
        </div>
        <i className='bx bx-money currency'/>
      </div>
      <div className='d-flex align-items-center mt-5 p-3 container1 paid-container hoverDiv'>
        <div className='boxContainer'>
        <div className='d-flex align-items-center '>
            <i className='bx bx-dollar'></i>
            <p>0</p>
        </div>
        <p>TOTAL PAID</p>
        </div>
        <i className='bx bx-money currency'/>
      </div>
      <div className='d-flex align-items-center mt-5 p-3 container1 due-container hoverDiv'>
        <div className='boxContainer'>
        <div className='d-flex align-items-center '>
            <i className='bx bx-dollar'></i>
            <p>217.8</p>
        </div>
        <p>TOTAL DUE</p>
        </div>
        <i className='bx bx-money currency'/>
      </div>
      </div>
      <div className='d-flex justify-content-end'>
      <button className='btnJobs'>
          Job #111
        </button>
        </div>
      <div className='unpaid'>
      <p className='txtUnpaid'>UNPAID</p>
      </div>
      <div className='d-flex align-items-center justify-content-between'>
        <h2>Invoice</h2>
        <span className='span111'>111</span>
      </div>
      <hr/>
      <p className='ml-3'>-</p>
      <div className='d-flex flex-column align-items-start mt-3'>
      <button><i className='ri-clipboard-fill'></i>Generate Invoice PDF</button>
      <button className='mt-1'><i className='ri-file-edit-line'></i>Download</button>
      </div>
      <Table  className='mt-5 table-bordered'>
            <thead className='bg-soft-purple'>
                <tr>
                  <th>Item Name & Description</th>
                  <th>Tax</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total Inc Tax</th>
                  <th>  </th>
                </tr>
              </thead>
            <tbody>
              <tr>
              <td><p>20 m3 truck with 2 men</p><p>+ extra half hour at $49</p></td>
              <td>GST</td>
              <td>$99.00</td>
              <td>2.00</td>
              <td className='d-flex justify-content-center align-items-center'>$217.80 <div style={{ marginLeft: '20px' }}><button className='ri-menu-line'></button> </div></td>
              </tr>
            </tbody>
          </Table>
    </div>
    
  );
}

export default AppsEcommerce;