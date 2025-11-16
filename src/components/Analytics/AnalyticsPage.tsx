import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Users,
  Calendar,
  PieChart,
  BarChart3,
  Activity
} from 'lucide-react';
import { RootState } from '../../store';
import { schemes } from '../../data/schemes';
import { predictEligibilityTrends } from '../../utils/eligibilityChecker';

const AnalyticsPage: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  const { savedSchemes } = useSelector((state: RootState) => state.scheme);

  const eligibilityTrends = user?.profile
    ? predictEligibilityTrends(schemes, user.profile)
    : null;

  // Mock analytics data
  const analyticsData = {
    applicationTrends: [
      { month: 'Jan', applications: 2, approvals: 1 },
      { month: 'Feb', applications: 3, approvals: 2 },
      { month: 'Mar', applications: 1, approvals: 1 },
      { month: 'Apr', applications: 4, approvals: 2 },
      { month: 'May', applications: 2, approvals: 1 },
      { month: 'Jun', applications: 3, approvals: 3 },
    ],
    categoryBreakdown: [
      { category: 'Agriculture', count: 8, percentage: 32 },
      { category: 'Education', count: 6, percentage: 24 },
      { category: 'Healthcare', count: 5, percentage: 20 },
      { category: 'Housing', count: 3, percentage: 12 },
      { category: 'Employment', count: 3, percentage: 12 },
    ],
    monthlyActivity: [
      { date: '2024-01-01', schemes_viewed: 15, applications: 2 },
      { date: '2024-01-02', schemes_viewed: 8, applications: 1 },
      { date: '2024-01-03', schemes_viewed: 12, applications: 0 },
      { date: '2024-01-04', schemes_viewed: 20, applications: 3 },
      { date: '2024-01-05', schemes_viewed: 6, applications: 1 },
    ]
  };

  const StatCard: React.FC<{
    icon: React.ElementType;
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    color: string;
  }> = ({ icon: Icon, title, value, change, changeType = 'neutral', color }) => (
    <motion.div
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {change && (
          <div className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' :
            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {title}
        </p>
      </div>
    </motion.div>
  );

  const ChartCard: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Analytics Dashboard
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Track your scheme application journey and eligibility insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Target}
          title="Eligible Schemes"
          value={eligibilityTrends?.eligible || 0}
          change="+12%"
          changeType="positive"
          color="bg-green-500"
        />
        <StatCard
          icon={Award}
          title="Applications Submitted"
          value={5}
          change="+2"
          changeType="positive"
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Approval Rate"
          value="80%"
          change="+5%"
          changeType="positive"
          color="bg-purple-500"
        />
        <StatCard
          icon={Users}
          title="Saved Schemes"
          value={savedSchemes.length}
          change="+3"
          changeType="positive"
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trends */}
        <ChartCard title="Application Trends">
          <div className="space-y-4">
            {analyticsData.applicationTrends.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.month}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.applications} Applied
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.approvals} Approved
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Category Breakdown */}
        <ChartCard title="Scheme Categories">
          <div className="space-y-3">
            {analyticsData.categoryBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.category}
                  </span>
                  <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Eligibility Analysis */}
      {eligibilityTrends && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Eligibility Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Eligibility Rate</p>
                  <p className="text-2xl font-bold">{eligibilityTrends.eligibilityRate}%</p>
                </div>
                <Target size={24} className="opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg. Probability</p>
                  <p className="text-2xl font-bold">{eligibilityTrends.averageProbability}%</p>
                </div>
                <TrendingUp size={24} className="opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Top Category</p>
                  <p className="text-lg font-bold capitalize">{eligibilityTrends.topCategory}</p>
                </div>
                <Award size={24} className="opacity-80" />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Key Insights
            </h4>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• You're eligible for {eligibilityTrends.eligible} out of {eligibilityTrends.totalSchemes} schemes</li>
              <li>• {eligibilityTrends.partiallyEligible} schemes require minor adjustments</li>
              <li>• Your strongest category is {eligibilityTrends.topCategory}</li>
              <li>• Consider updating your profile to improve eligibility</li>
            </ul>
          </div>
        </div>
      )}

      {/* Activity Timeline */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity
        </h3>
        
        <div className="space-y-4">
          {[
            { date: '2024-01-20', action: 'Applied for PM-KISAN scheme', type: 'application' },
            { date: '2024-01-18', action: 'Saved PMJAY scheme', type: 'save' },
            { date: '2024-01-15', action: 'Updated profile information', type: 'profile' },
            { date: '2024-01-12', action: 'Viewed 15 agriculture schemes', type: 'view' },
            { date: '2024-01-10', action: 'Completed eligibility assessment', type: 'assessment' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'application' ? 'bg-green-500' :
                activity.type === 'save' ? 'bg-blue-500' :
                activity.type === 'profile' ? 'bg-purple-500' :
                activity.type === 'view' ? 'bg-orange-500' : 'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activity.action}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;