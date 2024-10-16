import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const currencySymbol = "$";
const AppContextProvider = (props) => {
  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
