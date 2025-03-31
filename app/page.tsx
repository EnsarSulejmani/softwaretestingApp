"use client";

import React from "react";
import { useState } from "react";

export default function Home() {
  // useStates for form fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: false,
    cardName: false,
    expiry: false,
    cvc: false,
  });

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      cardNumber: cardNumber.trim() === "",
      cardName: cardName.trim() === "",
      expiry: expiry.trim() === "",
      cvc: cvc.trim() === "",
    };
    setErrors(newErrors);

    // If no errors, proceed
    if (!Object.values(newErrors).some((error) => error)) {
      console.log({ cardNumber, cardName, expiry, cvc });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-400">
          Credit Card Info
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="cardNumber">
              Card Number{" "}
              {errors.cardNumber && <span className="text-green-400">*</span>}
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`w-full p-2 rounded bg-gray-700 border ${
                errors.cardNumber ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-green-400 hover:border-green-300 transition-colors duration-300`}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="cardName">
              Name on Card{" "}
              {errors.cardName && <span className="text-green-400">*</span>}
            </label>
            <input
              id="cardName"
              type="text"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className={`w-full p-2 rounded bg-gray-700 border ${
                errors.cardName ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-green-400 hover:border-green-300 transition-colors duration-300`}
            />
          </div>
          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label className="block mb-1" htmlFor="expiry">
                Expiry Date{" "}
                {errors.expiry && <span className="text-green-400">*</span>}
              </label>
              <input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className={`w-full p-2 rounded bg-gray-700 border ${
                  errors.expiry ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:border-green-400 hover:border-green-300 transition-colors duration-300`}
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1" htmlFor="cvc">
                CVC {errors.cvc && <span className="text-green-400">*</span>}
              </label>
              <input
                id="cvc"
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className={`w-full p-2 rounded bg-gray-700 border ${
                  errors.cvc ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:border-green-400 hover:border-green-300 transition-colors duration-300`}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}
