import React from 'react'

const TableComponent = ({ data, header }) => {
    return (
        <div className="table-responsive m-4">
            <table className="table table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th key="#">#</th>
                        {header.map(element => (
                            <th key={element.key}>{element.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{element.firstColumn}</td>
                                <td>{element.secondColumn}</td>
                                <td>{element.thirdColumn}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent
