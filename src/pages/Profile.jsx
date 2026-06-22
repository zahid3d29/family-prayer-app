import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Profile() {
  const { phone } = useParams();

  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);

  const loadProfile = useCallback(async () => {
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (!userData) return;

    setUser(userData);

    const { data: assignments } =
      await supabase
        .from("assignments")
        .select("*")
        .eq("user_id", userData.id)
        .order("year", {
          ascending: false,
        })
        .order("month", {
          ascending: false,
        })
        .order("para_number");

    const grouped = {};

    assignments?.forEach((item) => {
      const key =
        `${item.month}-${item.year}`;

      if (!grouped[key]) {
        grouped[key] = {
          month: item.month,
          year: item.year,
          paras: [],
        };
      }

      grouped[key].paras.push(
        item.para_number
      );
    });

    setRecords(
      Object.values(grouped)
    );
  }, [phone]);

  useEffect(() => {
    Promise.resolve().then(() => loadProfile());
  }, [loadProfile]);

  if (!user)
    return (
      <div className="p-8">
        Loading...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center">
        Records of{" "}
        <span className="text-green-700">
          {user.name}
        </span>
      </h1>

      <p className="text-center mt-2">
        Phone: {user.phone}
      </p>

      {records.map((record) => (
        <div
          key={`${record.month}-${record.year}`}
          className="mt-10"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            {
              monthNames[
                record.month
              ]
            }{" "}
            {record.year}
          </h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">
                  Assigned Paras
                </th>
                <th className="border p-2">
                  Month
                </th>
                <th className="border p-2">
                  Year
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-2">
                  {record.paras.join(
                    ", "
                  )}
                </td>

                <td className="border p-2">
                  {
                    monthNames[
                      record.month
                    ]
                  }
                </td>

                <td className="border p-2">
                  {record.year}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <div className="text-center mt-10">
        <Link
          to="/"
          className="text-blue-600 underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
