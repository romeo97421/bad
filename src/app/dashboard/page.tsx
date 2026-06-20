'use client'

import { useEffect, useState } from 'react'
import { Activity, Mail, Phone, Calendar, TrendingUp } from 'lucide-react'
import StatCard from '@/components/StatCard'
import RecentActivityCard from '@/components/RecentActivityCard'

interface DashboardStats {
  totalEmails: number
  unreadEmails: number
  totalCalls: number
  upcomingEvents: number
  thisWeekActivity: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmails: 127,
    unreadEmails: 12,
    totalCalls: 45,
    upcomingEvents: 8,
    thisWeekActivity: 23,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          icon={<Mail className="w-6 h-6" />}
          title="Emails"
          value={stats.totalEmails}
          subtitle={`${stats.unreadEmails} unread`}
          color="blue"
        />
        <StatCard
          icon={<Phone className="w-6 h-6" />}
          title="Calls"
          value={stats.totalCalls}
          subtitle="This month"
          color="green"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          title="Events"
          value={stats.upcomingEvents}
          subtitle="Upcoming"
          color="purple"
        />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Activity"
          value={stats.thisWeekActivity}
          subtitle="This week"
          color="orange"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Growth"
          value="+12%"
          subtitle="vs last month"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityCard />
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-3">
            <a href="/dashboard/emails" className="block p-3 hover:bg-gray-50 rounded-lg transition text-blue-600 font-medium">
              📧 View Emails
            </a>
            <a href="/dashboard/calls" className="block p-3 hover:bg-gray-50 rounded-lg transition text-green-600 font-medium">
              📞 View Calls
            </a>
            <a href="/dashboard/calendar" className="block p-3 hover:bg-gray-50 rounded-lg transition text-purple-600 font-medium">
              📅 View Calendar
            </a>
            <a href="/dashboard/settings" className="block p-3 hover:bg-gray-50 rounded-lg transition text-gray-600 font-medium">
              ⚙️ Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
