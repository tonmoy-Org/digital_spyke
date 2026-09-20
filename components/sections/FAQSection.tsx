"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Where can I see Digital Spyke's past work?",
      answer:
        "Simply reach out to us via the contact form on this website or at contact@digitalspyke.com, let us know what type of project you’re imagining, and we will share samples of comparable past projects with you. We've successfully optimized infrastructure for clients like Shipway, reducing costs through AMD processors and AWS migrations, and supported crypto banks with blockchain solutions.",
    },
    {
      question: "What size companies does Digital Spyke work with?",
      answer:
        "We have worked with sole proprietors, multibillion dollar corporations, universities, charities, and every kind of client in between. We are happy to receive inquiries from potential clients of any size. With over 20,000 customers, including small businesses and enterprises, we tailor solutions for all scales.",
    },
    {
      question: "Does Digital Spyke do copywriting or only cloud services?",
      answer:
        "We offer fully realized cloud solutions, including all necessary documentation and integration support. However, if you prefer to handle your own configurations or documentation, we are happy to incorporate it into our services.",
    },
    {
      question: "Can I upgrade my cloud resources as my business grows?",
      answer:
        "Yes, Digital Spyke provides scalable solutions, allowing you to adjust resources as needed. Whether your needs increase or decrease, we’ll make sure your infrastructure adapts accordingly with on-demand public cloud services.",
    },
    {
      question: "What support does Digital Spyke offer?",
      answer:
        "Digital Spyke offers 24/7 support for all our clients, ensuring prompt assistance for troubleshooting, system updates, and optimizing cloud performance to keep your business running smoothly. Our human-led team is always ready to help.",
    },
    {
      question: "Will my data be secure on Digital Spyke's platform?",
      answer:
        "Absolutely. We follow stringent security protocols and employ the latest cybersecurity measures to ensure your data is protected at all times, backed by ISO certifications like 27001:2022.",
    },
  ];

  return (
    <section className="relative w-full pt-12 sm:pt-16 pb-24 sm:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              Frequently asked <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
                questions
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">
              Everything you need to know about our services, process, security standards, and support.
            </p>
          </motion.div>

          {/* Right Column: Aceternity-style Accordion List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 border-t border-white/10"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-white/10 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 sm:py-6 flex items-start gap-4 text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    {/* Blue/Cyan Plus Icon with 45deg rotation on open */}
                    <div className="mt-1 flex items-center justify-center shrink-0">
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="text-cyan-400 group-hover:text-cyan-300"
                      >
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                      </motion.div>
                    </div>

                    {/* Question text */}
                    <span className="text-base sm:text-lg md:text-xl font-medium text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </button>

                  {/* Smooth Collapsible Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-9 sm:pl-10 pr-2 text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
