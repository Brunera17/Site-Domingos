import { useState } from "react";
import { PlanContext } from "./planContextInstance";

export function PlanProvider({ children }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
            {children}
        </PlanContext.Provider>
    );
}
