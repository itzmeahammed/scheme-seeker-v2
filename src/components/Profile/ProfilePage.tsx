import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Users,
  DollarSign,
  Save,
  Edit,
  Camera
} from 'lucide-react';
import { RootState } from '../../store';
import { updateProfile } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.ui);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.profile.age || 25,
    income: user?.profile.income || 300000,
    location: user?.profile.location || 'Urban',
    occupation: user?.profile.occupation || 'Student',
    category: user?.profile.category || 'General',
    educationLevel: user?.profile.educationLevel || 'Graduate',
    familySize: user?.profile.familySize || 3,
    hasDisability: user?.profile.hasDisability || false,
    landOwnership: user?.profile.landOwnership || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSave = () => {
    if (user) {
      dispatch(updateProfile({
        ...user,
        name: formData.name,
        email: formData.email,
        profile: {
          ...user.profile,
          age: formData.age,
          income: formData.income,
          location: formData.location,
          occupation: formData.occupation,
          category: formData.category,
          educationLevel: formData.educationLevel,
          familySize: formData.familySize,
          hasDisability: formData.hasDisability,
          landOwnership: formData.landOwnership,
        }
      }));

      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated',
        timestamp: new Date().toISOString(),
      }));

      setIsEditing(false);
    }
  };

  const ProfileField: React.FC<{
    icon: React.ElementType;
    label: string;
    name: string;
    type?: string;
    options?: string[];
    value: any;
  }> = ({ icon: Icon, label, name, type = 'text', options, value }) => (
    <div className="space-y-2">
      <label className={`flex items-center space-x-2 text-sm font-medium ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <Icon size={16} />
        <span>{label}</span>
      </label>
      {isEditing ? (
        options ? (
          <select
            name={name}
            value={value}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {value ? 'Yes' : 'No'}
            </span>
          </label>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
        )
      ) : (
        <p className={`px-3 py-2 rounded-lg ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
          {type === 'checkbox' ? (value ? 'Yes' : 'No') : 
           name === 'income' ? `₹${value.toLocaleString()}` : value}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name}
              </h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {user?.email}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Member since {new Date(user?.createdAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {isEditing ? <Save size={16} /> : <Edit size={16} />}
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField
            icon={User}
            label="Full Name"
            name="name"
            value={formData.name}
          />
          
          <ProfileField
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
          />
          
          <ProfileField
            icon={User}
            label="Age"
            name="age"
            type="number"
            value={formData.age}
          />
          
          <ProfileField
            icon={DollarSign}
            label="Annual Income"
            name="income"
            type="number"
            value={formData.income}
          />
          
          <ProfileField
            icon={MapPin}
            label="Location"
            name="location"
            options={['Urban', 'Rural']}
            value={formData.location}
          />
          
          <ProfileField
            icon={Briefcase}
            label="Occupation"
            name="occupation"
            options={['Student', 'Farmer', 'Teacher', 'Engineer', 'Doctor', 'Business', 'Government Employee', 'Private Employee', 'Self Employed', 'Unemployed', 'Retired']}
            value={formData.occupation}
          />
          
          <ProfileField
            icon={Users}
            label="Category"
            name="category"
            options={['General', 'SC', 'ST', 'OBC', 'EWS']}
            value={formData.category}
          />
          
          <ProfileField
            icon={GraduationCap}
            label="Education Level"
            name="educationLevel"
            options={['Below 10th', '10th', '12th', 'Graduate', 'Post-Graduate', 'PhD']}
            value={formData.educationLevel}
          />
          
          <ProfileField
            icon={Users}
            label="Family Size"
            name="familySize"
            type="number"
            value={formData.familySize}
          />
          
          <div className="space-y-4">
            <ProfileField
              icon={User}
              label="Has Disability"
              name="hasDisability"
              type="checkbox"
              value={formData.hasDisability}
            />
            
            <ProfileField
              icon={MapPin}
              label="Land Ownership"
              name="landOwnership"
              type="checkbox"
              value={formData.landOwnership}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Completion */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Profile Completion
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Profile Completeness
            </span>
            <span className="font-medium text-green-600">85%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete your profile to get better scheme recommendations
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;