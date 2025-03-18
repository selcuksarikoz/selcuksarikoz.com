"use client";

import { useState } from "react";
import {
  AlertCircle,
  Camera,
  Film,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Title } from "@/src/components/title";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after submission
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-30">
      <div className="text-center mb-8">
        <Title
          title={"Get In Touch"}
          description={
            "Have a project in mind or just want to say hello? I'd love to hear from you."
          }
        />
      </div>

      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl opacity-20"></div>
        </div>

        <div className="bg-dark-50/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-dark-100/60 shadow-xl">
          <div className="grid md:grid-cols-5">
            {/* Contact Information */}
            <div className="md:col-span-2 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col justify-between relative overflow-hidden">
              {/* Background code pattern */}
              <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
                <pre className="text-xs font-mono text-white leading-tight p-4">
                  {`const contact = {
  email: "benimpostahesabim@gmail.com",
  location: "Berlin, Germany",
  social: {
    github: "selcuksarikoz",
    linkedin: "selcuk-sarikoz",
    instagram: "funnyturkishdude"
  },
  photography: {
    unsplash: "selcukss",
    pexels: "selcukss"
  },
  // Feel free to reach out!
};`}
                </pre>
              </div>

              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Contact Information
                </h3>
                <p className="text-gray-300 mb-8">
                  Feel free to reach out through this form or via my social
                  media channels.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary-light" />
                    </div>
                    <a
                      href="mailto:benimpostahesabim@gmail.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      benimpostahesabim@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-secondary-light" />
                    </div>
                    <span className="text-gray-300">Berlin, Germany</span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4 text-white">Connect</h4>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="https://github.com/selcuksarikoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-dark-100/80 border border-dark-100 flex items-center justify-center hover:bg-dark-100 hover:border-gray-600 transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-gray-300" />
                  </Link>

                  <Link
                    href="https://www.instagram.com/funnyturkishdude/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-dark-100/80 border border-dark-100 flex items-center justify-center hover:bg-dark-100 hover:border-gray-600 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-gray-300" />
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/selcuk-sarikoz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-dark-100/80 border border-dark-100 flex items-center justify-center hover:bg-dark-100 hover:border-gray-600 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-gray-300" />
                  </Link>

                  <Link
                    href="https://unsplash.com/@selcukss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-dark-100/80 border border-dark-100 flex items-center justify-center hover:bg-dark-100 hover:border-gray-600 transition-all"
                    aria-label="Unsplash"
                  >
                    <Camera className="h-5 w-5 text-gray-300" />
                  </Link>

                  <Link
                    href="https://www.pexels.com/@selcukss/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-dark-100/80 border border-dark-100 flex items-center justify-center hover:bg-dark-100 hover:border-gray-600 transition-all"
                    aria-label="Pexels"
                  >
                    <Film className="h-5 w-5 text-gray-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3 p-8">
              {isSubmitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md py-12">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Thanks for reaching out. I'll get back to you as soon as
                      possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2 bg-dark-100/80 hover:bg-dark-100 text-white rounded-lg font-medium transition-all border border-dark-100 hover:border-gray-600"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className={`w-full bg-dark-100/30 border ${
                            errors.name
                              ? "border-red-500/50"
                              : "border-gray-600"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className={`w-full bg-dark-100/30 border ${
                            errors.email
                              ? "border-red-500/50"
                              : "border-gray-600"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full bg-dark-100/30 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full bg-dark-100/30 border ${
                          errors.message
                            ? "border-red-500/50"
                            : "border-gray-600"
                        } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
                        placeholder="Tell me about your project, ideas, or questions..."
                      />
                      {errors.message && (
                        <div className="absolute top-3 right-0 flex items-start pr-3">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={true}
                    className={`px-6 disabled:opacity-0 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
