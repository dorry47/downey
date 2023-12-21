// Import the necessary hooks from React
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// Define your initial state
const initialState: StateType = {
  session: null,
  user: null,
  showMobileMenu: false,
};

// Define the types
type StateType = {
  session: any;
  user: any;
  showMobileMenu: boolean;
};

type StateContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

type StateProviderProps = {
  children: ReactNode;
};

// Create the context
const StateContext = createContext<StateContextType | undefined>(undefined);

// Create the StateProvider component
const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  // Use the local storage key for your state
  const localStorageKey = 'myAppState';

  // Check if localStorage is available
  const isLocalStorageAvailable = typeof localStorage !== 'undefined';

  // Retrieve the state from local storage on component mount (or use initialState)
  const storedState = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem(localStorageKey) || 'null') ||
      initialState
    : initialState;

  // Use state with the initial value from local storage
  const [state, setState] = useState<StateType>(storedState);

  // Save the state to local storage whenever it changes (if localStorage is available)
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    }
  }, [state, isLocalStorageAvailable]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

// Create a custom hook to easily access the state
const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

// Export the StateProvider and useStateContext
export { StateProvider, useStateContext };
