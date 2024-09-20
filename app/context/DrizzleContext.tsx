import { createContext, useContext } from "react";
import db from "../db";

export const DrizzleContext=createContext(null)

export default function DrizzleProvider({children}){
    
    return(
        <DrizzleContext.Provider value={{db}}>
            {children}
        </DrizzleContext.Provider>
    )
}

export function useDrizzle(){
    const context=useContext(DrizzleContext)
    if(!context){
        new Error("No context found")
    }

    return context
}