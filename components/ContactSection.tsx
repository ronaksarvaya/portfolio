'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

/**
 * EMAILJS SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://www.emailjs.com/ and sign up for a free account
 * 
 * 2. Create an Email Service:
 *    - Go to "Email Services" in the dashboard
 *    - Click "Add New Service"
 *    - Choose your email provider (Gmail recommended)
 *    - Follow the connection steps
 *    - Copy your SERVICE_ID
 * 
 * 3. Create an Email Template:
 *    - Go to "Email Templates"
 *    - Click "Create New Template"
 *    - Use these template variables:
 *      {{from_name}} - sender's name
 *      {{from_email}} - sender's email
 *      {{subject}} - email subject
 *      {{message}} - email message
 *    - Example template:
 *      Subject: New Contact from {{from_name}}
 *      Body: 
 *        Name: {{from_name}}
 *        Email: {{from_email}}
 *        Subject: {{subject}}
 *        Message: {{message}}
 *    - Copy your TEMPLATE_ID
 * 
 * 4. Get your Public Key:
 *    - Go to "Account" > "General"
 *    - Copy your PUBLIC_KEY
 * 
 * 5. Create a .env.local file in your project root and add:
 *    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 *    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
 *    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 * 
 * 6. Restart your development server after adding the .env.local file
 */

interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Name is required';
    } else if (formData.from_name.trim().length < 2) {
      newErrors.from_name = 'Name must be at least 2 characters';
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!isValidEmail(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check if EmailJS credentials are configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error');
      setStatusMessage('Email service is not configured. Please check the setup instructions in the code.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'ronaksarvaiya2@gmail.com' // Your email
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
        
        // Reset form
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setStatusMessage('Oops! Something went wrong. Please try again or email me directly at ronaksarvaiya2@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-5 bg-[#0a0a0a]" id="contact">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg">
            Have a question or want to work together? Let's connect!
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                    errors.from_name ? 'border-red-500' : 'border-gray-800'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#667eea] transition-colors duration-300`}
                  placeholder="John Doe"
                />
                {errors.from_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.from_name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="from_email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                    errors.from_email ? 'border-red-500' : 'border-gray-800'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#667eea] transition-colors duration-300`}
                  placeholder="john@example.com"
                />
                {errors.from_email && (
                  <p className="mt-1 text-sm text-red-500">{errors.from_email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                    errors.subject ? 'border-red-500' : 'border-gray-800'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#667eea] transition-colors duration-300`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                    errors.message ? 'border-red-500' : 'border-gray-800'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#667eea] transition-colors duration-300 resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:shadow-lg hover:shadow-[#667eea]/50 hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-sm">{statusMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{statusMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Contact Info & Image */}
          <div className="order-1 lg:order-2">
            <div className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-800 h-full">
              {/* Contact Image */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl blur-xl opacity-30"></div>
                  <Image
                    src="/contactimg.png"
                    alt="Contact"
                    width={250}
                    height={250}
                    className="relative rounded-2xl"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Let's Create Something Amazing!
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Do you speak Martian? It's ok if you don't, I speak English too. 
                    Don't be shy! Hit me up! 👇
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg
                      className="w-6 h-6 text-[#667eea]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a
                      href="mailto:ronaksarvaiya2@gmail.com"
                      className="text-white hover:text-[#667eea] transition-colors duration-300"
                    >
                      ronaksarvaiya2@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-800">
                  <p className="text-sm text-gray-400 mb-4">Connect with me</p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/ronak-sarvaya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#2a2a2a] rounded-lg hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] transition-all duration-300 hover:scale-110"
                      title="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/ronaksarvaya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#2a2a2a] rounded-lg hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] transition-all duration-300 hover:scale-110"
                      title="GitHub"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
