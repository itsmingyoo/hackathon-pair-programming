import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the navigation state
interface NavigationState {
    currentPath: string;
}

// Define the context type including the state and the setter function
interface NavigationContextType {
    navigationState: NavigationState;
    setNavigationState: React.Dispatch<React.SetStateAction<NavigationState>>;
}

// Define the props for the NavigationProvider component
interface NavigationProviderProps {
    children: ReactNode;
}

// Create a default value for the context
const defaultNavigationContext: NavigationContextType = {
    navigationState: { currentPath: '/' },
    setNavigationState: () => {}, // noop function
};

// Create the context with the default value
const NavigationContext = createContext<NavigationContextType>(defaultNavigationContext);

// Define the NavigationProvider component
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [navigationState, setNavigationState] = useState<NavigationState>({ currentPath: '/' });

    return (
        <NavigationContext.Provider value={{ navigationState, setNavigationState }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Custom hook to use the navigation context
export const useNavigation = () => useContext(NavigationContext);
