import React, { useContext, useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utlis/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { FaTrophy } from 'react-icons/fa6';
import axiosInstance from '../../utlis/axiosInstance';
import { API_PATHS } from '../../utlis/apiPath';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from "moment";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false); // ✅ boolean
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
   try{
    const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    setSessions(response.data);

   }
   catch(error)
   {
    console.error("Error Fetching Session Data",error);
   }
  };

  const deleteSession = async (sessionData) => {
    // placeholder for future logic
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
       {Array.isArray(sessions) &&
  sessions.map((data, index) => (
    <SummaryCard
      key={data?._id}
      colors={CARD_BG[index % CARD_BG.length]}
      role={data?.role || ""}
      topicToFocus={data?.topicToFocus || ""}
      exprience={data?.exprience || "-"}
      questions={data?.questions?.length || "-"}
      description={data?.description || ""}
      lastupdated={
        data?.updatedAt
          ? moment(data.updatedAt).format("DD MM YYYY")
          : ""
      }
      onSelect={() => navigate(`/interview-prep/${data._id}`)}
      onDelete={() => setOpenDeleteAlert({ open: true, data })}
    />
))}
        </div>
        <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99ab] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transitions-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20    ' onClick={() => setOpenCreateModal(true)}>
            <LuPlus className='text-2xl text-white ' /> Add New
          </button>
        
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
