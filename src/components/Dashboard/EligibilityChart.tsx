import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { TrendingUp, Target, Award } from 'lucide-react';
import { RootState } from '../../store';

interface EligibilityChartProps {
  eligibilityTrends: any;
}

const EligibilityChart: React.FC<EligibilityChartProps> = ({ eligibilityTrends }) => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  if (!eligibilityTrends) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Eligibility Overview
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Complete your profile to see your eligibility analysis
        </p>
      </div>
    );
  }

  const { eligible, partiallyEligible, totalSchemes, eligibilityRate, averageProbability, topCategory } = eligibilityTrends;

  const chartData = [
    {
      label: 'Fully Eligible',
      value: eligible,
      percentage: Math.round((eligible / totalSchemes) * 100),
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      label: 'Partially Eligible',
      value: partiallyEligible,
      percentage: Math.round((partiallyEligible / totalSchemes) * 100),
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      label: 'Not Eligible',
      value: totalSchemes - eligible - partiallyEligible,
      percentage: Math.round(((totalSchemes - eligible - partiallyEligible) / totalSchemes) * 100),
      color: 'bg-gray-400',
      textColor: 'text-gray-600'
    }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Eligibility Analysis
      </h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Eligibility Rate</p>
              <p className="text-2xl font-bold">{eligibilityRate}%</p>
            </div>
            <Target size={24} className="opacity-80" />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg. Probability</p>
              <p className="text-2xl font-bold">{averageProbability}%</p>
            </div>
            <TrendingUp size={24} className="opacity-80" />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Top Category</p>
              <p className="text-lg font-bold capitalize">{topCategory}</p>
            </div>
            <Award size={24} className="opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <div className="w-16 text-right">
              <span className={`text-sm font-medium ${item.textColor}`}>
                {item.value}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights */}
      <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Insights</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• You're eligible for {eligible} out of {totalSchemes} schemes</li>
          <li>• {partiallyEligible} schemes require minor adjustments</li>
          <li>• Your strongest category is {topCategory}</li>
          <li>• Consider updating your profile to improve eligibility</li>
        </ul>
      </div>
    </div>
  );
};

export default EligibilityChart;