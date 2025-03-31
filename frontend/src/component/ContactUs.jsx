import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically connect to your backend API
        console.log("Form submitted:", formData);
        setSubmitted(true);

        // Reset form after submission
        setTimeout(() => {
            setState({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Contact Us
                    </h2>
                    <div className="mt-4 flex justify-center">
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded"></div>
                    </div>
                    <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions about our AI-powered disease detection
                        platform? Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-1">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-102 hover:shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4 px-6">
                            <h3 className="text-2xl font-bold text-white">
                                Get in Touch
                            </h3>
                            <p className="text-blue-100 mt-2">
                                We'd love to hear from you
                            </p>
                        </div>

                        <div className="px-6 py-6">
                            {submitted ? (
                                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-pulse">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-5 w-5 text-green-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium">
                                                Thank you for reaching out!
                                            </p>
                                            <p className="text-sm mt-1">
                                                We've received your message and
                                                will get back to you soon.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                            </svg>
                                        </div>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none"
                                            required
                                        >
                                            <option value="">
                                                Select a subject
                                            </option>
                                            <option value="General Inquiry">
                                                General Inquiry
                                            </option>
                                            <option value="Partnership Opportunity">
                                                Partnership Opportunity
                                            </option>
                                            <option value="Technical Support">
                                                Technical Support
                                            </option>
                                            <option value="Billing Question">
                                                Billing Question
                                            </option>
                                            <option value="Medical Consultation">
                                                Medical Consultation
                                            </option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Your Message
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                            placeholder="How can we help you?"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:-translate-y-1 shadow-lg"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-102 hover:shadow-2xl">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
                                <h3 className="text-2xl font-bold text-white">
                                    Contact Information
                                </h3>
                                <p className="text-blue-100 mt-2">
                                    Reach out through your preferred channel
                                </p>
                            </div>

                            <div className="px-8 py-8">
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-lg font-medium text-gray-900">
                                                Phone
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                +1 (800) 123-4567
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Mon-Fri from 9am to 6pm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-lg font-medium text-gray-900">
                                                Email
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                info@aidiseasedetection.com
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                We respond within 24 hours
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-lg font-medium text-gray-900">
                                                Location
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                123 Medical Boulevard, Suite 400
                                                <br />
                                                Health City, CA 90210
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Visit our headquarters
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h4 className="text-lg font-medium text-gray-900 flex items-center">
                                        <svg
                                            className="h-5 w-5 mr-2 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Business Hours
                                    </h4>
                                    <ul className="mt-4 space-y-2 text-gray-600">
                                        <li className="flex justify-between">
                                            <span>Monday - Friday:</span>
                                            <span className="font-medium">
                                                9:00 AM - 6:00 PM
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Saturday:</span>
                                            <span className="font-medium">
                                                10:00 AM - 4:00 PM
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Sunday:</span>
                                            <span className="font-medium">
                                                Closed
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="mt-4 bg-blue-50 rounded-lg p-4 flex items-start">
                                        <svg
                                            className="h-6 w-6 text-blue-500 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        <p className="ml-3 text-sm text-blue-800">
                                            Our AI platform is available{" "}
                                            <span className="font-semibold">
                                                24/7
                                            </span>{" "}
                                            for registered users
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-102 hover:shadow-2xl">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
                                <h3 className="text-2xl font-bold text-white">
                                    Frequently Asked Questions
                                </h3>
                                <p className="text-blue-100 mt-2">
                                    Quick answers to common questions
                                </p>
                            </div>

                            <div className="px-8 py-8">
                                <div className="space-y-6">
                                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            How accurate is your AI disease
                                            detection?
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Our platform achieves 97% accuracy
                                            in disease detection, exceeding
                                            traditional diagnostic methods in
                                            many cases. All results are
                                            validated by medical professionals.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Is my medical data secure?
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Yes, we implement the highest
                                            standards of data security and
                                            privacy. All data is encrypted, and
                                            we comply with HIPAA and other
                                            relevant regulations.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            How can hospitals partner with your
                                            platform?
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            We offer various partnership models
                                            for healthcare institutions. Please
                                            contact us through the form with
                                            "Partnership Opportunity" as the
                                            subject for more information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600">
                        Connect with us on social media
                    </p>
                    <div className="flex justify-center mt-4 space-x-4">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition duration-300"
                        >
                            <span className="sr-only">Facebook</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition duration-300"
                        >
                            <span className="sr-only">Twitter</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition duration-300"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition duration-300"
                        >
                            <span className="sr-only">Instagram</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
