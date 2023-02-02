import { Activity, StatsCard } from "../components/dashboard";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { getAdvisorStats, stats, user, getStudents, students } =
    useAppContext();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  useEffect(() => {
    getAdvisorStats();
    getStudents();
  }, []);

  return (
    <div className=" h-screen ">
      <div className="flex py-8 px-32 space-x-8">
        <div className="bg-white w-6/12 rounded-md flex flex-col gap-2 items-center justify-center py-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-500 sm:text-sm md:text-xl">
            Welcome <br />{" "}
            <span className=" text-indigo-600">{user && user.fullname}</span>
          </h2>
          <p>Today is : {`${day}-${month}-${year}`}</p>
        </div>

        {stats.length === 0 ? (
          <p>Loading...</p>
        ) : (
          stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              total={stat.total}
              icon={index}
            />
          ))
        )}
      </div>
      <div className=" py-8 px-32">
        {students ? <Activity students={students} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Dashboard;
