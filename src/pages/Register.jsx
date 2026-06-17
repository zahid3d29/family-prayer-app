import { useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedParas, setSelectedParas] = useState([]);

  function togglePara(para) {
    if (selectedParas.includes(para)) {
      setSelectedParas(
        selectedParas.filter((p) => p !== para)
      );
    } else {
      setSelectedParas([...selectedParas, para]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let userId;

    const { data: existingUser } =
      await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser } = await supabase
          .from("users")
          .insert({
            name,
            phone,
          })
          .select()
          .single();

        userId = newUser.id;
      }

    const now = new Date();
    
      // Check if this phone already registered this month
      const { data: existingAssignments } = await supabase
        .from("assignments")
        .select(`
          month,
          year,
          users (
            phone
          )
        `)
        .eq("month", now.getMonth() + 1)
        .eq("year", now.getFullYear());

      const alreadyRegistered =
        existingAssignments?.some(
          item => item.users?.phone === phone
        );

      if (alreadyRegistered) {
        alert(
          "This phone number has already registered this month."
        );
        return;
      }

      // NEW CHECK
      for (const para of selectedParas) {
        const { data, error } = await supabase
          .from("assignments")
          .select("*")
          .eq("para_number", para)
          .eq("month", now.getMonth() + 1)
          .eq("year", now.getFullYear());

        if (data && data.length > 0) {
          alert(
            `Para ${para} is already assigned to someone else`
          );
          return;
        }
      }

      const rows = selectedParas.map((para) => ({
        user_id: userId,
        para_number: para,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      }));

      const { error } = await supabase
        .from("assignments")
        .insert(rows);

      if (!error) {
        alert("Registration successful");
        setName("");
        setPhone("");
        setSelectedParas([]);
      }
    
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <>
        <Navbar />
      </>

      <h1 className="text-3xl font-bold mt-6 mb-4">
        Take your Quran Para
      </h1>
      <h4 className="text-lg font-normal mb-4">
        Take your turn for family prayer this month! Select the paras you want to read and submit your registration. You can only register once per month, so choose wisely! If a para is already taken, it will be marked as unavailable.
      </h4>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <div className="grid grid-cols-5 gap-2 mb-4">
          {[...Array(30)].map((_, i) => {
            const para = i + 1;

            return (
              <button
                type="button"
                key={para}
                onClick={() =>
                  togglePara(para)
                }
                className={`p-2 border rounded ${
                  selectedParas.includes(para)
                    ? "bg-blue-200"
                    : ""
                }`}
              >
                {para}
              </button>
            );
          })}
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}