// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div >
//        <Button>hi there</Button>
//     </div>
//   );

// }

"use client"


 
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
 
 
import React, { useState } from 'react';
import Link from 'next/link';
import {  AlertCircle, CheckCircle, Clock, Eye, EyeOff, Plus } from 'lucide-react';

import { 
  Monitor, 
  Menu, 
  X, 
  ArrowRight, 
  Play, 
  Activity, 
  Bell, 
  Globe, 
  Shield, 
  Zap, 
  BarChart3,
  Check,
  Star,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Header Component
function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
  const router=useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Monitor className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-white">UptimeWatch</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#Demo" className="text-gray-300 hover:text-blue-400 transition-colors">Demo</a>
            <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button  onClick={()=>{
                router.push("/signin")
              }} className="text-gray-300 hover:text-blue-400 transition-colors">
              Sign In
            </button>
            <button  onClick={()=>{
                router.push("/signup")
              }}className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-4 py-2 space-y-1">
            <a href="#Demo" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Demo</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Pricing</a>
            <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-blue-400">About</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Contact</a>
            <div className="flex flex-col space-y-2 px-3 py-2">
              <button onClick={()=>{
                router.push("/signin")
              }} className="text-left text-gray-300 hover:text-blue-400">Sign In</button>
              <button onClick={()=>{
                router.push("/signup")
              }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Hero Component
function Hero() {
  const router=useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            99.9% Uptime Guaranteed
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Monitor Your Website's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Uptime & Performance
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant alerts when your website goes down. Monitor performance, track uptime, and ensure your business stays online 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button 
            onClick={()=>{

              router.push("/signup")
            }}

            className="group bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />

            </button>
            
            <button 
            onClick={() => document.getElementById("Demo")?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow border border-gray-600">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="text-lg font-medium">Watch Demo</span>
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Component
// function Features() {
//   const features = [
//     {
//       icon: Activity,
//       title: 'Real-time Monitoring',
//       description: 'Monitor your websites and APIs every 30 seconds from multiple locations worldwide.',
//       color: 'bg-blue-500'
//     },
//     {
//       icon: Bell,
//       title: 'Instant Alerts',
//       description: 'Get notified via email, SMS, Slack, or webhook the moment your site goes down.',
//       color: 'bg-green-500'
//     },
//     {
//       icon: Globe,
//       title: 'Global Network',
//       description: 'Monitor from 15+ locations worldwide to ensure global accessibility.',
//       color: 'bg-purple-500'
//     },
//     {
//       icon: Shield,
//       title: 'SSL Monitoring',
//       description: 'Track SSL certificate expiration dates and get alerts before they expire.',
//       color: 'bg-orange-500'
//     },
//     {
//       icon: Zap,
//       title: 'Performance Tracking',
//       description: 'Monitor response times, page load speeds, and overall performance metrics.',
//       color: 'bg-red-500'
//     },
//     {
//       icon: BarChart3,
//       title: 'Detailed Analytics',
//       description: 'Get comprehensive reports and insights about your website performance.',
//       color: 'bg-indigo-500'
//     }
//   ];

//   return (
//     <section id="features" className="py-20 bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Everything You Need to Monitor Your Website
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Comprehensive monitoring tools to keep your website running smoothly and your users happy.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="group p-8 rounded-xl border border-gray-700 bg-gray-800 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
//             >
//               <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                 <feature.icon className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
//               <p className="text-gray-300 leading-relaxed">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////



function AddWebsiteModal({ isOpen, onClose, onAdd }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (website: any) => void;
}) {
  const [url, setUrl] = useState('');
  // const [name, setName] = useState('');
  // const [interval, setInterval] = useState('5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      const newWebsite = {
        id: Date.now(),
       
        url,
        status: 'up',
        responseTime: Math.floor(Math.random() * 500) + 200,
        uptime: 99.9,
        lastChecked: new Date(),
      
      };
      onAdd(newWebsite);
      setUrl('');
    
      setInterval('5');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Add Website to Monitor</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Website"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Check Interval
            </label>
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Every 1 minute</option>
              <option value="5">Every 5 minutes</option>
              <option value="10">Every 10 minutes</option>
              <option value="30">Every 30 minutes</option>
            </select>
          </div> */}
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
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
  );
}

// Website Status Card Component
function WebsiteStatusCard({ website, onDelete }: { 
  website: any; 
  onDelete: (id: number) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up': return <CheckCircle className="w-5 h-5" />;
      case 'down': return <AlertCircle className="w-5 h-5" />;
      case 'warning': return <Clock className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`${getStatusColor(website.status)}`}>
            {getStatusIcon(website.status)}
          </div>
          <div>
            <h3 className="text-base font-medium text-white">{website.name}</h3>
            <p className="text-gray-400 text-xs">{website.url}</p>
          </div>
        </div>
        <button 
          onClick={() => onDelete(website.id)}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {website.responseTime}ms
          </div>
          <div className="text-xs text-gray-400">Response</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-500">
            {website.uptime}%
          </div>
          <div className="text-xs text-gray-400">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-500">
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
                          {website.status === 'up' ? 'online' : website.status === 'down' ? 'offline' : 'Checking'}
                        </span>
            
            
          </div>
          <div className="text-xs text-gray-400">Status</div>
        </div>
      </div>
    </div>
  );
}

