import { useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";


const ContactUs = () => {
  const form = useRef();

  const sendMail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm("service_s02dvbp", "template_41ybe0n", form.current, {
        publicKey: "CxqrPI5OiPSTIGXkB",
      });
      toast.success("Thank you for your feedback. Your Email has been received!");
    } catch (error) {
      toast.error("Unable to send mail. Please try again later");
    }
    

    e.target.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="w-full pr-4">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Contact</h2>
          <p className="mb-4">
            If you have any questions or are facing any issues, feel free to reach
            out to us using the contact information below:
          </p>
          <ul className="list-none ml-8 mb-4">
            <li>
              <FaEnvelope className="inline-block mr-2" /> Email: info@example.com
            </li>
            <li>
              <FaPhone className="inline-block mr-2" /> Phone: +251-900-000-000
            </li>
            <li>
              <FaMapMarkerAlt className="inline-block mr-2" /> Address: 123 Main
              Street, Addis Ababa, Ethiopia
            </li>
          </ul>
          <p>We will be more than excited to talk to you. All your suggestions, reviews, feedback and queries will be appreciated. Do get in touch with us and we will love to hear from you!</p>
        </div>
        <div className="w-full pl-4">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Contact Form</h2>
          <form ref={form} onSubmit={sendMail} className="flex flex-col">
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="fullName" className="block mb-1">Full Name</label>
                <input
                  id="fullName"
                  name="Your_name"
                  type="text"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <label htmlFor="subject" className="block mb-1 mt-4">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="message" className="block mb-1 mt-4">Message</label>
            <textarea
              id="message"
              name="message"
              cols="30"
              rows="3"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mt-4"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
