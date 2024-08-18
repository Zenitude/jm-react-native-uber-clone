import { Appearance } from "react-native";
import React, { createContext, useState } from "react";

export const Context = createContext<ContextType | null>(null);

export default function ContextProvider({children}: ContextProps) {
    const [ theme, setTheme ] = useState(Appearance.getColorScheme());
    return (
        <Context.Provider value={{ theme }}>
            {children}
        </Context.Provider>
    )
}