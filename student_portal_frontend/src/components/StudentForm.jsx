import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { API_URL } from "../services/authService";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const [studentDetails, setStudentDetails] = useState({
    email: "",
    userName: "",
    Id: "",
    stream: "",
    url: "",
  });

  const watchPlacementRegistered = watch("placementRegistered", false);
  const watchReceivedOffer = watch("receivedOffer", false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "offerDocument") {
        if (data[key] && data[key].length > 0) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post(API_URL + "/students/submit", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const fetchStudentDetails = async () => {
    if (!user?.email) return;
    try {
      const response = await axios.get(`${API_URL}/getData/${user.email}`);
      setStudentDetails(response.data);
      reset(response.data); // Populate the form with fetched data
    } catch (error) {
      console.log("submit error", error);
    }
  };

  const refreshForm = () => {
    reset({
      email: studentDetails.email,
      userName: studentDetails.userName,
      Id: studentDetails.Id,
      stream: studentDetails.stream,
      url: studentDetails.url,
      placementRegistered: false,
      placementId: "",
      attendedInterviews: false,
      interestArea: [],
      receivedOffer: false,
      offerDocument: null,
    });
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [user]);

  return (
    <div className="flex flex-col gap-2 mt-4 justify-center items-center w-screen">
      <h3 className="text-lg font-bold text-primary tracking-wide leading-relaxed">
        Student Details
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 text-sm xs:w-full w-[80%]">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input className="p-2 input input-sm input-primary rounded" {...register("email", { required: true })} readOnly />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Name of Student</label>
          <input className="p-2 input input-sm input-primary rounded" {...register("userName", { required: true })} readOnly />
          {errors.userName && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Student ID</label>
          <input className="p-2 input input-sm input-primary rounded" {...register("Id", { required: true })} readOnly />
          {errors.Id && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Stream</label>
          <input className="p-2 input input-sm input-primary rounded" {...register("stream", { required: true })} />
          {errors.stream && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Photo URL</label>
          <input className="p-2 input input-sm input-primary rounded" {...register("url", { required: true })} />
          {errors.url && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">Have you registered yourself in the campus placement portal?</label>
          <input type="checkbox" {...register("placementRegistered")} />
        </div>

        {watchPlacementRegistered && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Placement ID</label>
            <input className="p-2 input input-sm input-primary rounded" {...register("placementId", { required: watchPlacementRegistered })} />
            {errors.placementId && <span className="text-red-500">This field is required</span>}
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="font-semibold">Have you attended any interviews?</label>
          <input type="checkbox" {...register("attendedInterviews")} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Choose your area of interest</label>
          <div className="flex flex-col">
            <label>
              <input type="checkbox" value="Data analytics" {...register("interestArea", { required: true })} />
              Data analytics
            </label>
            <label>
              <input type="checkbox" value="Data Annotation" {...register("interestArea", { required: true })} />
              Data Annotation
            </label>
            <label>
              <input type="checkbox" value="User Experience" {...register("interestArea", { required: true })} />
              User Experience
            </label>
            <label>
              <input type="checkbox" value="Cybersecurity" {...register("interestArea", { required: true })} />
              Cybersecurity
            </label>
            <label>
              <input type="checkbox" value="Research" {...register("interestArea", { required: true })} />
              Research
            </label>
          </div>
          {errors.interestArea && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">Have you received any job offers?</label>
          <input type="checkbox" {...register("receivedOffer")} />
        </div>

        {watchReceivedOffer && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Offer Document</label>
            <input type="file" className="p-2 text-sm input input-primary rounded" {...register("offerDocument", { required: watchReceivedOffer })} />
            {errors.offerDocument && <span className="text-red-500">This field is required</span>}
          </div>
        )}

        <div className="flex gap-4 flex justify-end">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
          <button type="button" className="p-2 bg-gray-300 text-black rounded" onClick={refreshForm}>Refresh</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
