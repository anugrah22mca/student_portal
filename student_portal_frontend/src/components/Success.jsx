import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg mb-4">All the best for a wonderful career.</p>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/login")}
      >
        Home
      </button>
    </div>
  );
};

export default Success;
