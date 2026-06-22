import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FAMILY_PASSWORD = "bismillah786";

export default function FamilyLogin() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || "/";

  function handleLogin(event) {
    event.preventDefault();
    setErrorMessage("");

    if (password === FAMILY_PASSWORD) {
      localStorage.setItem("familyLoggedIn", "true");
      navigate(destination, {
        replace: true,
      });
      return;
    }

    setErrorMessage("Wrong password");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-950">
          Family Login
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Enter the family password to open the Quran recitation record.
        </p>

        {errorMessage && (
          <div className="mt-5 rounded bg-red-100 px-4 py-3 text-sm text-red-900">
            {errorMessage}
          </div>
        )}

        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-bold text-gray-950">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-md border border-gray-300 px-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            autoFocus
          />
        </label>

        <button
          type="submit"
          className="mt-6 h-12 w-full rounded-md bg-sky-500 px-4 font-bold text-white transition hover:bg-sky-600"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
