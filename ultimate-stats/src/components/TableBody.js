const TableBody = ({ columns, tableData, deletePlayer }) => {
  if (typeof tableData[0] === 'string') {

    return (
      <tbody>
        {tableData.map((data, index) => (
          <tr key={index}>
            <td>
              {data}
            </td>
            <td>
              <button onClick={()=>(deletePlayer(index))}>x</button>
            </td>
          </tr>
        ))}
      </tbody>
    )
  } else {

    return (
     <tbody>
      {tableData.map((data, index) => {
       return (
        <tr key={index}>
         {columns.map(({ accessor }) => {
          let tData;
          if (accessor === 'player_name' ) {
            tData = data[accessor] ? data[accessor] : "——";
          }
          else if (accessor === 'totals') {
            tData = parseFloat(data['pts']) + parseFloat(data['ast']) + parseFloat(data['reb']) ? 
                    parseFloat(data['pts']) + parseFloat(data['ast']) + parseFloat(data['reb']) : "——";
          } else {     
            tData = data[accessor] ? data[accessor] : "——";
          }
          if (typeof tData === 'number') {
            tData = tData.toFixed(2);
          }
          
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
 };
}
 

export default TableBody;