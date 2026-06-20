'use client'

import { useState } from 'react'
import { Phone, PhoneOff, Clock, User } from 'lucide-react'

interface Call {
  id: string
  contact: string
  duration: string
  date: string
  type: 'incoming' | 'outgoing' | 'missed'
  avatar: string
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([
    {
      id: '1',
      contact: 'Alice Johnson',
      duration: '12:34',
      date: 'Today 2:30 PM',
      type: 'outgoing',
      avatar: '👩',
    },
    {
      id: '2',
      contact: 'Bob Smith',
      duration: '5:12',
      date: 'Yesterday 10:15 AM',
      type: 'incoming',
      avatar: '👨',
    },
    {
      id: '3',
      contact: 'Carol White',
      duration: '0:00',
      date: 'Yesterday 3:45 PM',
      type: 'missed',
      avatar: '👩',
    },
    {
      id: '4',
      contact: 'David Brown',
      duration: '25:18',
      date: '2 days ago 11:00 AM',
      type: 'incoming',
      avatar: '👨',
    },
  ])

  const getTypeColor = (type: 'incoming' | 'outgoing' | 'missed') => {
    switch (type) {
      case 'incoming':
        return 'text-green-600'
      case 'outgoing':
        return 'text-blue-600'
      case 'missed':
        return 'text-red-600'
    }
  }

  const getTypeLabel = (type: 'incoming' | 'outgoing' | 'missed') => {
    switch (type) {
      case 'incoming':
        return 'Incoming'
      case 'outgoing':
        return 'Outgoing'
      case 'missed':
        return 'Missed'
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calls</h1>
        <p className="text-gray-500 mt-1">View your call history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center">
          <p className="text-gray-500 mb-2">Total Calls</p>
          <p className="text-3xl font-bold text-gray-900">{calls.length}</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-gray-500 mb-2">Average Duration</p>
          <p className="text-3xl font-bold text-gray-900">10:55</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-gray-500 mb-2">Missed Calls</p>
          <p className="text-3xl font-bold text-red-600">1</p>
        </div>
      </div>

      <div className="card">
        <div className="divide-y">
          {calls.map((call) => (
            <div
              key={call.id}
              className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">{call.avatar}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{call.contact}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span
                      className={`text-xs font-medium ${getTypeColor(
                        call.type
                      )}`}
                    >
                      {getTypeLabel(call.type)}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {call.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{call.date}</p>
                <div className="flex gap-2 mt-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <PhoneOff className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
