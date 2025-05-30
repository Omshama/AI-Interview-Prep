import React from 'react'
import {useParams} from 'react-router-dom';
import moment from 'moment';
import {AnimatePresence,motion} from 'framer-motion';
import {LuCircleAlert,LuListCollapse} from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import {toast} from 'react-hot-toast';

const InterviewPrep = () => {
  const {sessionId} =useParams();
  const[sessionData,setSessionData]=useState(null);
  const [errorMsg,setErrorMsg]=useState("");
  const [openLearnMoreDrawer,setOpenLearnMoreDrawer]=useState(false);
  const[explanation,setExplanation]=useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[isUpdateLoader,setIsUpdateLoader]=useState(false);
  //Fetch Session
  const fetchSessionDetailsById=async()=>{};
  //Generate Concept Explanation
  const generateConceptExplanation=async(question)=>{};
  //Pin Question
  const toggleQuestion=async(questionId)=>{};
  //Add More Questions
  const uploadMoreQuestions=async()=>{};
  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }
    return ()=>{};
  },[]); 
  return (
    <div>InterviewPrep
      
    </div>
  )
}

export default InterviewPrep
