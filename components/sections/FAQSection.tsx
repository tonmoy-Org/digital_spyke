"use client";

import React from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { motion } from 'framer-motion';

export default function FAQSection() {
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

    const StyledAccordionSummary = styled(AccordionSummary)({
        "& .MuiAccordionSummary-content": {
            color: "hsl(220, 10%, 54.4%)",
        },
        "& .MuiSvgIcon-root": {
            color: "hsl(220, 10%, 54.4%)",
        },
        "&:hover .MuiAccordionSummary-content, &:hover .MuiSvgIcon-root": {
            color: "white",
        },
    });

    return (
        <Box sx={{ py: { xs: 8, lg: 2 }, bgcolor: "hsl(220, 65%, 3.52%)", color: "hsl(220, 10%, 54.4%)" }}>
            <Container maxWidth="md">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-[1.5rem] md:text-[2.4rem] lg:!leading-snug font-normal lg:mt-3 text-white text-center">
                            Frequently Asked  <span
                                style={{
                                    background: 'linear-gradient(to right, #00FFAB, #6B46FF)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'inline-block',
                                }}>Questions</span>
                        </h2>
                    </div>
                </motion.div>
                {/* FAQ Items */}
                <div className="lg:mt-20 mt-10">
                    {faqs.map((faq, index) => (
                        <Accordion key={index} sx={{ bgcolor: "hsl(220, 65%, 3.52%)", color: "hsl(220, 10%, 54.4%)" }}>
                            <StyledAccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <Typography>{faq.question}</Typography>
                            </StyledAccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "white" }}>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </Container>
        </Box>
    );
}
