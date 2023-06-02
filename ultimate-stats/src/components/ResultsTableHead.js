import React, { useState } from "react";

const ResultsTableHead = ({ columns, tableData, handleSorting, smallHeaders }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    console.log(columns)
    if (typeof columns[0] === 'string') {
        return (
            <tbody>
              {columns.map((col, index) => {
                <tr key={index} >
                   <td>
                    {col}
                   </td>
                   <td>
                    {tableData[index]}
                   </td>
                </tr>
              })}
            </tbody>
        );
    }
}
export default ResultsTableHead;