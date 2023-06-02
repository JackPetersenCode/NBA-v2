import React, { useEffect, useState } from "react";
import '../App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Xbutton = styled.button`
border: none;
padding: 5px;
color: white;
background-color: black;
border-radius: 5px;
opacity: .5
` 

const StyledSpan = styled.span`
  font-size: medium;
`
const Dnd = ({ dragRoster, setDragRoster, roster, setRoster, deletePlayer }) => {
    /*
    useState([
        { id: "1", player: roster[0], position: 1 },
        { id: "2", player: roster[1], position: 2 },
        { id: "3", player: roster[2], position: 3 },
        { id: "4", player: roster[3], position: 4 },
        { id: "5", player: roster[4], position: 5 },
        { id: "6", player: roster[5], position: 6 },
        { id: "7", player: roster[6], position: 7 },
        { id: "8", player: roster[7], position: 8 },
        { id: "9", player: roster[8], position: 9 },
        { id: "10", player: roster[9], position: 10 }
    ])
    */

    useEffect(() => {
        const setDragDropRoster = async() => {

            let dndRoster = roster.map((player, index) => (
                {id: index.toString(), 
                  player: player.substring(player.indexOf('|') + 1), 
                  salary: player.substring(0,1),
                  rosterPlayer: player, 
                  position: index}
            ))
            setDragRoster(dndRoster)
        }
        if (roster) {
            setDragDropRoster();
        }
    }, [roster])


    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    }

    const getListStyle = (isDraggingOver) => ({
      background: isDraggingOver ? 'lightblue' : 'white',
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '100%',
    })

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
      const reorderedItems = reorder(dragRoster, result.source.index, result.destination.index)
      console.log(reorderedItems)
      setDragRoster(reorderedItems)
    
    }
    

/*
    const onDragEnd = (result) => {
      const { destination, source } = result;
      // console.log("RESULT", result);
      if (!destination) {
        return;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      const directionOfDrag =
        destination.index > source.index ? "GREATER" : "LESS";
      let affectedRange = [];
      if (directionOfDrag === "GREATER") {
        affectedRange = range(source.index, destination.index + 1);
      } else if (directionOfDrag === "LESS") {
        affectedRange = range(destination.index, source.index);
      }
      // console.log("AFFECTED RANGE", affectedRange);
      const reOrderedRoster = roster.map((player) => {
        if (player.id === parseInt(result.draggableId)) {
          player.position = result.destination.index;
          // console.log("CONDITION 1", song);
          return player;
        } else if (affectedRange.includes(player.position)) {
          if (directionOfDrag === "GREATER") {
            player.position = player.position - 1;
            // console.log("CONDITION 2.1", song);
            return player;
          } else if (directionOfDrag === "LESS") {
            player.position = player.position + 1;
            // console.log("CONDITION 2.2", song);
            return player;
          }
        } else {
          // console.log("CONDITION 3", song);
          return player;
        }
      });
      setDragRoster(reOrderedRoster);
    };
*/
    const getStarterStyle = (isDragging, draggableStyle) => ({
      userSelect: 'none',
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '100%',
      marginBottom: '10px',
      borderRadius: '5px',
      background: isDragging ? 'lightgreen' : 'rgb(204, 255, 200)',
      outline: 'outset',
      outlineWidth: '4px',
      outlineColor: 'lightgreen',
      display: 'flex',
      justifyContent: 'space-between',
      
      ...draggableStyle
    })

    const getBenchStyle = (isDragging, draggableStyle) => ({
      userSelect: 'none',
      padding: 10,
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '10px',
      borderRadius: '5px',
      background: isDragging ? 'lightblue' : 'rgb(238,238,238)',
      outline: 'outset',
      outlineWidth: '4px',
      outlineColor: 'rgb(210,210,210)',      
      display: 'flex',
      justifyContent: 'space-between',
      
      ...draggableStyle
    })

    return (

      <>
        <div className="roster-label">Drag and drop players to change starting lineup (green)</div>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" >
            {(provided, snapshot) => (
              <div {...provided.droppableProps}  ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {dragRoster.map((player, index) => (

                      <Draggable key={player.id} draggableId={player.id} index={index}>
                        {(provided, snapshot) => (
                        <div key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={index < 5 ? getStarterStyle(snapshot.isDragging, provided.draggableProps.style) : getBenchStyle(snapshot.isDragging, provided.draggableProps.style)}>
                          <StyledSpan>
                            {`$${player.salary} - ${player.player} `}&nbsp;
                          </StyledSpan>
                          <span className="deletePlayer">
                            <Xbutton onClick={()=>(deletePlayer(player))}>x</Xbutton>
                          </span>
                        </div>
                         )}
                      </Draggable> 
                    ))}
                {provided.placeholder}
              </div>)}
          </Droppable>
        </DragDropContext>
      </>
    )
}
    /*
    return (
        <DragDropContext onDragEnd={(...props)=>{console.log(props)}}>
            <Droppable droppableId="droppable-1">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {dragRoster.map((player, index) => (
                            <Draggable key={player.id} draggableId={'draggable-' + player.id} index={index} >
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                            {player.player}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
*/
export default Dnd;