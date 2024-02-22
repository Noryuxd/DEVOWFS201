import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEllipsisH,
  faAngleRight,
  faChartBar,
  faComment,
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const jobSeeker = {
  name: "John Doe",
  email: "johndoe@email.com",
  position: "Software Engineer",
  appliedJobsCount: 84,
  interviewedJobsCount: 20,
};

const calculateJobStatusPercentages = (jobSeeker) => {
  const totalJobs = jobSeeker.appliedJobsCount;
  if (totalJobs === 0) {
    return [
      {
        Operation: "Unsuitable",
        value: 0,
        color: "#48cae4",
      },
      {
        Operation: "Interviewed",
        value: 0,
        color: "#adb5bd",
      },
    ];
  }

  const unsuitableJobs = Math.max(
    0,
    totalJobs - jobSeeker.interviewedJobsCount
  );
  const unsuitablePercentage = Math.round((unsuitableJobs / totalJobs) * 100);
  const interviewedPercentage = 100 - unsuitablePercentage;

  return [
    {
      Operation: "Pending",
      value: unsuitablePercentage,
      color: "#adb5bd",
    },
    {
      Operation: "Interviewed",
      value: interviewedPercentage,
      color: "#3b82f6",
    },
  ];
};

const checkIfMeetingScheduled = (time, currentDate) => {
  const scheduledMeetingTime = "1:30 PM";
  const scheduledMeetingDate = new Date("2024-02-18");

  const [hour, minute, period] = time.split(/:|\s/);
  const meetingHour = parseInt(hour);
  const meetingMinute = parseInt(minute);
  const meetingPeriod = period.toUpperCase();

  return (
    currentDate.toDateString() === scheduledMeetingDate.toDateString() &&
    meetingHour === 1 &&
    meetingMinute === 30 &&
    meetingPeriod === "PM"
  );
};

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    generateTimeSlots(currentDate);
  }, [currentDate]);

  const handleNextDay = () => {
    const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    setCurrentDate(nextDate);
    setIsPreviousDisabled(false);
    generateTimeSlots(nextDate);
  };

  const handlePreviousDay = () => {
    const previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    setCurrentDate(previousDate);
    setIsPreviousDisabled(
      previousDate.toDateString() === new Date().toDateString()
    );
    generateTimeSlots(previousDate);
  };

  const generateTimeSlots = (date) => {
    const currentTime = new Date();
    const selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const timeSlots = [];

    let startHour = 0;
    let startMinute = 0;

    if (selectedDate.getTime() === currentTime.getTime()) {
      if (startHour >= 23 && startMinute >= 30) {
        startHour = 0;
        startMinute = 0;
        selectedDate.setDate(selectedDate.getDate() + 1);
      }
    }

    for (let h = startHour; h < 24; h++) {
      for (let m = h === startHour ? startMinute : 0; m < 60; m += 30) {
        const formattedHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const AmPm = h < 12 ? "AM" : "PM";
        const formattedMinute = m === 0 ? "00" : m;
        const time = `${formattedHour}:${formattedMinute} ${AmPm}`;
        const hasMeeting = checkIfMeetingScheduled(time, selectedDate);

        timeSlots.push({
          time,
          hasMeeting,
        });
      }
    }

    setTimeSlots(timeSlots);
  };

  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const currentDayOfMonth = currentDate.getDate();

  const data = calculateJobStatusPercentages(jobSeeker);

  return (
    <div className="flex justify-between flex-col p-8">
      <div className="greeting p-8 flex items-center">
        <div>
          <h2 className="text-2xl font-bold font-mono">
            Good morning, {jobSeeker.name}
          </h2>
          <p className="text-gray-600">
            Here is what's happening with your job search applications from July
            19 - July 25.
          </p>
        </div>

        <div className="flex items-center ml-auto bg-white border border-blue-500 font-bold py-2 px-4 rounded ">
          <p className="text-gray-600">
            Jul 19 - Jul 25
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="ml-2 text-blue-500 cursor-pointer"
            />
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        {/* Stats */}
        <div className="flex flex-col w-72 bg-white  mr-6 mb-2">
          <div>
            <div className="flex-grow bg-gray-100 font-bold py-2 px-4 rounded-lg drop-shadow-lg mb-4">
              <h1 className="text-xl font-base">Total Jobs Applied</h1>
              <div className="font-black ml-3 text-6xl">
                {jobSeeker.appliedJobsCount}
              </div>
              <div className="flex items-end justify-end">
                <FontAwesomeIcon
                  icon={faChartBar}
                  className="w-12 h-auto text-blue-500"
                />
              </div>
            </div>

            <div className="flex-grow bg-gray-100 rounded-lg drop-shadow-lg font-bold py-2 px-4 rounded">
              <h1 className="text-xl font-base">Interviewed</h1>
              <div className="text-6xl ml-3 font-black">
                {jobSeeker.interviewedJobsCount}
              </div>
              <div className="flex items-end justify-end">
                <FontAwesomeIcon
                  icon={faComment}
                  className="w-12 h-auto text-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Applied Status */}
        <div className="flex justify-between flex-col items-center bg-gray-100 rounded-lg drop-shadow-lg font-bold py-2 px-4 rounded mr-6">
          <h1 className="text-xl font-base">Jobs Applied Status</h1>
          <div className="rounded-full h-24 w-40 flex items-center justify-center">
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={"50%"}
                  outerRadius={"90%"}
                  paddingAngle={5}
                  dataKey={"value"}
                >
                  {data.map((value, i) => (
                    <Cell key={i} fill={value.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            {data.map((item, i) => (
              <div className="flex flex-col gap-3 items-center" key={i}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 border rounded-md"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-black text-lg">{item.Operation}</span>
                </div>
                <span className="font-extrabold text-base">{item.value}%</span>
              </div>
            ))}
          </div>

          <div>
            <NavLink
              to="/dashboard/my-offers"
              className="text-blue-500 mt-2 flex items-center"
            >
              View All Applications
              <FontAwesomeIcon
                icon={faAngleRight}
                className="ml-2 text-blue-500"
              />
            </NavLink>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="div-with-scrollbar bg-gray-100  font-bold py-2 px-4 rounded-lg drop-shadow-lg  flex flex-col items-center w-2/5	">
          <h1 className="text-xl font-base">Upcoming Interviews</h1>
          <hr className="my-4 w-full" />

          <div className="relative flex items-center justify-between w-full">
            <button
              className="flex items-center hover:opacity-75 focus:outline-none"
              onClick={handlePreviousDay}
              disabled={isPreviousDisabled}
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className="text-blue-500 text-lg opacity-50"
              />
              <span className="text-gray-500 text-xs opacity-50 pl-2">
                Previous Day
              </span>
            </button>
            <h1 className="text-xl px-3">
              {isPreviousDisabled ? "Today" : currentDayOfWeek},{" "}
              <span className="text-lg font-bold text-gray-500">
                {currentDayOfMonth} {currentMonth}
              </span>
            </h1>

            <button
              className="flex items-center hover:opacity-75 focus:outline-none"
              onClick={handleNextDay}
            >
              <span className="text-gray-500 text-xs opacity-50 pr-2">
                Next Day
              </span>
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className="text-blue-500 text-lg opacity-50"
              />
            </button>
          </div>
          <hr className="my-4 w-full" />
          {timeSlots.length > 0 ? (
            <div className="flex flex-col space-y-4 overflow-auto h-64 w-full px-12 py-6 bg-gray-100">
              {timeSlots.map((item, i) =>
                item.hasMeeting ? (
                  <div
                    className="flex items-center justify-start space-x-4"
                    key={i}
                  >
                    <p className="font-bold flex items-center">
                      <span className="mr-1">{item.time}</span>
                    </p>
                    <div className="bg-gray-200 p-2 rounded-2xl flex items-center justify-between cursor-pointer w-full">
                      <img
                        src="/Dashboard Icons/avatar.png"
                        alt="User Interview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="pl-4">
                        <h3 className="text-gray-800 font-bold font-mono">
                          Interview m3aya ana
                        </h3>
                        <p className="text-gray-500 text-xs">
                          lqjsdldqjslsjkdq
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-between space-x-4"
                    key={i}
                  >
                    <p className="font-bold flex items-center">
                      <span className="mr-1">{item.time}</span>
                    </p>
                    <hr className="w-full border-dashed border-gray-500" />
                  </div>
                )
              )}
            </div>
          ) : (
            <div>Error: Data not available</div>
          )}
        </div>
      </div>

      {/* Recent Applications History */}
      <div className="bg-gray-100 rounded-lg drop-shadow-lg font-bold py-2 px-4 rounded  m-8">
        <h2 className="text-xl font-bold">Recent Applications History</h2>
        <hr className="border-gray-500 my-4 hover:border-blue-700" />
        <ul>
          {" "}
          <li className="flex items-center justify-between rounded-md px-4 py-3 hover:bg-gray-200">
            <div className="flex">
              <img
                src="/Dashboard Icons/avatar.png"
                alt="companies"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="pl-2 flex flex-col justify-center">
                <p className="text-gray-800 text-xl font-black font-serif">
                  Social Media Assistant
                </p>
                <p className="text-gray-500 text-sm">
                  Nomad Paris, France Full-Time
                </p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              <p className="text-gray-800 font-semibold text-lg">
                Date Applied
              </p>
              <p>24 July 2021</p>
            </div>
            <div className="border border-orange-500 rounded-full p-3 text-orange-500">
              <p className="text-sm">In Review</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="ml-2 text-blue-500 cursor-pointer"
              />
            </div>
          </li>
          <li className="flex items-center justify-between rounded-md px-4 py-3 hover:bg-gray-200">
            <div className="flex">
              <img
                src="/Dashboard Icons/avatar.png"
                alt="companies"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="pl-2">
                <p className="text-gray-800 text-xl font-black font-serif">
                  Social Media Assistant
                </p>
                <p className="text-gray-500 text-sm">
                  Udacity New York, USA Full-Time
                </p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              <p className="text-gray-800 font-semibold text-lg">
                Date Applied
              </p>
              <p>23 July 2021</p>
            </div>
            <div className="border border-blue-500 rounded-full p-3 text-blue-500">
              <p className="text-sm">Shortlisted</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="ml-2 text-blue-500 cursor-pointer"
              />
            </div>
          </li>
          <li className="flex items-center justify-between rounded-md px-4 py-3 hover:bg-gray-200">
            <div className="flex">
              <img
                src="/Dashboard Icons/avatar.png"
                alt="companies"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="pl-2">
                <p className="text-gray-800 text-xl font-black font-serif">
                  Social Media Assistant
                </p>
                <p className="text-gray-500 text-sm">
                  Packer Madrid, Spain Full-Time
                </p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              <p className="text-gray-800 font-semibold text-lg">
                Date Applied
              </p>
              <p>22 July 2021</p>
            </div>
            <div className="border border-red-600 rounded-full p-3 text-red-600">
              <p className="text-sm">Declined</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="ml-2 text-blue-500 cursor-pointer"
              />
            </div>
          </li>
        </ul>
        <div className="p-4 mt-8 flex justify-center">
          <NavLink
            to="/dashboard/my-offers"
            className="text-blue-500 hover:text-blue-700"
          >
            View All Applications History
            <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
