import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const StudentForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const watchPlacementRegistered = watch("placementRegistered", false);
    const watchReceivedOffer = watch("receivedOffer", false);
  
    const onSubmit = async (data) => {
      try {
        const response = await axios.post('/api/students/submit', data);
        console.log(response.data);
      } catch (error) {
        console.error('Error submitting form', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Name of Student</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>Student ID</label>
          <input {...register("studentId", { required: true })} />
          {errors.studentId && <span>This field is required</span>}
        </div>
        <div>
          <label>Stream</label>
          <input {...register("stream", { required: true })} />
          {errors.stream && <span>This field is required</span>}
        </div>
        <div>
          <label>Photo URL</label>
          <input {...register("photo", { required: true })} />
          {errors.photo && <span>This field is required</span>}
        </div>
        <div>
          <label>Have you registered yourself in the campus placement portal?</label>
          <input type="checkbox" {...register("placementRegistered")} />
        </div>
        {watchPlacementRegistered && (
          <div>
            <label>Placement ID</label>
            <input {...register("placementId", { required: watchPlacementRegistered })} />
            {errors.placementId && <span>This field is required</span>}
          </div>
        )}
        <div>
          <label>Have you attended any interviews?</label>
          <input type="checkbox" {...register("attendedInterviews")} />
        </div>
        <div>
          <label>Choose your area of interest</label>
          <select {...register("interestArea", { required: true })}>
            <option value="Data analytics">Data analytics</option>
            <option value="Data Annotation">Data Annotation</option>
            <option value="User Experience">User Experience</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Research">Research</option>
          </select>
          {errors.interestArea && <span>This field is required</span>}
        </div>
        <div>
          <label>Have you received any job offers?</label>
          <input type="checkbox" {...register("receivedOffer")} />
        </div>
        {watchReceivedOffer && (
          <div>
            <label>Upload Offer Document</label>
            <input type="file" {...register("offerDocument", { required: watchReceivedOffer })} />
            {errors.offerDocument && <span>This field is required</span>}
          </div>
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => window.location.reload()}>Refresh</button>
      </form>
    );
  };
  
  export default StudentForm;