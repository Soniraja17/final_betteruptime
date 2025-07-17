"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
import { 
  Monitor, 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Activity, 
  Globe,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface StatusTick {
  id: string;
  status: 'UP' | 'DOWN';
  response_time_ms?: number;
  createdAt: string;
}

interface Website {
  id: string;
  url: string;
  ticks: StatusTick[];
}

function WebsiteDetails() {
  const params = useParams();
  const websiteId = params.websiteid as string;
  
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/status/${websiteId}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        
        setWebsite(response.data.website);
      } catch (error) {
        console.error("Failed to fetch website details:", error);
        setError("Failed to load website details");
      } finally {
        setLoading(false);
      }
    };

    if (websiteId) {
      fetchWebsiteDetails();
    }
  }, [websiteId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading website details...</p>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Website Not Found</h1>
          <p className="text-gray-400 mb-4">{error || "The requested website could not be found."}</p>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Get the latest tick for current status
  const latestTick = website.ticks[0];
  const currentStatus = latestTick ? (latestTick.status === "UP" ? "up" : "down") : "checking";
  const responseTime = latestTick?.response_time_ms ? `${latestTick.response_time_ms}ms` : "N/A";
  const lastChecked = latestTick ? new Date(latestTick.createdAt).toLocaleString() : "Never";
  
  // Get last 5 ticks for history
  const last5Ticks = website.ticks.slice(0, 5);
  
  // Calculate uptime percentage from last 5 ticks
  const upTicks = last5Ticks.filter(tick => tick.status === "UP").length;
  const uptimePercentage = last5Ticks.length > 0 ? ((upTicks / last5Ticks.length) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Monitor className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-white">UptimeWatch</span>
              </div>
            </div>
            
            <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Website Info */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Website Details</h1>
              <div className="flex items-center text-gray-400 mb-4">
                <ExternalLink className="w-4 h-4 mr-2" />
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {website.url}
                </a>
              </div>
            </div>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              currentStatus === 'up' 
                ? 'bg-green-900 text-green-300' 
                : currentStatus === 'down'
                ? 'bg-red-900 text-red-300'
                : 'bg-yellow-900 text-yellow-300'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                currentStatus === 'up' ? 'bg-green-400' : 
                currentStatus === 'down' ? 'bg-red-400' : 'bg-yellow-400'
              }`}></span>
              {currentStatus === 'up' ? 'Online' : 
               currentStatus === 'down' ? 'Offline' : 'Checking'}
            </span>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Uptime (Last 5 checks)</p>
                  <p className="text-2xl font-bold text-white">{uptimePercentage}%</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Response Time</p>
                  <p className="text-2xl font-bold text-white">{responseTime}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Last Checked</p>
                  <p className="text-lg font-bold text-white">{lastChecked}</p>
                </div>
                <Globe className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Status History - Last 5 Ticks */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Last 5 Status Checks</h2>
            <p className="text-gray-400 text-sm mt-1">Recent monitoring activity</p>
          </div>
          
          <div className="p-6">
            {/* Visual Status Timeline */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-sm text-gray-400 mr-4">Latest</span>
              {last5Ticks.map((tick, index) => (
                <div
                  key={tick.id}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    tick.status === 'UP' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  title={`${new Date(tick.createdAt).toLocaleString()} - ${tick.status === 'UP' ? 'Online' : 'Offline'}${tick.response_time_ms ? ` (${tick.response_time_ms}ms)` : ''}`}
                >
                  {tick.status === 'UP' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <XCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              ))}
              <span className="text-sm text-gray-400 ml-4">Oldest</span>
            </div>
            
            {/* Detailed Status List */}
            <div className="space-y-3">
              {last5Ticks.map((tick) => (
                <div 
                  key={tick.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {tick.status === 'UP' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <span className={`font-medium ${
                        tick.status === 'UP' ? 'text-green-300' : 'text-red-300'
                      }`}>
                        {tick.status === 'UP' ? 'Online' : 'Offline'}
                      </span>
                      <p className="text-gray-400 text-sm">{new Date(tick.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {tick.response_time_ms && (
                    <div className="text-right">
                      <p className="text-white font-medium">{tick.response_time_ms}ms</p>
                      <p className="text-gray-400 text-sm">Response time</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebsiteDetails;