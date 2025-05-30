import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utlis/axiosInstance';
import { API_PATHS } from '../../utlis/apiPath';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicToFocus, description } = formData;

    if (!role || !experience || !topicToFocus) {
      setError('Please fill all the required details.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Prepare topics array
      const topicsArray = topicToFocus.split(',').map((t) => t.trim());

      // Generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus: topicsArray,
          numberOfQuestions: 10,
        }
      );

      const generateQuestions = aiResponse.data.questions;

      // Create session
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        topicsToFocus: topicsArray,
        description,
        questions: generateQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Start a New Interview Journey</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange('role', target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Designer"
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange('experience', target.value)}
          label="Years of Experience"
          placeholder="e.g., 1 Year, 3 Years, 5+ Years"
          type="number"
        />
        <Input
          value={formData.topicToFocus}
          onChange={({ target }) => handleChange('topicToFocus', target.value)}
          label="Topics to Focus On"
          placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="Any specific goals or notes for this session"
          type="text"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button
          type="submit"
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          {!isLoading && 'Create Session'}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
