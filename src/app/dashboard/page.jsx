"use client";

import { useSession } from "next-auth/react";
import Popup from "../../components/Popup";
import servers from "../../data/server";

import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { FiCheck, FiAlertTriangle, FiX } from "react-icons/fi";

const statusDetails = [
  {
    key: "up",
    label: "No Known Issues",
    icon: <FaCheckCircle className="text-green-500 w-5 h-5" />,
  },
  {
    key: "degraded",
    label: "Degraded Performance",
    icon: <FaExclamationTriangle className="text-yellow-500 w-5 h-5" />,
  },
  {
    key: "down",
    label: "Outage",
    icon: <FaTimesCircle className="text-red-500 w-5 h-5" />,
  },
];

export default function DashboardPage() {
  const { data } = useSession();

  const [filterValue, setFilter] = useState("all");
  const [sortValue, setSortValue] = useState("all");
  const [showServerDetails, setShowServerDetails] = useState(false);
  const [sentDetails, setSentDetails] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const getStatusIcon = (status) => {
    switch (status) {
      case "up":
        return (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
            <FiCheck size={19} />
          </div>
        );
      case "degraded":
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white">
            <FiAlertTriangle size={19} />
          </div>
        );
      case "down":
        return (
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
            <FiX size={19} />
          </div>
        );
      default:
        return null;
    }
  };

  const filteredServers = servers
    .filter((server) => filterValue === "all" || server.status === filterValue)
    .filter((server) =>
      server.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const sortedServers = filteredServers.sort((a, b) => {
    switch (sortValue) {
      case "all":
        return a.status === b.status;
      case "Low_to_High":
        return parseFloat(a.uptime) - parseFloat(b.uptime);
      case "High_to_Low":
        return parseFloat(b.uptime) - parseFloat(a.uptime);
      default:
        return 0;
    }
  });

  const showSentData = (show, server) => {
    setShowServerDetails(show);
    setSentDetails(server);
  };

  const handleClosePopup = () => {
    setShowServerDetails(false);
  };

  return (
    <div className=" w-[100%] min-h-screen relative">
      <section className="flex flex-col justify-center items-center p-10 gap-10">
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <p
            className={`text-[18px] font-bold md:text-[25px] ${data && "px-6 py-3"} bg-black text-white rounded-xl`}
          >
            {data ? `Welcome Back ${data.user.name}` : ""}
          </p>
          <p className=" text-[18px] font-bold md:text-[25px]  ">
            All systems are operational
          </p>

          <div className="flex flex-row flex-wrap items-center justify-center gap-6">
            {statusDetails.map((type) => (
              <div
                key={type.key}
                className="flex flex-row items-center gap-2 mb-3"
              >
                {type.icon}
                <h3 className="text-[16px] md:text-[20px] font-semibold text-gray-700">
                  {type.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <section className="flex flex-col w-[100%] h-auto bg-white rounded-2xl p-10 shadow-xl ">
          <div className="flex flex-col justify-center  items-center md:items-center gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-5 items-center w-full">
              <div className="text-[20px] font-semibold flex-1">
                Service Status
              </div>
              <div className="flex flex-col md:flex-row  items-center justify-center gap-4">
                <p className="text-sm md:text-md px-4 py-2 bg-black text-white rounded-xl font-semibold">
                  {sortedServers.length} servers
                </p>
                <p className="text-sm md:text-md  px-4 py-2 bg-black text-white rounded-xl font-semibold">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center  w-full gap-10">
              <input
                type="text"
                placeholder="Search servers..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-4 py-2 border rounded w-full md:w-[300px] flex-1"
              ></input>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto ">
                <select
                  id="filter"
                  value={filterValue}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded bg-white text-gray-800 text-[17px] font-bold flex-1"
                >
                  <option value="all">All</option>
                  <option value="up">Up</option>
                  <option value="degraded">Degraded</option>
                  <option value="down">Down</option>
                </select>

                <select
                  id="sortOrder"
                  value={sortValue}
                  onChange={(e) => setSortValue(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded bg-white text-gray-800 text-[17px] font-bold flex-1"
                >
                  <option value="all">All</option>
                  <option value="Low_to_High">Uptime Low to High</option>
                  <option value="High_to_Low">Uptime High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-[3px] bg-gray-200 w-full my-5"></div>
          {sortedServers.length === 0 ? (
            <div className="flex flex-col items-center gap-2 mt-4 text-gray-500">
              <FiAlertTriangle size={40} />
              <div>No servers match the selected filters or search.</div>
            </div>
          ) : (
            sortedServers.map((server, index) => (
              <div key={server.id} className="flex flex-col items-center gap-6">
                <div className="w-full flex flex-row items-cente justify-between">
                  <div
                    className="flex flex-row items-center gap-4  "
                    onClick={() => showSentData(true, server)}
                  >
                    {getStatusIcon(server.status)}
                    <span className="font-semibold text-lg cursor-pointer">
                      {server.name}
                    </span>
                  </div>
                  <div className="ml-4 text-gray-400 font-medium text-[18px]">
                    {server.uptime}
                  </div>
                </div>
                <div className="w-full flex items-center gap-[2px]">
                  {server.uptimeHistory.map((day, idx) => (
                    <div
                      key={idx}
                      className="relative flex-1 min-w-[10px] h-[30px] rounded-sm group"
                    >
                      <div
                        className={`w-full h-full rounded-sm ${
                          day.status === "up"
                            ? "bg-green-500"
                            : day.status === "degraded"
                              ? "bg-orange-400"
                              : "bg-red-500"
                        }`}
                      ></div>

                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-5 rounded whitespace-nowrap z-10 shadow font-bold text-[14px]">
                        {`${day.day} - ${day.date} - ${day.status} - ${day.uptime}%`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-[3px] bg-gray-100 w-full my-5"></div>
              </div>
            ))
          )}
        </section>
      </section>
      <Popup
        close={showServerDetails}
        onClose={handleClosePopup}
        details={sentDetails}
      />
    </div>
  );
}
