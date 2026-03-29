import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
            {children}
        </PlanContext.Provider>
    );
}

// 👇 ADICIONA ISSO
export function usePlan() {
    return useContext(PlanContext);
}