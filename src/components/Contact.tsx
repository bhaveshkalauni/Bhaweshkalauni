import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, Linkedin, MapPin } from "lucide-react";
import { personalInfo } from "../data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.contact.email}&su=Supply%20Chain%20%26%20Operations%20Inquiry%20-%20Bhawesh%20Kalauni`;

  return (
    <section id="contact" className="py-20 md:py-28 border-b-2 border-[#111214] bg-[#F3F2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 mb-12 pb-6 border-b-2 border-[#111214]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#111214] uppercase">
            <span className="w-2.5 h-2.5 bg-[#20A0B5] inline-block"></span>
            <span>05 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-[#111214] leading-[1.02]">
            Let's Discuss Supply Chain &amp; Operations.
          </h2>
          <p className="text-base sm:text-lg text-[#3F454A] max-w-2xl font-normal leading-relaxed">
            Open for Supply Chain, Logistics, Operations Strategy roles, and consulting inquiries across Europe and worldwide.
          </p>
        </div>

        {/* Primary Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Email CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 sm:p-8 bg-[#F7F7F6] border-2 border-[#111214] shadow-[5px_5px_0px_#111214] space-y-6">
              <div className="text-xs font-mono font-bold tracking-widest text-[#111214] uppercase">
                DIRECT EMAIL DISPATCH
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#F3F2F0] border-2 border-[#111214]">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#20A0B5] shrink-0" />
                  <span className="font-mono text-sm sm:text-base font-bold text-[#111214] select-all">
                    {personalInfo.contact.email}
                  </span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border-2 border-[#111214] bg-[#F7F7F6] hover:bg-white shadow-[2px_2px_0px_#111214] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1E7A62]" />
                      <span className="text-[#1E7A62]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#111214]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons with KB Style */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase bg-[#20A0B5] text-[#111214] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all"
                >
                  <span>OPEN IN GMAIL</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${personalInfo.contact.email}?subject=Supply%20Chain%20%26%20Operations%20Inquiry`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase bg-[#F7F7F6] text-[#111214] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all"
                >
                  <span>STANDARD MAILTO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Channels & Location */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* LinkedIn */}
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111214] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-[#20A0B5]" />
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#3F454A]">LINKEDIN</div>
                  <div className="text-sm font-bold text-[#111214]">/in/bhaveshkalauni</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#111214] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Location & Status Card */}
            <div className="p-5 bg-[#F7F7F6] border-2 border-[#111214] shadow-[4px_4px_0px_#111214] space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#20A0B5]" />
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#3F454A]">LOCATION &amp; RELOCATION</div>
                  <div className="text-sm font-bold text-[#111214]">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#111214] flex items-center justify-between text-xs font-mono">
                <span className="text-[#3F454A]">TIMEZONE: CET / UTC+1</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E7A62] animate-pulse"></span>
                  <span className="text-[#1E7A62] font-black uppercase">ACTIVE STATUS</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
