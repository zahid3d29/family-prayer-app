import { useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [phone, setPhone] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchHistory() {
    setLoading(true);

    const { data, error } = await supabase
      .from("assignments")
      .select(`
        id,
        para_number,
        month,
        year,
        users (
          name,
          phone
        )
      `);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const filtered = data.filter(
      item => item.users?.phone === phone
    );

    setHistory(filtered);
    setLoading(false);
  }

  const groupedHistory = history.reduce(
    (acc, item) => {
      const key = `${item.month}-${item.year}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    },
    {}
  );

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Search History
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border p-2 rounded w-full"
          />

          <button
            onClick={searchHistory}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Search
          </button>
        </div>

        {loading && (
          <p>Loading...</p>
        )}

        {!loading && history.length === 0 && (
          <p>No records found.</p>
        )}

        {Object.entries(groupedHistory).map(
          ([key, records]) => (
            <div
              key={key}
              className="border rounded-lg p-4 mb-4 shadow"
            >
              <h2 className="text-xl font-bold mb-2">
                {records[0].month}/
                {records[0].year}
              </h2>

              <div className="mb-2">
                <strong>Name:</strong>{" "}
                {records[0].users?.name}
              </div>

              <div className="mb-2">
                <strong>Phone:</strong>{" "}
                {records[0].users?.phone}
              </div>

              <div>
                <strong>Paras:</strong>{" "}
                {records
                  .map(
                    (r) => r.para_number
                  )
                  .join(", ")}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}