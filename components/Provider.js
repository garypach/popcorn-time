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

  return(
    <StateContext.Provider
    value={{
      user,
      createUserAction,
    }}>
      {children}
    </StateContext.Provider>
  )
}