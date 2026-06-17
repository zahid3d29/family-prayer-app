import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (
      password === "familyprayer786"
    ) {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded"
      >
        <h1 className="text-2xl font-bold mb-4">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full mb-4"
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}