const ResultsTableBody = ({ columns, tableData, deletePlayer }) => {

  return (
    <>
      {tableData.map((data, index) => (

        <div className="results-flex" key={index}>
          <div className="inner-results">
            {columns[index]}
          </div>
          <div>
            {data}
          </div>
        </div>
        
      ))}
    </>
  )
}

 

export default ResultsTableBody;