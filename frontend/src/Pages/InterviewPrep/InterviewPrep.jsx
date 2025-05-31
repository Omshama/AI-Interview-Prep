import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import RoleInfoHeader from '../../components/Cards/RoleInfoHeader';
import axiosInstance from '../../utlis/axiosInstance';
import { API_PATHS } from '../../utlis/apiPath';
import QuestionCard from '../../components/Cards/QuestionCard'; // ✅ Ensure this path is correct

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch Session
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('Failed to load session details.');
    }
  };

  const generateConceptExplanation = async (question) => {
    // Placeholder
  };

  const toggleQuestion = async (questionId) => {
    // Placeholder
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ''}
        topicToFocus={sessionData?.topicsToFocus?.join(', ') || ''}
        experience={sessionData?.experience || ''}
        questions={sessionData?.questions?.length || 0}
        description={sessionData?.description || ''}
      />

      <div className="container mx-auto pt-4  pb-4 px-4 md:px-0">
        <h2 className="text-lg  font-semibold color-black ">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10 ">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`question-${data._id || index}`}
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() => generateConceptExplanation(data.question)}
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestion(data._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
