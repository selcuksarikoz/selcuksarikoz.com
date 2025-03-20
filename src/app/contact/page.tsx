import {
  Camera,
  Film,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Title } from "@/src/components/title";

export const metadata = {
  title: "Get In Touch",
  description:
    "Have a project in mind or just want to say hello? I'd love to hear from you.",
};

export default function Contact() {
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
            <div className="md:col-span-3 p-8">{/*<ContactForm />*/}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
