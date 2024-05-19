import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const StudentForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchPlacementRegistered = watch("placementRegistered", false);
  const watchReceivedOffer = watch("receivedOffer", false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/api/students/submit", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 justify-center items-center  w-screen">
      <h3 className="text-lg font-bold text-primary tracking-wide leading-relaxed">
        Student Details
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4  p-4 text-sm xs:w-full w-[80%]"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            className="p-2 input input-sm input-primary rounded"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Name of Student</label>
          <input
            className="p-2 input input-sm input-primary rounded"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Student ID</label>
          <input
            className="p-2 input input-sm input-primary rounded"
            {...register("studentId", { required: true })}
          />
          {errors.studentId && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Stream</label>
          <input
            className="p-2 input input-sm input-primary rounded"
            {...register("stream", { required: true })}
          />
          {errors.stream && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Photo URL</label>
          <input
            className="p-2 input input-sm input-primary rounded"
            {...register("photo", { required: true })}
          />
          {errors.photo && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">
            Have you registered yourself in the campus placement portal?
          </label>
          <input type="checkbox" {...register("placementRegistered")} />
        </div>

        {watchPlacementRegistered && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Placement ID</label>
            <input
              className="p-2 input input-sm input-primary rounded"
              {...register("placementId", {
                required: watchPlacementRegistered,
              })}
            />
            {errors.placementId && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="font-semibold">
            Have you attended any interviews?
          </label>
          <input type="checkbox" {...register("attendedInterviews")} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Choose your area of interest</label>
          <select
            className="p-2 text-sm input  input-primary rounded"
            {...register("interestArea", { required: true })}
          >
            <option value="Data analytics">Data analytics</option>
            <option value="Data Annotation">Data Annotation</option>
            <option value="User Experience">User Experience</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Research">Research</option>
          </select>
          {errors.interestArea && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">
            Have you received any job offers?
          </label>
          <input type="checkbox" {...register("receivedOffer")} />
        </div>

        {watchReceivedOffer && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Offer Document</label>
            <input
              type="file"
              className="p-2 text-sm input input-primary rounded"
              {...register("offerDocument", { required: watchReceivedOffer })}
            />
            {errors.offerDocument && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        )}

        <div className="flex gap-4 flex justify-end">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
          <button
            type="button"
            className="p-2 bg-gray-300 text-black rounded"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
