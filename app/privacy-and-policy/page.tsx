"use client";

import { Box, Container, Typography } from "@mui/material";
import banner from '@/public/banner/new-banner.svg';
import { motion } from "framer-motion";


const PrivacyPolicy = () => {
    return (
        <div>
            <div
                className='pt-28 pb-10 relative'
                style={{
                    backgroundImage: `url(${banner.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Gradient overlay for better text readability */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), hsl(220, 65%, 3.52%)',
                    }}
                ></div>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="text-center relative z-10"
                >
                    <Box sx={{ width: { xs: '100%', md: 1000 }, mx: 'auto', mb: { xs: 4, md: 5 } }}>
                        <motion.p
                            className="text-[2rem] md:text-[3rem] lg:!leading-snug font-normal lg:mt-3 text-white text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >


                            <span className='ms-2'>Our Privacy Policy</span>
                        </motion.p>
                        {/* <motion.p
                        className="text-[0.8rem] lg:text-[1.125rem] lg:!leading-snug lg:mt-3 text-[#BABABA] text-center lg:w-[550px] py-2 mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        We work with clients in all sectors and of all sizes, from bootstrapped startups to Fortune 500 companies.
                    </motion.p> */}
                    </Box>
                </motion.div>
            </div>
            <Box sx={{ color: 'white', pb: 10 }}>
                <Container maxWidth='xl' sx={{ px: { xs: 2, md: 15 } }}>
                    <Box>
                        <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                            Last updated: 27-03-2025
                        </Typography>
                        <Typography color='white' variant="body1" paragraph sx={{ mb: 4 }}>
                            At Digital Spyke, we are committed to protecting the privacy and security of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. By accessing or using Digital Spyke’s services, you consent to the practices described in this policy.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            1. Information We Collect
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            We may collect personal information that you voluntarily provide when you register, subscribe to our services, fill out a form, or interact with us. This may include your name, email address, payment information, and any other details necessary for providing our services.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            2. Automatically Collected Information
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            We may collect information automatically when you access our website, such as your IP address, browser type, operating system, and the pages you visit. This data helps us understand how our website is used and improve our services.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            3. Use of Information
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            We use the information collected to provide, maintain, and improve our services. This includes processing payments, enhancing user experience, sending you updates, responding to inquiries, and ensuring the security of our platform. We may also use your information to contact you about new features or promotions that may interest you.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            4. Sharing and Disclosure
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            We do not share your personal information with third parties except to facilitate service delivery, such as payment processors, or as required by law. Any third-party providers are obligated to keep your information secure and confidential.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            5. Data Security
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            Digital Spyke employs reasonable technical and organizational measures to safeguard your personal information from unauthorized access or disclosure. However, we cannot guarantee absolute security and advise users to be cautious when sharing sensitive information online.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            6. Cookies and Tracking Technologies
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            Our website may use cookies and similar tracking technologies to enhance user experience. Cookies are small files stored on your device that help us understand how you interact with our services. You can modify your browser settings to reject cookies if preferred, though this may impact certain functionalities.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            7. Your Rights
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            Depending on your location, you may have certain rights regarding your personal data, including the right to access, update, delete, or restrict the use of your data. To exercise any of these rights, please contact us at [Insert Contact Email], and we will respond as required by applicable law.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            8. Changes to this Privacy Policy
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            Digital Spyke may update this Privacy Policy from time to time. We will post the latest version with a revised "Last Updated" date. We encourage you to review this policy periodically to stay informed about our data practices. Your continued use of our services constitutes acceptance of any changes.
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            9. Contact Us
                        </Typography>
                        <Typography color='#BABABA' variant="body1" paragraph>
                            If you have questions or concerns about this Privacy Policy, please contact us at [Insert Contact Email]. We are here to help ensure your privacy and answer any inquiries regarding your data and our data practices.
                        </Typography>

                        <Typography color='white' variant="body1" paragraph sx={{ mt: 4 }}>
                            By using Digital Spyke, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </div>
    );
};

export default PrivacyPolicy;