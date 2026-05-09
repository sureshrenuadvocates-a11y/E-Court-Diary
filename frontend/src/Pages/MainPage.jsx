import { useEffect, useState } from "react";
import AddRecords from "../Components/AddRecords";
import useAuthStore from "../Stores/AuthStore";
import VerifyEmailAddress from "../Components/VerifyEmailAddress";

const MainPage = () => {
  const {
    AuthUser,
    Logout,
    GetDiaryData,
    DiaryData,
    DeleteRecord,
    DeleteAccount,
    SearchCase,
    DeleteAllRecords,
    SearchedCases,
  } = useAuthStore();

  const [isAddRecordsOpen, setIsAddRecordsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  // SEARCH STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    GetDiaryData();
  }, [GetDiaryData]);

  // SEARCH EFFECT
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim() !== "") {
        setIsSearching(true);

        try {
          await SearchCase(searchTerm);
        } catch (error) {
          console.log(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        GetDiaryData();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const recordsToShow = searchTerm ? SearchedCases : DiaryData;

  const totalEntries = DiaryData.length;
  const isEmailVerified = AuthUser?.isEmailVerified;

  const upcomingHearings = DiaryData.filter((record) => {
    const hearingDate = new Date(record.Hearingdate);
    const today = new Date();
    const sevenDaysFromNow = new Date(
      today.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    return hearingDate >= today && hearingDate <= sevenDaysFromNow;
  }).length;

  const totalDistricts = [
    ...new Set(DiaryData.map((record) => record.District)),
  ].length;

  const latestDistrict = DiaryData[0]?.District || "N/A";

  return isEmailVerified ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-indigo-100">
                E-Court Dashboard
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight">
                Welcome Back,
                <br />
                {AuthUser?.username || "User"}
              </h1>

              <p className="mt-4 max-w-2xl text-indigo-100">
                Manage court records, hearings, districts and diary
                entries from one secure platform.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => Logout()}
                  className="rounded-2xl bg-white/20 px-5 py-3 text-sm font-semibold backdrop-blur-lg transition hover:bg-white/30"
                >
                  Logout
                </button>

                <button
                  onClick={() => setIsAddRecordsOpen(true)}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:scale-105"
                >
                  + Add Record
                </button>
              </div>
            </div>

            {/* PROFILE CARD */}
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl min-w-[320px]">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
                  {AuthUser?.username?.charAt(0) || "U"}
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    {AuthUser?.username}
                  </h3>

                  <p className="text-sm text-indigo-100">
                    {AuthUser?.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-100">
                    Mobile
                  </span>

                  <span className="font-medium">
                    {AuthUser?.MobileNumber}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-indigo-100">
                    Status
                  </span>

                  <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowDeleteDialog(true)}
                className="mt-6 w-full rounded-2xl border border-red-300/20 bg-red-500/20 py-3 text-sm font-semibold text-white transition hover:bg-red-500/30"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* CARD */}
          <div className="group rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Entries
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  {totalEntries}
                </h2>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
                📂
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Total records available in system.
            </p>
          </div>

          {/* CARD */}
          <div className="group rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Upcoming Hearings
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  {upcomingHearings}
                </h2>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                ⚖️
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Hearings scheduled within 7 days.
            </p>
          </div>

          {/* CARD */}
          <div className="group rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Active Districts
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  {totalDistricts}
                </h2>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
                🏛️
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Districts currently active.
            </p>
          </div>

          {/* CARD */}
          <div className="group rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Latest District
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {latestDistrict}
                </h2>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                📍
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Recently added district.
            </p>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="rounded-[32px] bg-white p-6 shadow-xl">
          {/* TOP BAR */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:w-[400px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </div>

              <input
                type="text"
                placeholder="Search by case no, court or petitioner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />

              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                </div>
              )}

              {searchTerm && !isSearching && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    GetDiaryData();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsAddRecordsOpen(true)}
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-indigo-700"
              >
                + Add Record
              </button>

              <button
                onClick={() => setShowDeleteAllDialog(true)}
                className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Delete All
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      Case No
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Court
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Petitioner
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Hearing Date
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      District
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {recordsToShow.length > 0 ? (
                    recordsToShow.map((record) => (
                      <tr
                        key={record._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5 font-semibold text-slate-900">
                          {record.CaseNo}
                        </td>

                        <td className="px-6 py-5 text-slate-600">
                          {record.Court}
                        </td>

                        <td className="px-6 py-5 text-slate-600">
                          {record.Petitioner}
                        </td>

                        <td className="px-6 py-5 text-slate-600">
                          {new Date(
                            record.Hearingdate
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 border border-indigo-100">
                            📍 {record.District}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              DeleteRecord(record._id)
                            }
                            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-20 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-6xl">📂</div>

                          <h3 className="mt-5 text-2xl font-bold text-slate-800">
                            No Records Found
                          </h3>

                          <p className="mt-2 text-slate-500">
                            Try searching with another keyword.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ADD RECORD MODAL */}
      <AddRecords
        isOpen={isAddRecordsOpen}
        onClose={() => setIsAddRecordsOpen(false)}
      />

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[420px] rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
              ⚠️
            </div>

            <h2 className="mt-6 text-center text-3xl font-black text-slate-900">
              Delete Account
            </h2>

            <p className="mt-3 text-center text-slate-500">
              This action is permanent and cannot be undone.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="w-full rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  DeleteAccount(AuthUser?._id);
                  setShowDeleteDialog(false);
                }}
                className="w-full rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ALL RECORDS MODAL */}
      {showDeleteAllDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[420px] rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
              🗑️
            </div>

            <h2 className="mt-6 text-center text-3xl font-black text-slate-900">
              Delete All Records
            </h2>

            <p className="mt-3 text-center text-slate-500">
              All records will be permanently removed.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowDeleteAllDialog(false)}
                className="w-full rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  DeleteAllRecords();
                  setShowDeleteAllDialog(false);
                }}
                className="w-full rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <VerifyEmailAddress />
  );
};

export default MainPage;