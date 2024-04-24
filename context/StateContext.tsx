'use client';
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
  loggedInUser: null,
  refresh_token: null,
  access_token: null,
};

// Define the types
type StateType = {
  session: any;
  user: any;
  showMobileMenu: boolean;
  loggedInUser: any;
  refresh_token: any;
  access_token: any;
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
  const isLocalStorageAvailable =
    typeof localStorage !== 'undefined' && typeof window !== 'undefined';

  // Use individual local storage keys for each piece of state
  const localStorageKeys = {
    session: 'session',
    user: 'user',
    showMobileMenu: 'showMobileMenu',
    noUser: 'noUser',
    imgUploadPopUp: 'imgUploadPopUp',
    aboutYou: 'aboutYou',
    isSubscribed: 'isSubscribed',
    loggedInUser: 'loggedInUser',
    stripe: 'stripe',
    activeNavButtons: 'activeNavButton',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
  };

  const [state, setState] = useState<StateType>(initialState);

  // Retrieve each piece of state from local storage on component mount (or use initialState)
  useEffect(() => {
    setState({
      session:
        JSON.parse(localStorage.getItem(localStorageKeys.session) || 'null') ||
        initialState.session,
      user:
        JSON.parse(localStorage.getItem(localStorageKeys.user) || 'null') ||
        initialState.user,
      showMobileMenu:
        JSON.parse(
          localStorage.getItem(localStorageKeys.showMobileMenu) || 'false'
        ) || initialState.showMobileMenu,
      loggedInUser:
        JSON.parse(
          localStorage.getItem(localStorageKeys.loggedInUser) || 'null'
        ) || initialState.loggedInUser,
      refresh_token:
        JSON.parse(
          localStorage.getItem(localStorageKeys.refresh_token) || 'null'
        ) || initialState.refresh_token,
      access_token:
        JSON.parse(
          localStorage.getItem(localStorageKeys.access_token) || 'null'
        ) || initialState.access_token,
    });
  }, []);

  // Use state with the initial value from local storage

  // Save each piece of state to local storage whenever it changes
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(
        localStorageKeys.session,
        JSON.stringify(state.session)
      );
      localStorage.setItem(localStorageKeys.user, JSON.stringify(state.user));
      localStorage.setItem(
        localStorageKeys.showMobileMenu,
        JSON.stringify(state.showMobileMenu)
      );

      localStorage.setItem(
        localStorageKeys.loggedInUser,
        JSON.stringify(state.loggedInUser)
      );
    }
  }, [state, localStorageKeys, isLocalStorageAvailable]);

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
