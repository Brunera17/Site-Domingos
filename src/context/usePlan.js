import { useContext } from "react";
import { PlanContext } from "./planContextInstance";

export function usePlan() {
    return useContext(PlanContext);
}
