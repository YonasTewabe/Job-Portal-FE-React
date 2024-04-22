import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">Contact</h2>
        <p className="mb-4">If you have any questions or are facing any issues, feel free to reach out to us using the contact information below:</p>
        <ul className="list-none ml-8 mb-4 ">
          <li><FaEnvelope className="inline-block mr-2" /> Email: info@example.com</li>
          <li><FaPhone className="inline-block mr-2" /> Phone: +251-900-000-000</li>
          <li><FaMapMarkerAlt className="inline-block mr-2" /> Address: 123 Main Street, Addis Ababa, Ethiopia</li>
        </ul>
        <p>We look forward to hearing from you!</p>
      </div>
    </div>
  );
};

export default ContactUs;
