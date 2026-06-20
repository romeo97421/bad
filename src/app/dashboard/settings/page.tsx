'use client'

import { useState } from 'react'
import { Bell, Lock, User, Globe, Moon, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

interface Settings {
  emailNotifications: boolean
  pushNotifications: boolean
  darkMode: boolean
  language: string
  timezone: string
  twoFactorAuth: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    twoFactorAuth: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }))
  }

  const handleSelectChange = (
    key: keyof Settings,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="w-5 h-5 rounded border-gray-300"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
                className="w-5 h-5 rounded border-gray-300"
              />
            </label>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST (UTC-5)</option>
                <option value="CST">CST (UTC-6)</option>
                <option value="PST">PST (UTC-8)</option>
                <option value="CET">CET (UTC+1)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Two-Factor Authentication</span>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
                className="w-5 h-5 rounded border-gray-300"
              />
            </label>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Change Password
            </button>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Edit Profile
            </button>
            <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full btn-primary disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
