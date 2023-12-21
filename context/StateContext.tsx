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

  // Retrieve the state from local storage on component mount
  const storedState =
    JSON.parse(localStorage.getItem(localStorageKey) || 'null') || initialState;

  // Use state with the initial value from local storage
  const [state, setState] = useState<StateType>(storedState);

  // Save the state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

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
