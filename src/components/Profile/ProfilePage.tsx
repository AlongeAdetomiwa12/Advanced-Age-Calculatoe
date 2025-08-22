import React, { useState } from 'react'
import { ArrowLeft, User, Camera, MapPin, Calendar, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { userProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="border-b border-purple-700/50 bg-purple-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-purple-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
            <h1 className="text-xl font-bold text-white">Profile</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile.avatar_url}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 bg-white text-purple-600 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {userProfile?.full_name || 'User'}
                </h2>
                <p className="text-purple-100 mb-2">{userProfile?.email}</p>
                {userProfile?.role === 'admin' && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                    Administrator
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium text-gray-800">
                        {userProfile?.full_name || 'Not set'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Country</p>
                      <p className="font-medium text-gray-800">
                        {userProfile?.country || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-medium text-gray-800">
                        {userProfile?.created_at 
                          ? new Date(userProfile.created_at).toLocaleDateString()
                          : 'Unknown'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Statistics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600">Total Calculations</p>
                        <p className="text-2xl font-bold text-green-800">0</p>
                      </div>
                      <Star className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600">Favorite Calculator</p>
                        <p className="text-lg font-semibold text-blue-800">Age Calculator</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600">Account Type</p>
                        <p className="text-lg font-semibold text-purple-800">Free</p>
                      </div>
                      <User className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage