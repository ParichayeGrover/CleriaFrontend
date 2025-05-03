import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");

  const patientData = [
    { id: 'P001', name: 'John Doe', room: '101', doctor: 'Dr. Smith', nurse: 'Nurse Joy', treatment: 'Physiotherapy', status: 'Stable' },
    { id: 'P002', name: 'Jane Roe', room: '102', doctor: 'Dr. Brown', nurse: 'Nurse Kelly', treatment: 'Post-surgery', status: 'Critical' },
    { id: 'P003', name: 'Robert Miles', room: '103', doctor: 'Dr. Smith', nurse: 'Nurse Lucy', treatment: 'Cardiac care', status: 'Stable' },
    { id: 'P004', name: 'Emily Stone', room: '104', doctor: 'Dr. Patel', nurse: 'Nurse Nina', treatment: 'Chemotherapy', status: 'Under Observation' },
    { id: 'P005', name: 'Michael Scott', room: '105', doctor: 'Dr. Wang', nurse: 'Nurse Kim', treatment: 'Checkup', status: 'Discharged' },
    { id: 'P006', name: 'Sophia Johnson', room: '106', doctor: 'Dr. Lee', nurse: 'Nurse Emma', treatment: 'COVID Recovery', status: 'Stable' },
    { id: 'P007', name: 'Daniel White', room: '107', doctor: 'Dr. Khan', nurse: 'Nurse Rina', treatment: 'Post-op care', status: 'Critical' },
  ];

  // Get unique doctors for filter
  const doctors = [...new Set(patientData.map(p => p.doctor))];

  // Filter Logic
  const filteredPatients = patientData.filter((p) => {
    const matchesSearch = Object.values(p).join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    const matchesDoctor = filterDoctor ? p.doctor === filterDoctor : true;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const getCount = (status) => patientData.filter(p => p.status === status).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white p-6 sticky top-0 h-screen flex flex-col">
        {/* Header and navigation content */}
        <div className="flex-1">
          <div className="flex items-center mb-10">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <DashboardIcon className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>

          <nav className="space-y-2">
            {/* <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600/50 transition-colors"
            >
              <DashboardIcon fontSize="small" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin-dashboard/patients"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600/50 transition-colors"
            >
              <PersonIcon fontSize="small" />
              <span>Patients</span>
            </Link> */}
          </nav>
        </div>

        {/* Logout button at bottom */}
        <div className="mt-auto pt-4 border-t border-blue-600/30">
          <Link
            to="/login/admin"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/90 transition-colors"
          >
            <ExitToAppIcon fontSize="small" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patient Dashboard</h2>
            <p className="text-gray-500">Manage all patient records and status</p>
          </div>

          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-gray-500 font-medium">Total Patients</p>
            <h3 className="text-3xl font-bold mt-2">{patientData.length}</h3>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-gray-500 font-medium">Critical</p>
            <h3 className="text-3xl font-bold mt-2 text-red-500">{getCount("Critical")}</h3>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-gray-500 font-medium">Stable</p>
            <h3 className="text-3xl font-bold mt-2 text-green-500">{getCount("Stable")}</h3>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-gray-500 font-medium">Discharged</p>
            <h3 className="text-3xl font-bold mt-2 text-blue-500">{getCount("Discharged")}</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
            <FilterIcon className="text-gray-400 mr-2" fontSize="small" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm"
            >
              <option value="">All Status</option>
              <option value="Critical">Critical</option>
              <option value="Stable">Stable</option>
              <option value="Discharged">Discharged</option>
              <option value="Under Observation">Under Observation</option>
            </select>
          </div>

          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
            <PersonIcon className="text-gray-400 mr-2" fontSize="small" />
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm"
            >
              <option value="">All Doctors</option>
              {doctors.map((doc, i) => (
                <option key={i} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          {(filterStatus || filterDoctor) && (
            <button
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => {
                setFilterStatus("");
                setFilterDoctor("");
              }}
            >
              <ClearIcon fontSize="small" />
              Clear filters
            </button>
          )}

          <div className="ml-auto">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <AddIcon fontSize="small" />
              Add Patient
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-500 text-sm font-medium">
                  <th className="p-4">Patient ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Room</th>
                  <th className="p-4">Doctor</th>
                  <th className="p-4">Nurse</th>
                  <th className="p-4">Treatment</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {/* Handle row click */ }}
                    >
                      <td className="p-4 font-medium text-gray-800">{p.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            {p.name.charAt(0)}
                          </div>
                          <span>{p.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{p.room}</td>
                      <td className="p-4 text-gray-600">{p.doctor}</td>
                      <td className="p-4 text-gray-600">{p.nurse}</td>
                      <td className="p-4 text-gray-600">{p.treatment}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${p.status === 'Critical' ? 'bg-red-100 text-red-700' :
                            p.status === 'Stable' ? 'bg-green-100 text-green-700' :
                              p.status === 'Discharged' ? 'bg-gray-100 text-gray-700' :
                                'bg-yellow-100 text-yellow-700'
                          }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="7">
                      <div className="flex flex-col items-center justify-center py-8">
                        <SearchIcon className="text-gray-300 mb-2" fontSize="large" />
                        <p className="text-lg">No patients found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;