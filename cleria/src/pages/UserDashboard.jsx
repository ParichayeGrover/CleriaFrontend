import React, { useState, useEffect } from "react";
import { FileText, Upload, FileSearch, CreditCard, LogOut, PlusCircle, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Simulate an API call to fetch treatments
const fetchTreatments = () => {
  const savedTreatments = localStorage.getItem("treatments");
  if (savedTreatments) return JSON.parse(savedTreatments);

  const defaultTreatments = [
    {
      id: "T001",
      name: "Chemotherapy - Session 3",
      hospital: "City Cancer Center",
      status: "Ongoing",
      doctor: "Dr. Patel",
      date: "2025-04-20",
      description: "Weekly chemotherapy session for breast cancer treatment",
      nextReviewDate: "2025-04-27",
      sideEffects: "Fatigue, Nausea",
      medications: ["Ondansetron 8mg", "Acetaminophen 500mg"]
    },
    {
      id: "T002",
      name: "Cardiac Checkup",
      hospital: "HeartCare Hospital",
      status: "Completed",
      doctor: "Dr. Smith",
      date: "2025-01-15",
      description: "Annual cardiac evaluation and stress test",
      nextReviewDate: "",
      sideEffects: "None",
      medications: []
    },
    {
      id: "T003",
      name: "Physiotherapy - Knee",
      hospital: "City Rehab Center",
      status: "Completed",
      doctor: "Dr. Mehta",
      date: "2024-12-10",
      description: "Post-surgery rehabilitation for ACL reconstruction",
      nextReviewDate: "",
      sideEffects: "Mild discomfort",
      medications: ["Ibuprofen 400mg"]
    }
  ];

  localStorage.setItem("treatments", JSON.stringify(defaultTreatments));
  return defaultTreatments;
};

// Simulate ICU admission check
const isInICU = () => {
  const admission = localStorage.getItem("icuAdmission");
  if (!admission) return null;

  const parsed = JSON.parse(admission);
  if (!parsed.dischargeDate) return parsed; // Currently admitted
  return null;
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("treatments");
  const [treatments, setTreatments] = useState([]);
  const navigate = useNavigate();

  const loadTreatments = () => {
    const fetchedTreatments = fetchTreatments();
    setTreatments(fetchedTreatments);
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  useEffect(() => {
    if (activeTab === "treatments") loadTreatments();
  }, [activeTab]);

  const icuStatus = isInICU();

  const renderContent = () => {
    const ongoing = treatments.filter((t) => t.status === "Ongoing");
    
    // Group all treatments by hospital
    const allByHospital = {};
    treatments.forEach((t) => {
      if (!allByHospital[t.hospital]) allByHospital[t.hospital] = [];
      allByHospital[t.hospital].push(t);
    });

    // Sort treatments within each hospital (ongoing first, then by date)
    Object.keys(allByHospital).forEach(hospital => {
      allByHospital[hospital].sort((a, b) => {
        if (a.status === "Ongoing" && b.status !== "Ongoing") return -1;
        if (a.status !== "Ongoing" && b.status === "Ongoing") return 1;
        return new Date(b.date) - new Date(a.date); // Newest first for same status
      });
    });

    switch (activeTab) {
      case "treatments":
        return (
          <div className="p-8 space-y-8 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Treatments</h1>
                <p className="text-gray-500">Manage your medical treatments and history</p>
              </div>
              <button
                onClick={() => navigate("/user-dashboard/new-treatment")}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <PlusCircle size={18} />
                <span>New Treatment</span>
              </button>
            </div>

            {ongoing.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-800">Ongoing Treatments</h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {ongoing.length} active
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ongoing.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => navigate(`/user-dashboard/treatment-details/${t.id}`)}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 flex flex-col justify-between p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {t.name}
                          </h3>
                          <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            {t.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{t.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-blue-100">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="text-gray-600">Dr. {t.doctor.split("Dr. ").pop()}</p>
                            <p className="text-gray-400">{t.date}</p>
                            {icuStatus && t.status === "Ongoing" && (
                              <p className="text-xs mt-1 text-red-600 font-semibold">
                                In ICU — Bed #{icuStatus.bedNumber}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="text-blue-400 group-hover:text-blue-600 transition-colors" size={18} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">All Treatments</h2>
              <div className="space-y-6">
                {Object.keys(allByHospital).map((hospital) => (
                  <div key={hospital} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <h3 className="text-xl font-medium text-gray-800">{hospital}</h3>
                    </div>
                    <div className="space-y-3 pl-6">
                      {allByHospital[hospital].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => navigate(`/user-dashboard/treatment-details/${t.id}`)}
                          className="bg-white border border-gray-200 p-4 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                {t.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {t.doctor} • {t.date}
                              </p>
                              {icuStatus && t.status === "Ongoing" && (
                                <p className="text-xs mt-1 text-red-600 font-semibold">
                                  In ICU — Bed #{icuStatus.bedNumber}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                t.status === "Ongoing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : t.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case "plans":
        return (
          <div className="p-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Health Plans</h2>
            <p className="text-gray-500 mb-6">Manage your subscription and package options</p>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-gray-600">Premium health plan features coming soon</p>
            </div>
          </div>
        );
      case "upload":
        return (
          <div className="p-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Medical Records</h2>
            <p className="text-gray-500 mb-6">Securely upload your medical documents</p>
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-300 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-3" size={40} />
              <h3 className="text-lg font-medium text-gray-700">Drag and drop files here</h3>
              <p className="text-gray-500 mt-1">or click to browse your device</p>
              <p className="text-sm text-gray-400 mt-3">Supports PDF, JPG, PNG (Max 25MB)</p>
            </div>
          </div>
        );
      case "extract":
        return (
          <div className="p-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Medical History Summary</h2>
            <p className="text-gray-500 mb-6">Key information extracted from your records</p>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 text-gray-500">
                <FileSearch className="text-blue-400" />
                <p>Upload medical documents to generate your health summary</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { id: "treatments", label: "Treatments", icon: FileText },
    { id: "upload", label: "Upload History", icon: Upload },
    { id: "extract", label: "Extract History", icon: FileSearch },
    { id: "plans", label: "Health Plans", icon: CreditCard }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col fixed h-full justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-blue-200">Patient Portal</p>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600/90 text-white font-medium"
                    : "text-blue-100 hover:bg-blue-600/50"
                }`}
              >
                <item.icon size={18} className={activeTab === item.id ? "text-white" : "text-blue-200"} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-4 border-t border-blue-600">
          <Link
            to="/login/user"
            className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-red-500/90 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default UserDashboard;