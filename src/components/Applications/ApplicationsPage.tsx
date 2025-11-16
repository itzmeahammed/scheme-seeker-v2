import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  ExternalLink,
  Download,
  Eye
} from 'lucide-react';
import { RootState } from '../../store';

interface Application {
  id: string;
  schemeName: string;
  schemeId: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  appliedDate: string;
  lastUpdated: string;
  applicationNumber: string;
  documents: string[];
  remarks?: string;
}

const ApplicationsPage: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'under_review'>('all');

  // Mock applications data
  const applications: Application[] = [
    {
      id: '1',
      schemeName: 'Pradhan Mantri Kisan Samman Nidhi',
      schemeId: 'PM-KISAN',
      status: 'approved',
      appliedDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      applicationNumber: 'PMK2024001234',
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
      remarks: 'Application approved. First installment credited to your account.'
    },
    {
      id: '2',
      schemeName: 'Pradhan Mantri Jan Arogya Yojana',
      schemeId: 'PMJAY',
      status: 'under_review',
      appliedDate: '2024-01-10',
      lastUpdated: '2024-01-18',
      applicationNumber: 'PMJAY2024005678',
      documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
      remarks: 'Document verification in progress.'
    },
    {
      id: '3',
      schemeName: 'National Scholarship Portal',
      schemeId: 'NSP',
      status: 'pending',
      appliedDate: '2024-01-05',
      lastUpdated: '2024-01-05',
      applicationNumber: 'NSP2024009876',
      documents: ['Aadhaar Card', 'Income Certificate', 'Academic Records']
    },
    {
      id: '4',
      schemeName: 'Pradhan Mantri Awas Yojana - Urban',
      schemeId: 'PMAY-U',
      status: 'rejected',
      appliedDate: '2023-12-20',
      lastUpdated: '2024-01-08',
      applicationNumber: 'PMAY2023054321',
      documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents'],
      remarks: 'Income exceeds eligibility criteria. You can reapply after income verification.'
    },
    {
      id: '5',
      schemeName: 'Pradhan Mantri Ujjwala Yojana',
      schemeId: 'PMUY',
      status: 'approved',
      appliedDate: '2023-12-15',
      lastUpdated: '2023-12-25',
      applicationNumber: 'PMUY2023012345',
      documents: ['Aadhaar Card', 'BPL Card', 'Bank Account'],
      remarks: 'LPG connection approved. Contact your nearest distributor.'
    }
  ];

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      case 'under_review':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <Clock className="text-blue-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'rejected':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'under_review':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'under_review':
        return 'Under Review';
      default:
        return 'Pending';
    }
  };

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    under_review: applications.filter(app => app.status === 'under_review').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Applications
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Track the status of your scheme applications
        </p>
      </div>

      {/* Status Filter */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex flex-wrap gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-orange-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="capitalize">{status.replace('_', ' ')}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                filter === status
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application, index) => (
          <motion.div
            key={application.id}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
              border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={20} />
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {application.schemeName}
                  </h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Application No: {application.applicationNumber}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Applied: {new Date(application.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  <span className="text-sm font-medium">
                    {getStatusText(application.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Submitted Documents:
              </h4>
              <div className="flex flex-wrap gap-2">
                {application.documents.map((doc, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Remarks */}
            {application.remarks && (
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Remarks:
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {application.remarks}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-blue-400 hover:bg-blue-900/20' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}>
                <Eye size={14} />
                <span>View Details</span>
              </button>
              
              <button className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-green-400 hover:bg-green-900/20' 
                  : 'text-green-600 hover:bg-green-50'
              }`}>
                <Download size={14} />
                <span>Download</span>
              </button>
              
              <button className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-orange-400 hover:bg-orange-900/20' 
                  : 'text-orange-600 hover:bg-orange-50'
              }`}>
                <ExternalLink size={14} />
                <span>Track Status</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 shadow-lg text-center`}>
          <FileText className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No Applications Found
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            {filter === 'all' 
              ? "You haven't applied for any schemes yet." 
              : `No applications with ${filter.replace('_', ' ')} status.`}
          </p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Browse Schemes
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;