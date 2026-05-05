import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectedwrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(captainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setCaptain(res.data.captain);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedwrapper;