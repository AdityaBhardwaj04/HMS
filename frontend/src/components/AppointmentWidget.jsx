import { useState, useEffect } from "react";
import axios from "axios";

const AppointmentWidget = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientAddress: "",
    // ... other appointment details
  });

  const [nextPID, setNextPID] = useState(null);

  useEffect(() => {
    const fetchNextPID = async () => {
      const response = await axios.get(
        "http://localhost:3000/patients/nextPID"
      );
      setNextPID(response.data.nextPID);
    };
    fetchNextPID();
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAppointmentSubmit = async (event) => {
    event.preventDefault();

    const patientData = { ...formData };
    const appointmentData = { patientId: nextPID, ...formData };

    try {
      // Create the patient first
      await axios.post("http://localhost:3000/patients", patientData);

      // Then create the appointment
      await axios.post("http://localhost:3000/appointments", appointmentData);

      alert("Appointment created!");
      // ... reset form
    } catch (error) {
      console.error("Error creating appointment or patient:", error);
      // ... handle error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">New Patient Registration</h2>
        <form onSubmit={handleAppointmentSubmit}>
          <div className="mb-4">
            <label htmlFor="pid" className="block text-gray-700 mb-1">
              Patient ID:
            </label>
            <input
              type="text"
              id="pid"
              name="pid"
              value={nextPID || ""} // Show 'loading..' initially if needed
              readOnly
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          {/* ... Rest of the form */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {" "}
            {/* Responsive 2-Col */}
            <div>
              <label htmlFor="patientName" className="block text-gray-700 mb-1">
                Name of Patient:
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="patientAge" className="block text-gray-700 mb-1">
                Age of Patient:
              </label>
              <input
                type="number"
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="patientAddress"
              className="block text-gray-700 mb-1"
            >
              Address of Patient:
            </label>
            <textarea
              id="patientAddress"
              name="patientAddress"
              value={formData.patientAddress}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          {/* ... Rest of Appointment Form */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Register & Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentWidget;
