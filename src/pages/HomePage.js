import React from 'react';

import { Mail, Phone, Linkedin, Github, FileText, Zap, Code, Target } from 'lucide-react';

const HomePage = () => { // Component renamed to HomePage
  const contactLinks = [
    { icon: Mail, text: 'Email', href: 'mailto:phanikumar.bhamidipati@gmail.com', title: 'Email' },
    { icon: Phone, text: '(832)-540-4139', href: 'tel:+18325404139', title: 'Phone' },
    { icon: Linkedin, text: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/phanibhamidipati/', title: 'LinkedIn' },
    { icon: Github, text: 'Professional Repos', href: 'https://github.com/phanikum', title: 'GitHub' },
    { icon: FileText, text: 'Download Resume (PDF)', href: `${process.env.PUBLIC_URL}/PhaniBhamidipati.pdf`, title: 'Resume' },
  ];

  const projects = [
    {
      title: '🧠 SmartyQuest',
      whatItIs: 'SmartyQuest is an engaging and educational quiz platform designed for children aged 8–12, featuring fun, engaging questions about science, nature, and the world. The application is built using the React framework to deliver a fast, responsive, and interactive user experience across modern browsers and devices. The platform\'s primary goal is to make learning accessible and entertaining through dynamic content delivery.',
      whyIBuiltIt: 'The project\'s technical architecture is a direct experiment in Generative AI integration and Cloud-Native scaling. Content is dynamically sourced from GPT-4o, processed for safety and age-appropriateness, and then stored in an AWS S3 bucket. This serverless data pipeline demonstrates key executive priorities: cost optimization (near-zero idle costs), massive scalability (decoupling content generation from runtime), and the ability to establish MLOps patterns for reliably and securely integrating third-party LLM services into a production environment.',
      stack: 'React, Modern Web Technologies', 
      status: 'Live & Interactive (Sep 2025)',
      demoLink: '#/smartyquest',
    },
    {
      title: '🏪 App Mart (Digital Marketplace)',
      whatItIs: 'A digital marketplace for discovering and exploring various applications and tools. Currently under development with plans for a comprehensive app discovery platform. The catalog is static and loaded from a JSON file.',
      whyIBuiltIt: 'I built this to demonstrate modern e-commerce and marketplace design patterns. It serves as a testing ground for exploring React component architecture, state management, and user interface design principles that could be applied to larger-scale marketplace applications.',
      stack: 'React',
      status: 'Under Development (Sep 2025)',
      demoLink: '#/appmart',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden p-6 sm:p-10 border border-gray-200">
        
        {/* --- HEADER / ABOUT --- */}
        <header className="pb-8 border-b border-gray-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-1">
            Phani Bhamidipati
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mt-2 flex items-center">
            <Zap className="w-6 h-6 mr-2" />
             Senior Engineering Leader | Builder of High-Performance Organizations | Leading Global Subscription Systems and Gen AI Integration
          </h2>
          
          <p className="text-gray-600 mt-4 leading-relaxed">
            <span className="text-2xl mr-2">👋</span> 
            I'm a technology leader with <strong>20+ years of experience</strong> building global engineering organizations and
             delivering high-impact, scalable products. My expertise spans building high-performance distributed systems, leading multi-year
              cloud transformations, launching 0-1 flagship products in a high pace environment  and growing senior talent. I am currently 
              focused on defining and implementing critical technology that powers discovery, monetization, engagement and retention of
              a new customer facing product powered by <strong>Gen AI</strong>.
          </p>
        </header>

        {/* --- PROFESSIONAL FOCUS --- */}
        <section className="py-8 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Professional Focus & Expertise
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow-md border border-purple-200">
              <p className="font-semibold text-lg text-purple-800 mb-3">Leadership & Strategy</p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-gray-700">
                <li>Organizational Design, Site Strategy & Succession Planning</li>
                <li> Cross-Functional Team Management, Operational Excellence </li>
                <li>Specializing in talent development (Amazon Bar Raiser)</li>
                <li>Mentorship, Coaching & Leadership Pipeline Development (grew leaders up to Sr. SDM, Principal TPM and Principal Enginee)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-md border border-blue-200">
              <p className="font-semibold text-lg text-blue-800 mb-3">Technical Expertise</p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-gray-700">
                <li>FinTech, Digital Subscription & Monetization Systems</li>
                <li>High-Performance Distributed Systems & Cloud (AWS) Architecture</li>
                <li>Generative AI / Large Language Models (LLM) Integration</li>
                <li> Mobile, Multi-modal Device Software & Accessibility Technology</li> 
              </ul>
            </div>
          </div>
        </section>

        {/* --- CONTACT & CREDENTIALS --- */}
        <section className="py-8 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-purple-600" />
            Contact & Credentials
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {contactLinks.map((link) => (
                <a 
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.title}
                download={link.title === 'Resume' ? 'PhaniBhamidipati.pdf' : undefined}
                className="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <link.icon className="w-6 h-6 text-purple-700 mb-1" />
                <span className="text-xs font-medium text-gray-700 text-center">{link.text.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </section>

        {/* --- PERSONAL PROJECTS --- */}
        <section className="pt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Personal Projects: Demonstrating Hands-On Experience (and also some weekend fun)
          </h3>
          <p className="text-gray-600 mb-6 italic">
            These projects are working prototypes to explore AI tools, modern web development and cloud integration patterns. They're entirely experimental in nature.
          </p>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className={`${index === 0 ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' : 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200'} border p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <h4 className={`text-xl font-semibold mb-4 ${index === 0 ? 'text-green-800' : 'text-orange-800'}`}>{project.title}</h4>
                
                {/* What the Project Is Section */}
                <div className="mb-4">
                  <h5 className={`text-lg font-semibold mb-2 ${index === 0 ? 'text-green-700' : 'text-orange-700'}`}>
                    🔍 What the Project Is
                  </h5>
                  <p className="text-gray-700 leading-relaxed">{project.whatItIs}</p>
                </div>

                {/* Why I Built It Section */}
                <div className="mb-4">
                  <h5 className={`text-lg font-semibold mb-2 ${index === 0 ? 'text-green-700' : 'text-orange-700'}`}>
                    💡 Why I Built It
                  </h5>
                  <p className="text-gray-700 leading-relaxed">{project.whyIBuiltIt}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Tech Stack:</span>
                    <span className={`font-mono px-3 py-1 rounded-full text-xs ${index === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{project.stack}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-xs ${project.status.includes('Live') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{project.status}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {project.demoLink && (
                    <a href={project.demoLink} className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${index === 0 ? 'bg-green-100 hover:bg-green-200 text-green-800' : 'bg-orange-100 hover:bg-orange-200 text-orange-800'}`}>
                      {project.demoLink.includes('smartyquest') ? '🚀 Try SmartyQuest' : '🏪 Visit App Mart'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER / COPYRIGHT --- */}
        <footer className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
                &copy; 2025 Phani Bhamidipati. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
                Built as a functional proof of concept using the React Framework, developed in VS Code and Cline plugin.
            </p>
        </footer>
        
        {/* Optional Photo Section Placeholder */}
        {/*
        <div className="mt-8 text-center">
            <img src="[Your Photo URL]" alt="Phani Bhamidipati" className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-200 shadow-md" />
            <p className="text-sm text-gray-400 mt-2">Optional Professional Headshot</p>
        </div>
        */}

      </div>
    </div>
  );
};

export default HomePage;
