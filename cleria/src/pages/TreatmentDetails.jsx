import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, Calendar, User, Hospital, Clipboard,
  Pill, AlertCircle, Phone, Bed
} from 'lucide-react';

// Simulate ICU admission check
const isInICU = () => {
  const admission = localStorage.getItem("icuAdmission");
  if (!admission) return null;

  const parsed = JSON.parse(admission);
  if (!parsed.dischargeDate) return parsed; // Currently admitted
  return null;
};

const TreatmentDetails = () => {
  const { id } = useParams();
  const icuStatus = isInICU();

  // Get treatment from localStorage
  const treatments = JSON.parse(localStorage.getItem('treatments') || '[]');
  const treatment = treatments.find(t => t.id === id);

  if (!treatment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Treatment not found</h1>
          <Link 
            to="/user-dashboard" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Generate treatment history if not exists
  if (!treatment.treatmentHistory) {
    treatment.treatmentHistory = [
      {
        session: 1,
        date: treatment.date,
        notes: "Initial assessment and first treatment session",
        progress: "Initial response to treatment",
        adjustments: "No major adjustments needed at this stage.",
        sideEffects: treatment.sideEffects || "None reported"
      }
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Link 
            to="/user-dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ChevronLeft className="mr-1" size={20} />
            Back to Dashboard
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Treatment Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{treatment.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              <span className="inline-flex items-center">
                <User className="mr-2" size={16} />
                {treatment.doctor}
              </span>
              <span className="inline-flex items-center">
                <Hospital className="mr-2" size={16} />
                {treatment.hospital}
              </span>
              <span className="inline-flex items-center">
                <Calendar className="mr-2" size={16} />
                {treatment.date}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                treatment.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                treatment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {treatment.status}
              </span>
              {treatment.status === 'Ongoing' && icuStatus && (
                <span className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                  <Bed className="mr-1" size={14} />
                  ICU Bed #{icuStatus.bedNumber}
                </span>
              )}
            </div>
          </div>

          {/* Treatment Content */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Overview */}
            <div className="lg:col-span-2 space-y-8">
              {/* Treatment History */}
              <div>
                <div className="flex items-center mb-4">
                  <Clipboard className="text-blue-600 mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-gray-800">Treatment History</h2>
                </div>
                <div className="space-y-4">
                  {treatment.treatmentHistory.map((session, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="bg-white p-4 rounded-lg shadow-xs">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">Session {session.session}</h3>
                          <span className="text-sm text-gray-500">{session.date}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium text-gray-700">Notes:</span> {session.notes}</p>
                          <p><span className="font-medium text-gray-700">Progress:</span> {session.progress}</p>
                          <p><span className="font-medium text-gray-700">Adjustments:</span> {session.adjustments}</p>
                          <p><span className="font-medium text-gray-700">Side Effects:</span> {session.sideEffects}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              {/* ICU Status (only for ongoing treatments) */}
              {treatment.status === 'Ongoing' && icuStatus && (
                <div className="bg-red-50 rounded-lg p-5 border border-red-100">
                  <div className="flex items-center mb-3">
                    <Bed className="text-red-600 mr-2" size={20} />
                    <h2 className="text-xl font-semibold text-gray-800">ICU Admission</h2>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700">Bed Number:</span> {icuStatus.bedNumber}</p>
                    <p><span className="font-medium text-gray-700">Admitted On:</span> {icuStatus.admissionDate}</p>
                    <p><span className="font-medium text-gray-700">Condition:</span> {icuStatus.reason || 'Critical care required'}</p>
                  </div>
                </div>
              )}

              {/* Side Effects */}
              <div className="bg-red-50 rounded-lg p-5 border border-red-100">
                <div className="flex items-center mb-3">
                  <AlertCircle className="text-red-600 mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-gray-800">Side Effects</h2>
                </div>
                {treatment.sideEffects ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {treatment.sideEffects.split(', ').map((effect, i) => (
                      <li key={i}>{effect}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No side effects reported.</p>
                )}
              </div>

              {/* Medications */}
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <div className="flex items-center mb-3">
                  <Pill className="text-purple-600 mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-gray-800">Prescribed Medications</h2>
                </div>
                {treatment.prescribedMedications?.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {treatment.prescribedMedications.map((med, i) => (
                      <li key={i}>{med}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No medications prescribed.</p>
                )}
              </div>

              {/* Next Review */}
              {treatment.status === 'Ongoing' && treatment.nextReviewDate && (
                <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                  <div className="flex items-center mb-3">
                    <Calendar className="text-green-600 mr-2" size={20} />
                    <h2 className="text-xl font-semibold text-gray-800">Next Review</h2>
                  </div>
                  <p className="text-gray-700">{treatment.nextReviewDate}</p>
                </div>
              )}

              {/* Contact */}
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <div className="flex items-center mb-3">
                  <Phone className="text-blue-600 mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-gray-800">Contact Doctor</h2>
                </div>
                <p className="text-gray-700">{treatment.doctor} - Available during hospital hours</p>
                <p className="text-gray-500 text-sm">93114-51097</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetails;
