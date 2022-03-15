import React, { createContext, useContext, useState} from 'react';
import ls from 'local-storage';

export const StateContext = createContext();

export function useStateContext(){
  return useContext(StateContext)
}

export function Provider({children}){
  const [user, setUser] = useState('')
  const createUserAction = (e) => {
    setUser(e.target.value);
  }

  const[searchOpen,setSearchOpenAction] = useState(false)
  const [myList, setMyList] = useState(ls.get('myList'))

  console.log(myList);
  const addToList = (video) =>{
    let List;
    if(ls('myList') !== null && myList.includes(video) === false){
        List = ls.get('myList')
        List.push(video)
        ls.set('myList', List)
        setMyList(List)
    }
    else{
      ls.set('myList',[video])
      List = ls.get('myList')
      setMyList(List)
    }
    console.log(myList)
  }

  const removeFromList = (id) =>{
    let List = ls('myList')
    List = List.filter((item)=> item.id != id)
    console.log(List)
    ls.set('myList',List)
    setMyList(List)
  }

  return(
    <StateContext.Provider
    value={{
      user,
      createUserAction,
      searchOpen,
      setSearchOpenAction,
      myList,
      setMyList,
      addToList,
      removeFromList
    }}>
      {children}
    </StateContext.Provider>
  )
}