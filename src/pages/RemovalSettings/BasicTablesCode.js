import React from 'react'
import PrismCode from '../../Components/Common/Prism';

//Tables Colors code
const TablesColors = () => {
    const code = `<Row>

<Col xl={10}>
    <div className="table-responsive mt-4 mt-xl-0">
        <Table className="table-bordered table-nowrap align-middle mb-0">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="fw-medium">01</td>
                   
                    <td>
                        <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="fw-medium">02</td>
                    <td>
                        <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="fw-medium">03</td>
                    <td>
                        <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>
</Col>
</Row>
`


    return (
        <React.Fragment>
            <PrismCode
                code={code}
            />
        </React.Fragment>
    )
}

export default TablesColors;
