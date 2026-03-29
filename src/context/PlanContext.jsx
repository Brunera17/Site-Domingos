import { createContext, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
            {children}
        </PlanContext.Provider>
    );
}

export { PlanContext };