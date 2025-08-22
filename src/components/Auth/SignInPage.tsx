import React, { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Calculator, ArrowLeft } from 'lucide-react'

const SignInPage = () => {
  const { user, loading } = useAuth()
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleCustomAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="border-b border-purple-700/50 bg-purple-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="w-8 h-8 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Advanced Calculator Suite</h1>
            </div>
            <a
              href="/"
              className="flex items-center space-x-2 text-purple-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {showCustomForm ? (isSignUp ? 'Create Account' : 'Sign In') : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {showCustomForm 
                  ? (isSignUp ? 'Create your account to get started' : 'Sign in to your account')
                  : 'Choose your preferred sign-in method'
                }
              </p>
            </div>

            {!showCustomForm ? (
              <div className="space-y-4">
                {/* Supabase Auth UI for Google/GitHub */}
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: '#7c3aed',
                          brandAccent: '#6d28d9',
                        },
                      },
                    },
                  }}
                  providers={['google', 'github']}
                  onlyThirdPartyProviders
                  redirectTo={window.location.origin}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCustomForm(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Continue with Email
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomAuth} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {authLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-purple-600 hover:text-purple-700 text-sm"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="w-full text-gray-600 hover:text-gray-700 text-sm"
                >
                  ← Back to other options
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage