import React, { useState } from "react";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { WhyChooseUs } from "./WhyChooseUs";
import { Stats } from "./Stats";

export const Home = () => {
  const [showModal, setShowModal] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const handleSelectRole = (role) => {
    setUserRole(role);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* <div className="min-h-screen">
        {showModal && (
          <UserModal
            onSelectRole={handleSelectRole}
          />
        )}
      </div> */}
      <Hero />
      <Services />
      <WhyChooseUs />
      <Stats />
    </div>
  );
};
