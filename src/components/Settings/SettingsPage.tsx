import React, { useState } from 'react'
import { ArrowLeft, User, Settings as SettingsIcon, CreditCard, Smartphone, Cloud, BookOpen, FlaskRound as Flask } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const SettingsPage = () => {
  const navigate = useNavigate()
  const { userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal Settings', icon: User },
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'subscription', label: 'Subscription & Tokens', icon: CreditCard },
    { id: 'applications', label: 'Applications', icon: Smartphone },
    { id: 'cloud', label: 'Cloud', icon: Cloud },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'experimental', label: 'Experimental Features', icon: Flask }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Personal Settings</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Personal settings content will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include profile editing, avatar upload, and personal preferences.
              </p>
            </div>
          </div>
        )
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">General Settings</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">General settings content will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include language preferences, timezone settings, and notification preferences.
              </p>
            </div>
          </div>
        )
      case 'subscription':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Subscription & Tokens</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Subscription and token management will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include subscription status, payment methods, and API token management.
              </p>
            </div>
          </div>
        )
      case 'applications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Applications</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Application settings will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include connected apps, API integrations, and third-party services.
              </p>
            </div>
          </div>
        )
      case 'cloud':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Cloud Settings</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Cloud settings will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include cloud storage preferences, sync settings, and backup options.
              </p>
            </div>
          </div>
        )
      case 'knowledge':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Knowledge Base</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Knowledge base settings will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include learning preferences, tutorial settings, and help documentation.
              </p>
            </div>
          </div>
        )
      case 'experimental':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Experimental Features</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Experimental features will be implemented here.</p>
              <p className="text-sm text-gray-500 mt-2">
                This will include beta features, AI integrations, and advanced calculator options.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

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
            <h1 className="text-xl font-bold text-white">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage