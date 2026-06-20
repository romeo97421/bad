'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  color: 'blue' | 'green' | 'purple' | 'orange'
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Conference Room A',
      attendees: 8,
      color: 'blue',
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: '2024-01-20',
      time: '5:00 PM',
      location: 'Online',
      attendees: 3,
      color: 'red',
    },
    {
      id: '3',
      title: 'Client Call',
      date: '2024-01-22',
      time: '2:30 PM',
      location: 'Video Call',
      attendees: 2,
      color: 'green',
    },
    {
      id: '4',
      title: 'Conference',
      date: '2024-01-25',
      time: '9:00 AM',
      location: 'Downtown Convention Center',
      attendees: 150,
      color: 'purple',
    },
  ])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500 mt-1">Manage your events and schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {days.map((day) => (
              <div
                key={day}
                className="aspect-square p-2 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition"
              >
                <p className="text-sm font-medium text-gray-900">{day}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border ${getColorClass(event.color)}`}
              >
                <p className="font-medium text-sm mb-2">{event.title}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {event.attendees} attendees
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
