import { useState } from "react";
import { USERS } from "../../data";
import { useEffect } from "react";

export const HrDashboard = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const updateUser = () => {
    setCurrentIdx((cidx) => (cidx === USERS.length - 1 ? 0 : cidx + 1));
  };

  useEffect(() => {
    const interval = setInterval(updateUser, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-2xl font-bold text-white">
      Hr Dashbord
      <h2 className="bg-red-500 text-white font-semibold px-4 py-2">{USERS[currentIdx]?.name}</h2>
    </div>
  );
};
