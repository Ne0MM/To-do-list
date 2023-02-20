import React from 'react'
import { useState, useEffect } from 'react'
import './MainBodyStyles.css'
import trashcan from './Assets/trash-can.svg'
import penIcon from './Assets/pen-icon.svg'

const boxInfoFromLocalStorage = JSON.parse(localStorage.getItem("boxInfo") || "[]" )
const boxCountFromLocalStorage = JSON.parse(localStorage.getItem("boxCount") || "0")

function MainBody() {

  const [boxName,setBoxName] = useState('')
  const [boxChangeName,setBoxChageName] = useState('')
  const [boxCount,setBoxCount] = useState(boxCountFromLocalStorage)
  const [boxInfo,setBoxInfo] = useState(boxInfoFromLocalStorage)

  useEffect(() => {
    localStorage.setItem('boxInfo', JSON.stringify(boxInfo));
    localStorage.setItem('boxCount', JSON.stringify(boxCount));
  }, [boxInfo, boxCount]);


  const boxNameHandler = (event) => {
    setBoxName(event.target.value)
  }

  const boxChangeNameHandler = (event) => {
    setBoxChageName(event.target.value)
  }

  const addBoxButtonHandler = () => {
    setBoxInfo(current => [
      ...current, {
        id : boxName + boxCount,
        name : boxName,
        popMenu : false,
        checkedItem : false
      }
    ])
    setBoxCount(boxCount + 1)
    setBoxName("")
  }

  const popMenuRender = (index) => {

    return(
      <div className={`${boxInfo[index].popMenu ? "showing" : ""} editPop`} id='popMenu'>

      <button className='editPopButton' onClick={() => editButtonHandler(boxInfo[index].id)}>
        <img src={penIcon} alt='pen-icon' className='penIconImg'></img>
        <p>Change</p>
      </button>

      <input 
        type="text" 
        value={boxChangeName} 
        placeholder="Write the task's new title" 
        onChange={boxChangeNameHandler}
      />
      
      </div>
    )


  }

  const popMenuHandler = (boxId) => {
    const updatedBoxInfo = boxInfo.map((e) => {
      if(e.id === boxId){
        if(e.popMenu === true){
          return{...e, popMenu : false}
        }else{
          return{...e, popMenu : true}
        }
      }else{
        return{...e, popMenu : false}
      }
    })

    setBoxChageName("")
    setBoxInfo(updatedBoxInfo)
  }

  const editButtonHandler = (boxId) => {
    const updatedBoxInfo = boxInfo.map((e) => {
      if(e.id === boxId){
        return{...e , name : boxChangeName, popMenu : false}
      }
      
      return e
    })
    setBoxChageName("")
    setBoxInfo(updatedBoxInfo)
  }

  const deleteBoxHandler = (boxId) => {
    setBoxInfo(current =>
      current.filter(employee => {
        return employee.id !== boxId;
      }),
    );
  }

  const checkHandle = (boxId) => {
    const updatedCheckInfo = boxInfo.map((e) => {
      if(e.id === boxId){
        if(e.checkedItem === true){
          return{...e , checkedItem : false}
        }else{
          return{...e , checkedItem : true}
        }
      }
      
      return e
    })
    setBoxInfo(updatedCheckInfo)
  }

  return (
    <div className='mainBodyContainer'>
        {/* add New Items */}

        <div className='mainBodyHeader'>
          
          <input 
            type="text" 
            value={boxName} 
            id="newBoxNameInput" 
            placeholder="Write the task's title" 
            onChange={boxNameHandler}
          />

          <div className='addBoxButtonContainer' onClick={() => addBoxButtonHandler()}>

            <p>Add a new task</p>

            <div className='addBoxButton'>
              <span className='line topLine'></span>
              <span className='line bottomLine'></span>
            </div>
            
          </div>

        </div>

        {/* tasks container */}

        <div className='taskContainer'>
          {boxInfo.map((element,index) => {
            return(
              <div className='taskItemContainerContainer' key={boxInfo[index].id}>
                <label className="taskItemContainer">

                  <input 
                    type='checkbox' 
                    className='taskCheckInput' 
                    checked={boxInfo[index].checkedItem ? true : false} 
                    onChange={() => checkHandle(boxInfo[index].id)}>
                  </input>
                  <div className='taskItem checkmark'>
      
                    <div className='checkSign'>
                      <div className='taskCheckMark'>
                        <span className='taskCheckLine topTaskCheckLine'></span>
                        <span className='taskCheckLine bottomTaskCheckLine'></span>
                      </div>
                    </div>
      
                    <div className='taskTitle'>
                      <h4>{boxInfo[index].name}</h4>
                    </div>

                    <button className='taskTrashImgContainer' onClick={() => popMenuHandler(boxInfo[index].id)}>
                      <img src={penIcon} alt='pen-icon' className='penIconImg'></img>
                    </button>

                    <button className='taskTrashImgContainer' onClick={() => deleteBoxHandler(boxInfo[index].id)}>
                      <img src={trashcan} alt='trash-can' className='trashCanImg'></img>
                    </button>
      
                  </div>
                </label>
                {popMenuRender(index)}
              </div>
            )
          })}

        </div>

    </div>
  )
}

export default MainBody