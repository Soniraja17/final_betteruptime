 
import React, { useEffect, useReducer, useState } from 'react';
 import Link from 'next/link';
import { 
  Monitor, 
  Plus, 
  Settings, 
  Bell, 
  User, 
  LogOut,
  Globe,
  Clock,
  Activity,
  X,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import axios from 'axios';
 
import {BACKEND_URL} from '@/lib/utils';

import Router, { useRouter } from 'next/navigation';
 
interface Website {
  id: string;
  // name: string;
  url: string;
  status: 'up' | 'down';
  // uptime: string;
  responseTime: string;
  lastChecked: string;
}

function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([
    
  ]);

const router=useRouter()


  const [showAddModal, setShowAddModal] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    url: '',
  });
 
  
const fetchWebsites = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/websites`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setWebsites(
      response.data.websites.map((w: any) => ({
        id: w.id,
        url: w.url,
        status: w.ticks?.[0]?.status === "UP" ? "up" : w.ticks?.[0] ? "down" : "checking",
        responseTime: w.ticks?.[0]?.response_time_ms ? `${w.ticks[0].response_time_ms}ms` : "0ms",
        lastChecked: w.ticks?.[0]?.createdAt || Date.now().toString(),
      }))
    );
  } catch (error) {
    console.error("Failed to fetch websites:", error);
  }
};

// Run on first load
useEffect(() => {
  setInterval(()=>{
    fetchWebsites();
  },3000)
     
   
}, []);



 

  const handleAddWebsite = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newWebsite.url) {
      alert('Please fill in all fields');
      return;
    }

  

    const response= await  axios.post(`${BACKEND_URL}/website`,{
      url: newWebsite.url

    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })

    
    
    await fetchWebsites();
     
    setNewWebsite({   url: '' });
    setShowAddModal(false);
  };
  const handleManualRefresh = () => {
    fetchWebsites();
  };

  const handleDeleteWebsite = (id: string) => {
    if (confirm('Are you sure you want to delete this website?')) {
      setWebsites(websites.filter(site => site.id !== id));
    }
  };

  const upWebsites = websites.filter(site => site.status === 'up').length;
  const downWebsites = websites.filter(site => site.status === 'down').length;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Monitor className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">UptimeWatch</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-blue-400 font-medium">Dashboard</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Incidents</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Reports</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Settings</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </button>
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Websites</p>
                <p className="text-2xl font-bold text-white">{websites.length}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Up</p>
                <p className="text-2xl font-bold text-green-400">{upWebsites}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Down</p>
                <p className="text-2xl font-bold text-red-400">{downWebsites}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Websites Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Monitored Websites</h2>
            <button
                onClick={handleManualRefresh}
                className="bg-gray-700 ml-100 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <span>Refresh</span>
              </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Website</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Uptime
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Checked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {websites.map((website) => (
                  <tr key={website.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                      
                        <div className="text-sm text-gray-400 flex items-center">
                          <ExternalLink onClick={() => router.push(`website/${website.id}`)} className="w-3 h-3 mr-1" />
                          {website.url}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        website.status === 'up' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-red-900 text-red-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1.5 ${
                          website.status === 'up' ? 'bg-green-400' : 'bg-red-400'
                        }`}></span>
                        {website.status === 'up' ? 'Up' : 'Down'}
                      </span> */}
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          website.status === 'up' 
                            ? 'bg-green-900 text-green-300' 
                            : website.status === 'down'
                            ? 'bg-red-900 text-red-300'
                            : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${
                            website.status === 'up' 
                              ? 'bg-green-400' 
                              : website.status === 'down'
                              ? 'bg-red-400'
                              : 'bg-yellow-400'
                          } ${website.status === 'up' ? 'animate-pulse' : ''}`}>
        
                          </span>
                          {website.status === 'up' ? 'Up' : website.status === 'down' ? 'Down' : 'Checking'}
                        </span>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {website.uptime}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                     
                      {website.responseTime}
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {website.lastChecked}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-400 transition-colors">
                          <Edit   onClick={() => router.push(`website/${website.id}`)}  className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteWebsite(website.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Add New Website</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddWebsite} className="p-6 space-y-4">
              {/* <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Website Name
                </label>
                <input
                  type="text"
                  id="name"
                  // value={newWebsite.name}
                  onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Website"
                  required
                />
              </div> */}
              
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;





 