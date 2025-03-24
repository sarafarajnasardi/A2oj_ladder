import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, ExternalLink, AlertCircle } from "lucide-react";

// Helper functions (unchanged)
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes > 0 ? minutes + "m" : ""}`;
};

const getTimeUntil = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const getBadgeColor = (type) => {
  switch (type) {
    case "CF":
      return "bg-blue-100 text-blue-800";
    case "ICPC":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const generateGoogleCalendarLink = (contest) => {
  const startDate = new Date(contest.startTimeSeconds * 1000);
  const endDate = new Date(
    contest.startTimeSeconds * 1000 + contest.durationSeconds * 1000
  );

  const formatDateTime = (date) =>
    date.toISOString().replace(/-|:|\.\d+/g, "");

  const start = formatDateTime(startDate);
  const end = formatDateTime(endDate);

  const url = new URL("https://www.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", contest.name);
  url.searchParams.set("dates", `${start}/${end}`);
  url.searchParams.set("details", `Register here: https://codeforces.com/contestRegistration/${contest.id}`);
  url.searchParams.set("location", "https://codeforces.com");

  return url.toString();
};

const UpcomingContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchContests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        "https://codeforces.com/api/contest.list?gym=false"
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== "OK") {
        throw new Error(data.comment || "API returned an error");
      }
      
      const upcomingContests = data.result.filter(
        (contest) => contest.phase === "BEFORE"
      );
      
      setContests(
        upcomingContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
      );
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch contests. Please try again later.");
      console.error("Error fetching contests:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContests();
  }, []);

  // Contest card component
  const ContestCard = ({ contest }) => (
    <div
      key={contest.id}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="md:flex">
        {/* Left side: Date and time */}
        <div className="p-6 bg-gray-50 md:w-64 flex flex-col justify-center items-center">
          <div className="text-center">
            <p className="text-gray-900 font-semibold text-lg">
              {formatDate(contest.startTimeSeconds)}
            </p>
            <p className="text-gray-700 font-bold text-xl">
              {formatTime(contest.startTimeSeconds)}
            </p>
            <div className="mt-2 bg-gray-200 text-gray-800 py-1 px-3 rounded-full inline-block">
              {getTimeUntil(contest.startTimeSeconds)}
            </div>
          </div>
        </div>

        {/* Right side: Contest details */}
        <div className="p-6 md:flex-1">
          <div className="flex justify-between items-start">
            <div>
              <span
                className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${getBadgeColor(
                  contest.type
                )}`}
              >
                {contest.type}
              </span>
              <h2 className="text-xl font-bold text-black mt-2">
                {contest.name}
              </h2>
            </div>
            <a
              href={`https://codeforces.com/contests`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatDuration(contest.durationSeconds)}</span>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <button 
            onClick={() => window.open(`https://codeforces.com/contestRegistration/${contest.id}`, "_blank")}
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200">
              Register for Contest
            </button>
            <button 
            onClick={() =>
              window.open(generateGoogleCalendarLink(contest), "_blank")
            }
            className="bg-white hover:bg-gray-100 text-black border border-gray-300 py-2 px-4 rounded-md text-sm transition-colors duration-200">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-black mb-6">
        Upcoming Codeforces Contests
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {contests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}

          {contests.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">
                No upcoming contests found at this time. Check back later!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-12">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-black mb-4">
            Contest Preparation Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">
                Before the Contest
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Review common algorithms</li>
                <li>• Prepare code templates</li>
                <li>• Get proper rest</li>
                <li>• Set up your workspace</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">
                During the Contest
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Read all problems first</li>
                <li>• Start with easier problems</li>
                <li>• Test your solutions thoroughly</li>
                <li>• Don't get stuck on one problem</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">
                After the Contest
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Review editorial solutions</li>
                <li>• Learn from your mistakes</li>
                <li>• Practice similar problems</li>
                <li>• Participate in virtual contests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Data is updated automatically from Codeforces API. Last updated:{" "}
          {lastUpdated.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default UpcomingContests;