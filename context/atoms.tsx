import { atom } from 'jotai';

type State = {
  session: null | string;
  user: { email: string } | null;
  showMobileMenu: boolean;
  loggedInUser: string | null;
  refresh_token: string | null;
  access_token: string | null;
};

// Helper function for atoms with local storage support
const atomWithLocalStorage = (key: string, initialValue: any) => {
  const getInitialValue = () => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      if (item !== null) {
        try {
          return JSON.parse(item);
        } catch {
          console.error('Could not parse the stored value in localStorage.');
        }
      }
    }
    return initialValue;
  };

  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: ((prevState: State) => State) | State) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
};

// Define your initial state
const initialState: State = {
  session: null,
  user: null,
  showMobileMenu: false,
  loggedInUser: null,
  refresh_token: null,
  access_token: null,
};

// Create an atom for the global state with local storage persistence
export const globalStateAtom = atomWithLocalStorage(
  'globalState',
  initialState
);
