import React from 'react';
import Link from 'next/link';
import { FaDumbbell, FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-10">

          {/* Brand + Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="bg-brand-green p-1.5 rounded-lg text-white">
                <FaDumbbell className="h-4 w-4" />
              </div>
              <span className="font-display font-black text-lg tracking-tight text-brand-black">
                FitTrack <span className="text-brand-green">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
              The ultimate companion for tracking daily calorie consumption, calculating body metrics, and generating tailored, AI-powered eating plans.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://www.linkedin.com/in/mubasshir-rohman"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-gray-100 hover:bg-brand-green hover:text-white text-gray-500 p-2.5 rounded-full transition-all"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/mubasshirkamali2009-art"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="bg-gray-100 hover:bg-brand-green hover:text-white text-gray-500 p-2.5 rounded-full transition-all"
              >
                <FaGithub className="h-4 w-4" />
              </Link>
              <Link
                href="mailto:mubasshirpav@gmail.com"
                aria-label="Email"
                className="bg-gray-100 hover:bg-brand-green hover:text-white text-gray-500 p-2.5 rounded-full transition-all"
              >
                <FaEnvelope className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-display font-black text-sm text-brand-black uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5 text-sm font-semibold text-gray-500">
              <Link href="/" className="hover:text-brand-green transition-colors w-fit">
                Home
              </Link>
              <Link href="/about" className="hover:text-brand-green transition-colors w-fit">
                About
              </Link>
              <Link href="/nutrition" className="hover:text-brand-green transition-colors w-fit">
                Calorie Counter
              </Link>
              <Link href="/generate-diet" className="hover:text-brand-green transition-colors w-fit">
                AI Eating Plan
              </Link>
              <Link href="/profile" className="hover:text-brand-green transition-colors w-fit">
                Profile
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-display font-black text-sm text-brand-black uppercase tracking-wider">
              Contact
            </h3>
            <div className="flex flex-col gap-2.5 text-sm font-semibold text-gray-500">
              <Link
                href="mailto:mubasshirpav@gmail.com"
                className="hover:text-brand-green transition-colors flex items-center gap-2 w-fit"
              >
                <FaEnvelope className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">mubasshirpav@gmail.com</span>
              </Link>
              <Link
                href="tel:+8801328287689"
                className="hover:text-brand-green transition-colors flex items-center gap-2 w-fit"
              >
                <FaPhoneAlt className="h-4 w-4 flex-shrink-0" />
                01328287689
              </Link>
              <Link
                href="https://www.linkedin.com/in/mubasshir-rohman"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-green transition-colors flex items-center gap-2 w-fit"
              >
                <FaLinkedin className="h-4 w-4 flex-shrink-0" />
                LinkedIn Profile
              </Link>
              <Link
                href="https://github.com/mubasshirkamali2009-art"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-green transition-colors flex items-center gap-2 w-fit"
              >
                <FaGithub className="h-4 w-4 flex-shrink-0" />
                GitHub Profile
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} FitTrack AI. All rights reserved. Premium Fitness Companion.
          </div>
          <div className="flex items-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-400">
            <Link href="/about" className="hover:text-brand-green transition-colors">
              Our Mission
            </Link>
            <Link href="/contact" className="hover:text-brand-green transition-colors">
              Support & FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;