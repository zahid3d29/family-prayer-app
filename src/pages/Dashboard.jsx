import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import heroImage from "../assets/kobar_ammu.jpg";

const monthNames = [
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

function formatDate(date) {
  return `${date.getDate()}, ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

function getMonthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function normalizePhone(value) {
  return value
    .trim()
    .replace(/^\+?880/, "")
    .replace(/\D/g, "");
}

export default function Dashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedParas, setSelectedParas] = useState([]);
  const [takenParas, setTakenParas] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentMonthName = monthNames[today.getMonth()];
  const deadline = getMonthEnd(today);

  const loadTakenParas = useCallback(async () => {
    const { data } = await supabase
      .from("assignments")
      .select(`
        para_number,
        users (
          name,
          phone
        )
      `)
      .eq("month", currentMonth)
      .eq("year", currentYear);

    setTakenParas(data || []);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    Promise.resolve().then(() => loadTakenParas());

    const channel = supabase
      .channel("dashboard-assignments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "assignments",
        },
        () => {
          loadTakenParas();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadTakenParas]);

  function getTakenPara(para) {
    return takenParas.find((item) => item.para_number === para);
  }

  function togglePara(para) {
    if (getTakenPara(para)) return;

    setSelectedParas((current) =>
      current.includes(para)
        ? current.filter((item) => item !== para)
        : [...current, para]
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    const cleanName = name.trim();
    const cleanPhone = normalizePhone(phone);

    if (!cleanName || !cleanPhone) {
      setErrorMessage("Please enter your name and phone number.");
      return;
    }

    if (selectedParas.length === 0) {
      setErrorMessage("Please select at least one para.");
      return;
    }

    setIsSubmitting(true);

    const { data: existingUser, error: userLookupError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", cleanPhone)
      .maybeSingle();

    if (userLookupError) {
      setErrorMessage("Could not check this phone number. Please try again.");
      setIsSubmitting(false);
      return;
    }

    let userId = existingUser?.id;
    let displayName = existingUser?.name || cleanName;

    if (!existingUser) {
      const { data: newUser, error: newUserError } = await supabase
        .from("users")
        .insert({
          name: cleanName,
          phone: cleanPhone,
        })
        .select()
        .single();

      if (newUserError) {
        setErrorMessage("Could not save your details. Please try again.");
        setIsSubmitting(false);
        return;
      }

      userId = newUser.id;
      displayName = newUser.name;
    }

    const { data: existingAssignments, error: assignmentLookupError } =
      await supabase
        .from("assignments")
        .select("id")
        .eq("user_id", userId)
        .eq("month", currentMonth)
        .eq("year", currentYear);

    if (assignmentLookupError) {
      setErrorMessage("Could not check this month's records. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (existingAssignments?.length) {
      setErrorMessage("This phone number has already registered this month.");
      setIsSubmitting(false);
      return;
    }

    const { data: selectedTakenParas, error: takenLookupError } = await supabase
      .from("assignments")
      .select("para_number")
      .in("para_number", selectedParas)
      .eq("month", currentMonth)
      .eq("year", currentYear);

    if (takenLookupError) {
      setErrorMessage("Could not check selected paras. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (selectedTakenParas?.length) {
      const unavailableParas = selectedTakenParas
        .map((item) => item.para_number)
        .join(", ");

      setErrorMessage(`Para ${unavailableParas} is already assigned.`);
      await loadTakenParas();
      setIsSubmitting(false);
      return;
    }

    const rows = selectedParas.map((para) => ({
      user_id: userId,
      para_number: para,
      month: currentMonth,
      year: currentYear,
    }));

    const { error } = await supabase.from("assignments").insert(rows);

    if (error) {
      setErrorMessage("Registration failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const sortedParas = [...selectedParas].sort((a, b) => a - b);

    setMessage(
      `Assalamu Alaikum! ${displayName}. Thanks for your Selection. You were selected Para(s): ${sortedParas.join(
        ", "
      )}. Please! recite properly and complete before ${formatDate(deadline)}.`
    );
    setName("");
    setPhone("");
    setSelectedParas([]);
    await loadTakenParas();
    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-white text-gray-950">
      <section
        className="relative flex min-h-72 items-center justify-center bg-cover bg-top px-4 py-16 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        }}
      >
        <div className="max-w-4xl">
          <p className="mb-2 text-base font-bold text-sky-400">
            {formatDate(today)}
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Monthly Quran
            <br />
            recitation Record
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/90" dir="rtl">
            اللهم اغفر لنا جميع الأخطاء والهفوات في تلاوة القرآن الكريم التالية وأضف ثوابها إلى أعمال والدتنا كامرون نهار بنت محمد أشرف علي. اللهم آمين
          </p>
        </div>
      </section>

      {(message || errorMessage) && (
        <div
          className={`mx-4 mt-4 rounded px-4 py-4 text-center md:mx-8 ${
            errorMessage
              ? "bg-red-100 text-red-900"
              : "bg-green-100 text-green-900"
          }`}
        >
          {errorMessage || message}
        </div>
      )}

      <section className="mx-auto max-w-3xl px-6 py-20">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 md:grid-cols-2">
            <label className="block">
              <span className="mb-3 block text-sm font-bold">Name</span>
              <input
                className="h-12 w-full rounded-md border border-gray-300 px-4 text-base outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Abdullah"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-bold">Phone number</span>
              <div className="flex h-12 overflow-hidden rounded-md border border-gray-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <span className="flex items-center border-r border-gray-300 bg-gray-100 px-4 text-gray-600">
                  +880
                </span>
                <input
                  className="min-w-0 flex-1 px-4 text-base outline-none"
                  placeholder="16873XXXXX"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </label>
          </div>

          <h2 className="mt-16 text-xl font-bold">
            Select the Para you can read in {currentMonthName}, {currentYear} :
          </h2>

          <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
            {[...Array(30)].map((_, index) => {
              const para = index + 1;
              const taken = getTakenPara(para);
              const selected = selectedParas.includes(para);

              return (
                <label
                  key={para}
                  className={`min-h-14 text-base ${
                    taken ? "text-gray-950" : "cursor-pointer"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      disabled={Boolean(taken)}
                      checked={selected || Boolean(taken)}
                      onChange={() => togglePara(para)}
                      className="h-5 w-5 rounded border-gray-400 accent-sky-500 disabled:accent-gray-300"
                    />
                    Para {para}
                  </span>

                  {taken && (
                    <Link
                      to={`/profile/${taken.users?.phone}`}
                      className="mt-1 block text-blue-700 hover:underline"
                    >
                      (Taken by {taken.users?.name || "Unknown"})
                    </Link>
                  )}
                </label>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-12 h-12 w-full rounded-md bg-sky-500 px-4 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            onClick={() => {
              localStorage.removeItem("familyLoggedIn");
              localStorage.removeItem("adminLoggedIn");
            }}
            className="font-bold text-gray-950 hover:underline"
          >
            Logout →
          </Link>
        </div>
      </section>
    </main>
  );
}
