import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableHead from "./TableHead";
import Price from "./Price";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const DndTableBody = ({ tableData, deletePlayer }) => {

    const getPlayerStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: 0,
        margin: '10px',
        background: isDragging ? 'lightgreen' : 'grey',
        ...draggableStyle
    })

    return (
      <tbody>
        {tableData.map((player, index) => (
          <Draggable key={player.id} draggableId={player.id} index={index}>
            {(provided, snapshot) => (
            <tr key={index}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getPlayerStyle(snapshot.isDragging, provided.draggableProps.style)}>
              <td>
                {player.player}
              </td>
              <td>
                <button onClick={()=>(deletePlayer(index))}>x</button>
              </td>
            </tr>
             )}
          </Draggable> 
        ))}
      </tbody>
    )
}

export default DndTableBody;