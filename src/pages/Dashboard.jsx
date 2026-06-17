import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [takenParas, setTakenParas] = useState([]);

  useEffect(() => {
    loadAssignments();

    const channel = supabase
      .channel("assignments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "assignments",
        },
        () => {
          loadAssignments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadAssignments() {
    const now = new Date();

    const { data, error } = await supabase
      .from("assignments")
      .select(`
        para_number,
        users (
          name,
          phone
        )
      `)
      .eq("month", now.getMonth() + 1)
      .eq("year", now.getFullYear());

    if (!error) {
      setTakenParas(data || []);
    }
  }

  const paraTaken = (paraNumber) =>
    takenParas.some((p) => p.para_number === paraNumber);

  function getParaInfo(paraNumber) {
    return takenParas.find(
      (p) => p.para_number === paraNumber
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <>
        <Navbar />
      </>

      <h1 className="text-3xl font-bold my-6">
        Monthly Quran Paras
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(30)].map((_, index) => {
          const para = index + 1;

          return (
            <div
              key={para}
              className={`border rounded-lg p-4 text-center font-semibold ${
                paraTaken(para)
                  ? "bg-red-100"
                  : "bg-green-100"
              }`}
            >
              <div>
                <div className="font-bold">
                  Para {para}
                </div>

                {paraTaken(para) ? (
                  <>
                    <div>
                      {getParaInfo(para)?.users?.name}
                    </div>

                    <div>
                      {getParaInfo(para)?.users?.phone}
                    </div>
                  </>
                ) : (
                  <div>Available</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}