// Demo Dashboard Component
function DemoSection() {
  const [websites, setWebsites] = useState([
    {
      id: 1,
      // name: 'My E-commerce Store',
      url: 'https://mystore.com',
      status: 'up',
      responseTime: 245,
      uptime: 99.9,
      lastChecked: new Date(),
      // interval: 5
    },
    {
      id: 2,
      // name: 'Company Blog',
      url: 'https://blog.company.com',
      status: 'up',
      responseTime: 189,
      uptime: 99.7,
      lastChecked: new Date(),
      // interval: 10
    },
    {
      id: 3,
      // name: 'API Endpoint',
      url: 'https://api.service.com',
      status: 'warning',
      responseTime: 1245,
      uptime: 98.5,
      lastChecked: new Date(),
      // interval: 1
    }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);

  const addWebsite = (website: any) => {
    setWebsites([...websites, website]);
  };

  const deleteWebsite = (id: number) => {
    setWebsites(websites.filter(w => w.id !== id));
  };

  const totalUptime = websites.length > 0 
    ? (websites.reduce((sum, w) => sum + w.uptime, 0) / websites.length).toFixed(1)
    : '0.0';

  const avgResponseTime = websites.length > 0
    ? Math.floor(websites.reduce((sum, w) => sum + w.responseTime, 0) / websites.length)
    : 0;

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium mb-6">
            <Play className="w-4 h-4 mr-2" />
            Interactive Demo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See UptimeWatch in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Try our monitoring dashboard below. Add websites, see their status, and experience how easy it is to keep your sites monitored.
          </p>
        </div>

        {/* Demo Dashboard */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Your Websites</h3>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Site
            </button>
          </div>

          {/* Website Cards */}
          {websites.length > 0 ? (
            <div className="space-y-3">
              {websites.map((website) => (
                <WebsiteStatusCard 
                  key={website.id} 
                  website={website} 
                  onDelete={deleteWebsite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Monitor className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No websites yet</h3>
              <p className="text-gray-500 mb-4">Add your first website to start monitoring</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Website
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-900/20 text-yellow-300 rounded-lg text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            This is a demo dashboard. Real monitoring starts with your free trial.
          </div>
        </div>
      </div>

      <AddWebsiteModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addWebsite}
      />
    </section>
  );
}













// Pricing Component
function Pricing() {
  const router=useRouter();
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: 'per month',
      description: 'Perfect for small websites and personal projects',
      features: [
        'Monitor up to 5 websites',
        '5-minute check intervals',
        'Email alerts',
        'Basic reporting',
        '30-day data retention'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'Ideal for growing businesses and agencies',
      features: [
        'Monitor up to 25 websites',
        '1-minute check intervals',
        'Email, SMS & Slack alerts',
        'Advanced reporting',
        '1-year data retention',
        'SSL monitoring',
        'Multiple team members'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For large organizations with complex needs',
      features: [
        'Monitor unlimited websites',
        '30-second check intervals',
        'All notification channels',
        'Custom reporting',
        'Unlimited data retention',
        'White-label reports',
        'Priority support',
        'API access'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              } ${plan.popular ? 'border-blue-500' : 'border-gray-700'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
              onClick={()=>{
                router.push("/signup")
              }}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            All plans include 24/7 support and 99.9% uptime guarantee
          </p>
          <button className="text-blue-400 hover:text-blue-300 font-medium">
            Compare all features →
          </button>
        </div>
      </div>
    </section>
  );
}

// Testimonials Component
function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechStartup',
      content: 'UptimeWatch has been a game-changer for our business. We caught several issues before our customers even noticed them.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Michael Chen',
      role: 'DevOps Engineer, ScaleUp',
      content: 'The alerting system is incredibly reliable. We get notified within seconds of any downtime, which is crucial for our e-commerce platform.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, DigitalAgency',
      content: 'Managing multiple client websites is so much easier now. The dashboard gives us a clear overview of all our monitoring needs.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands of Businesses
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear what our customers have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-700"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Component
function CTA() {
  const router=useRouter();
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Monitor Your Website?
        </h2>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses that trust UptimeWatch to keep their websites running smoothly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
          onClick={()=>{
            router.push("/signup")
          }}
          className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Schedule Demo
          </button>
        </div>
        
        <p className="text-blue-200 mt-6 text-sm">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">UptimeWatch</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Monitor your website's uptime and performance with our reliable monitoring service. Get instant alerts and detailed analytics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status Page</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 UptimeWatch. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

 



// Main App Component
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <div id="Demo">
      <DemoSection/>

      </div>
      {/* <Features /> */}
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
