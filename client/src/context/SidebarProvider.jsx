import React, { createContext, useState } from 'react';

export const SidebarContext=createContext();

export const SidebarProvider = ({children}) => {
  const [show,setShow]=useState(false);
  return (
    <SidebarContext.Provider value={[show,setShow]}>
       {children}
    </SidebarContext.Provider>
  )
}
