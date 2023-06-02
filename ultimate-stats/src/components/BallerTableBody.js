const BallerTableBody = ({ columns, tableData }) => {
    return (
        <tbody>
         {tableData.map((data, index) => {
          return (
           <tr key={index}>
            {columns.map(({ accessor }) => {
                let tData;
                tData = data[accessor] ? data[accessor] : "——";
                return <td style={{minWidth: 'fit-content'}} key={accessor}>{tData}</td>;
            })}
           </tr>
          );
         })}
        </tbody>
    );
};
export default BallerTableBody;