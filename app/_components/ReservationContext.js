"use client";

import { createContext, useContext, useState } from "react";

// Create the context
const ReservationContext = createContext();

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationContextProvider"
    );
  }
  return context;
}

export function ReservationContextProvider({ children }) {
  const [range, setRange] = useState({ from: undefined, to: undefined }); // Define your initial state here
  function resetRange() {
    setRange({ from: undefined, to: undefined });
  }
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
