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
      <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover object-top md:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gray-900/65" />
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="mb-3 text-center font-semibold text-sky-300">
              {formatDate(today)}
            </p>
            <h1 className="text-5xl text-center font-semibold tracking-tight text-white sm:text-7xl">
              Monthly Quran recitation Record
            </h1>
            <p
              className="mt-8 text-lg/8 text-center font-medium text-pretty text-gray-300 sm:text-xl/8"
              dir="rtl"
            >
              اللهم اغفر لنا جميع الأخطاء والهفوات في تلاوة القرآن الكريم التالية وأضف ثوابها إلى أعمال والدتنا كامرون نهار بنت محمد أشرف علي. اللهم آمين
            </p>
          </div>

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

      <section
        id="registration"
        className="bg-linear-to-br from-teal-700 via-cyan-700 to-sky-800 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <form className="mx-auto max-w-3xl" onSubmit={handleSubmit}>
            <div className="grid gap-8 md:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-sm font-bold text-white">
                  Name
                </span>
                <input
                  className="h-12 w-full rounded-md border border-white/30 bg-white/95 px-4 text-base text-gray-950 shadow-sm outline-none placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/40"
                  placeholder="Abdullah"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-sm font-bold text-white">
                  Phone number
                </span>
                <div className="flex h-12 overflow-hidden rounded-md border border-white/30 bg-white/95 shadow-sm focus-within:border-white focus-within:ring-2 focus-within:ring-white/40">
                  <span className="flex items-center border-r border-gray-300 bg-gray-100 px-4 text-gray-600">
                    +880
                  </span>
                  <input
                    className="min-w-0 flex-1 px-4 text-base text-gray-950 outline-none placeholder:text-gray-500"
                    placeholder="16873XXXXX"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </label>
            </div>

            <h2 className="mt-16 text-xl font-bold text-white">
              Select the Para you can read in {currentMonthName}, {currentYear} :
            </h2>

            <div
              id="para-list"
              className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5"
            >
              {[...Array(30)].map((_, index) => {
                const para = index + 1;
                const taken = getTakenPara(para);
                const selected = selectedParas.includes(para);

                return (
                  <label
                    key={para}
                  className={`min-h-14 text-base ${
                      taken ? "text-cyan-100/75" : "cursor-pointer text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled={Boolean(taken)}
                        checked={selected || Boolean(taken)}
                        onChange={() => togglePara(para)}
                        className="h-5 w-5 rounded border-white/60 accent-teal-300 disabled:accent-cyan-100"
                      />
                      Para {para}
                    </span>

                    {taken && (
                      <Link
                        to={`/profile/${taken.users?.phone}`}
                        className="mt-1 block text-cyan-100 hover:text-white hover:underline"
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
              className="mt-12 h-12 w-full rounded-md bg-white px-4 font-bold text-teal-800 shadow-sm transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:bg-cyan-100 disabled:text-teal-500"
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
              className="font-bold text-cyan-50/85 hover:text-white hover:underline"
            >
              Logout →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
