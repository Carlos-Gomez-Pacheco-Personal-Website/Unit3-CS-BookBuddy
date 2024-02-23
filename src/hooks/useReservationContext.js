import { createContext, useContext } from "react";

const ReservationContext = createContext([]);
const useReservationContext = () => useContext(ReservationContext);

export { ReservationContext, useReservationContext };
