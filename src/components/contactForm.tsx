// "use client";
//
// import { useState } from "react";
// import { AlertCircle, Send } from "lucide-react";
//
// export default function ContactForm() {
//   const [formState, setFormState] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };
//
//   const validateForm = () => {
//     const newErrors = {};
//
//     if (!formState.name.trim()) {
//       newErrors.name = "Name is required";
//     }
//
//     if (!formState.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
//       newErrors.email = "Valid email is required";
//     }
//
//     if (!formState.message.trim()) {
//       newErrors.message = "Message is required";
//     }
//
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     if (!validateForm()) return;
//
//     setIsSubmitting(true);
//
//     try {
//       // Here you would make an actual API call to your backend
//       // Example:
//       // const response = await fetch('/api/contact', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formState)
//       // });
//
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//
//       setIsSubmitted(true);
//       setFormState({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Handle error state here
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   return (
//     <>
//       {isSubmitted ? (
//         <div className="h-full flex items-center justify-center">
//           <div className="text-center max-w-md py-12">
//             <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg
//                 className="w-8 h-8 text-green-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-bold text-white mb-2">
//               Message Sent!
//             </h3>
//             <p className="text-gray-300 mb-6">
//               Thanks for reaching out. I'll get back to you as soon as possible.
//             </p>
//             <button
//               onClick={() => setIsSubmitted(false)}
//               className="px-5 py-2 bg-dark-100/80 hover:bg-dark-100 text-white rounded-lg font-medium transition-all border border-dark-100 hover:border-gray-600"
//             >
//               Send Another Message
//             </button>
//           </div>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-300 mb-2"
//               >
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formState.name}
//                   onChange={handleChange}
//                   className={`w-full bg-dark-100/30 border ${
//                     errors.name ? "border-red-500/50" : "border-gray-600"
//                   } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
//                   placeholder="Your name"
//                 />
//                 {errors.name && (
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                     <AlertCircle className="h-5 w-5 text-red-500" />
//                   </div>
//                 )}
//               </div>
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-500">{errors.name}</p>
//               )}
//             </div>
//
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-300 mb-2"
//               >
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formState.email}
//                   onChange={handleChange}
//                   className={`w-full bg-dark-100/30 border ${
//                     errors.email ? "border-red-500/50" : "border-gray-600"
//                   } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
//                   placeholder="your.email@example.com"
//                 />
//                 {errors.email && (
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                     <AlertCircle className="h-5 w-5 text-red-500" />
//                   </div>
//                 )}
//               </div>
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//               )}
//             </div>
//           </div>
//
//           <div>
//             <label
//               htmlFor="subject"
//               className="block text-sm font-medium text-gray-300 mb-2"
//             >
//               Subject
//             </label>
//             <input
//               type="text"
//               id="subject"
//               name="subject"
//               value={formState.subject}
//               onChange={handleChange}
//               className="w-full bg-dark-100/30 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
//               placeholder="What is this regarding?"
//             />
//           </div>
//
//           <div>
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-300 mb-2"
//             >
//               Message <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formState.message}
//                 onChange={handleChange}
//                 rows={5}
//                 className={`w-full bg-dark-100/30 border ${
//                   errors.message ? "border-red-500/50" : "border-gray-600"
//                 } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
//                 placeholder="Tell me about your project, ideas, or questions..."
//               />
//               {errors.message && (
//                 <div className="absolute top-3 right-0 flex items-start pr-3">
//                   <AlertCircle className="h-5 w-5 text-red-500" />
//                 </div>
//               )}
//             </div>
//             {errors.message && (
//               <p className="mt-1 text-sm text-red-500">{errors.message}</p>
//             )}
//           </div>
//
//           <button
//             type="submit"
//             className={`px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 ${
//               isSubmitting ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Sending...
//               </>
//             ) : (
//               <>
//                 <Send className="h-5 w-5" />
//                 Send Message
//               </>
//             )}
//           </button>
//         </form>
//       )}
//     </>
//   );
// }
