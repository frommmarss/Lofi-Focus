import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("FocusTrackerModule", (m) => {
  const focusTracker = m.contract("FocusTracker");

  return { focusTracker };
});
