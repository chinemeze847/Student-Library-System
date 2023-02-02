import { useEffect } from "react";
import { Card, Middle, Rightbar } from "../components";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { getStats, stats } = useAppContext();

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className=" ">
      <div className="h-full pb-12 ">
        <div className="flex p-4 space-x-3">
          {stats.length === 0 ? (
            <p>Loading...</p>
          ) : (
            stats.map((stat, index) => (
              <Card
                key={index}
                title={stat.title}
                total={stat.total}
                icon={index}
              />
            ))
          )}
        </div>

        <div className="flex  ml-3 mt-6 space-x-6  mr-4">
          <Middle />
          <Rightbar />
        </div>
      </div>
    </div>
  );
}
