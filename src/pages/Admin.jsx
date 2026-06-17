import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const [assignments, setAssignments] =
    useState([]);

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    const { data } = await supabase
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
      `)
      .order("year", {
        ascending: false,
      });

    setAssignments(data || []);
  }

  async function deleteAssignment(id) {
    console.log("Deleting ID:", id);

    const check = await supabase
      .from("assignments")
      .select("*")
      .eq("id", id);

    console.log("Found row:", check.data);

    const result = await supabase
      .from("assignments")
      .delete()
      .eq("id", id)
      .select();

    console.log("Delete result:", result);

    loadAssignments();
  }

  const isLoggedIn =
    localStorage.getItem(
      "adminLoggedIn"
    );

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <button
          onClick={() => {
            localStorage.removeItem(
              "adminLoggedIn"
            );

            window.location.href =
              "/admin-login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded mb-4"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {assignments.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded mb-2"
          >
            <div className="text-xs text-gray-500">
              ID: {item.id}
            </div>
            <div>
              Para:
              {item.para_number}
            </div>

            <div>
              Name:
              {item.users?.name}
            </div>

            <div>
              Phone:
              {item.users?.phone}
            </div>

            <div>
              Month:
              {item.month}/
              {item.year}
            </div>

            <button
              onClick={() =>
                deleteAssignment(item.id)
              }
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}