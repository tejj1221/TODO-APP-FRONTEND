
import { useState } from "react";
import React, { Fragment }  from 'react';



// to get the data from local storage

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const[isEditItem, setIsEditItem] = useState(null)
    
    //add items
    const addItem = () => {
        if(!inputData){}
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((element) => {
                    if(element.id === isEditItem){
                        return{...element, name:inputData}
                    }
                    return element
                })
            )
            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        }
        else{
            const allListsItems = { id: new Date().getTime().toString(), name: inputData}
            setItems([... items, allListsItems]);
            setInputData('')
        }
    }

    //delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((element) => {
            return index != element.id
        } );

        setItems(updatedItems)
    }

    //edit item
    /* 
        1. get the id and name of the data which user clicked to edit
        2. set the togglle mode to change the add button into edit button
        3. now update the value of the setInput with the new updated value to edit
        4. to pass the current element id to new state variable for reference
    */
    const editItem = (id) => {
        let newEditItem = items.find((element) => {
            return element.id === id
        });
        //console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);
    }

    // remove all
    const removeAll = () => {
        setItems([]);
    }

    return(
        
            <div className='Todo-List'>
                <h1>TODO-LIST</h1>
            
               <div className='add-item'>
                  
                    <input id="task" type="text" placeholder="write your todos here..."
                     value={inputData}
                     onChange={(e) => setInputData(e.target.value) }
                    />
                    {
                        toggleSubmit ? <button id="btn" onClick={addItem} >Add</button> :
                        <button id="btn" onClick={addItem}>edit</button>
                    }
                    
                </div>
                <div className='items-list'>

                    {
                        items.map((element) => {
                            return(
                                <div className='each-item' key={element.id}>
                                        
                                    <li>{element.name}</li>
                                    <button className="delete" onClick={ () => deleteItem(element.id)} >del</button>  
                                    <button className="edit" onClick={ () => editItem(element.id) } >edit</button>
                                </div>
                            )
                        })
                    }
                </div>

                <div>
                    <button className='remove' onClick={removeAll} >Remove All</button>
                </div>

            </div>
    )
}

export default Todo