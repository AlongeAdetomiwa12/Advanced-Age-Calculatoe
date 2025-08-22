import React, { useState, useRef, useEffect } from 'react'
import { User, Settings, Moon, Sun, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface AccountDropdownProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { user, userProfile, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      setHideTimeout(null)
    }
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setIsOpen(true)
      }, 200)
      setShowTimeout(timeout)
    }
  }

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout)
      setShowTimeout(null)
    }
    const timeout = setTimeout(() => {
      setIsOpen(false)
    }, 1000)
    setHideTimeout(timeout)
  }

  const handleDropdownEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      setHideTimeout(null)
    }
    if (showTimeout) {
      clearTimeout(showTimeout)
      setShowTimeout(null)
    }
    setIsOpen(true)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false)
    }, 1000)
    setHideTimeout(timeout)
  }

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsOpen(false)
  }

  const handleSettingsClick = () => {
    navigate('/settings')
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-purple-800 transition-colors"
      >
        {userProfile?.avatar_url ? (
          <img
            src={userProfile.avatar_url}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl z-50 animate-fadeIn"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {userProfile?.avatar_url ? (
                <img
                  src={userProfile.avatar_url}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-800">
                  {userProfile?.full_name || 'User'}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {userProfile?.role === 'admin' && (
                  <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full mt-1">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">Profile</span>
            </button>

            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">Settings</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
              <span className="text-gray-800">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountDropdown