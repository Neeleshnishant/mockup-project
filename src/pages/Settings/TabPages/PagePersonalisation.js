import { Card, CardBody,Table } from "reactstrap";
import React from "react";

export const PagePersonalisation = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <Table className="table table-bordered table-nowrap align-middle mb-3">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#d3d3d3' }} >
                  Page Name
                </th>
                <th style={{ backgroundColor: '#d3d3d3' }}>Description</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="">Opportunities List Page</a>
                </td>
                <td>CRM | Opportunities</td>
              </tr>
              <tr>
                <td>
                  <a href="">Jobs List Page</a>
                </td>
                <td>Removals | Jobs - List Jobs</td>
              </tr>
            </tbody>

          </Table>
        </CardBody>

      </Card>
    </div>
  )
}
