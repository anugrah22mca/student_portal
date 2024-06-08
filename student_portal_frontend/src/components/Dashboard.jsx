import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import { API_URL } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Chart, CategoryScale, LinearScale, ArcElement, BarElement, BarController, PieController, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, ArcElement, BarElement, BarController, PieController, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [registrationPercentage, setRegistrationPercentage] = useState(0);
  const [interestAreas, setInterestAreas] = useState({});
  const navigate = useNavigate();
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const stream = JSON.parse(localStorage.getItem("stream"));
        const response = await axios.get(`${API_URL}/students/${stream}`);
        console.log("---", response);
        setStudents(response.data);
        calculateRegistrationPercentage(response.data);
        calculateInterestAreas(response.data);
      } catch (error) {
        console.error("Error fetching student details", error);
      }
    };

    fetchStudentDetails();
  }, [user, navigate]);

  const calculateRegistrationPercentage = (students) => {
    const totalStudents = students.length;
    const registeredStudents = students.filter(
      (student) => student.placementRegistered
    ).length;
    const percentage = ((registeredStudents / totalStudents) * 100).toFixed(2);
    setRegistrationPercentage(percentage);
  };

  const calculateInterestAreas = (students) => {
    const areas = {};
    students.forEach(student => {
      if (student.interestArea) {
        if (areas[student.interestArea]) {
          areas[student.interestArea]++;
        } else {
          areas[student.interestArea] = 1;
        }
      }
    });
    setInterestAreas(areas);
  };

  const barData = {
    labels: ["Registered", "Not Registered"],
    datasets: [
      {
        label: "Placement Registration",
        data: [
          students.filter((student) => student.placementRegistered).length,
          students.filter((student) => !student.placementRegistered).length,
        ],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const pieData = {
    labels: ["Registered", "Not Registered"],
    datasets: [
      {
        data: [
          students.filter((student) => student.placementRegistered).length,
          students.filter((student) => !student.placementRegistered).length,
        ],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  useEffect(() => {
    const createBarChart = () => {
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      const barCtx = document.getElementById("bar-chart").getContext("2d");
      barChartRef.current = new Chart(barCtx, {
        type: 'bar',
        data: barData,
      });
    };

    const createPieChart = () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
      const pieCtx = document.getElementById("pie-chart").getContext("2d");
      pieChartRef.current = new Chart(pieCtx, {
        type: 'pie',
        data: pieData,
        options: {
          responsive: true,
          aspectRatio: 1,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    };

    createBarChart();
    createPieChart();

    return () => {
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
    };
  }, [students]);

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Student Details</h3>
          <ul>
            {students.map(student => (
              <li key={student.Id}>{student.userName}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Placement Registration</h3>
          <p>{registrationPercentage}% of students registered for placements</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Stream Registered</h3>
          <p>{JSON.parse(localStorage.getItem("stream"))}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Students per Interest Area</h3>
          <ul>
            {Object.entries(interestAreas).map(([area, count]) => (
              <li key={area}>{area}: {count}</li>
            ))}
          </ul>
        </div>
        <button
          className="btn bg-gray-300 text-black w-full"
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="mt-4">
          <h3 className="text-xl">Student Details</h3>
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Student ID</th>
                <th>Stream</th>
                <th>Registered</th>
                <th>Area of Interest</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.Id}>
                  <td>{student.email}</td>
                  <td>{student.userName}</td>
                  <td>{student.Id}</td>
                  <td>{student.stream}</td>
                  <td>{student.placementRegistered ? "Yes" : "No"}</td>
                  {student.interestArea.map((item)=>(
                    <td>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h3 className="text-xl">Registration Data</h3>
          <div className="flex justify-around mt-4">
            <canvas id="bar-chart" style={{ width: "100px", height: "100px" }}></canvas>
            <canvas id="pie-chart" style={{ width: "100px", height: "100px" }}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
