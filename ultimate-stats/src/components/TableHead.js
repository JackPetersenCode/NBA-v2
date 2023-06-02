import React, { useState } from "react";

const TableHead = ({ columns, handleSorting, smallHeaders }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    if (typeof columns[0] === 'string') {
        return (
            <thead>
             <tr>
              {columns.map((col, index) => {
               return (
                <th key={index} >
                 {col}
                </th>
               );
              })}
             </tr>
            </thead>
        );
    } else {
        const handleSortingChange = (accessor) => {
            const sortOrder =
             accessor === sortField && order === "asc" ? "desc" : "asc";
            setSortField(accessor);
            setOrder(sortOrder);
            handleSorting(accessor, sortOrder);
        };
        if (smallHeaders) {
            return (
                <thead className="smallHeaders">
                 <tr>
                  {columns.map(({ label, accessor }) => {
                   return (
                    <th key={accessor} className="header-item" onClick={() => handleSortingChange(accessor)}>
                     {label}
                    </th>
                   );
                  })}
                 </tr>
                </thead>
            );
        } else {
            return (
                <thead className="regularHeaders">
                 <tr>
                  {columns.map(({ label, accessor }) => {
                   return (
                    <th key={accessor} className="header-item" onClick={() => handleSortingChange(accessor)}>
                     {label}
                    </th>
                   );
                  })}
                 </tr>
                </thead>
            );
        }
    }
};
      
export default TableHead;