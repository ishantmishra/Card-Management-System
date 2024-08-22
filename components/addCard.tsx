
"use client";
import React, { useState } from 'react';
import axios from 'axios';

type Card = {
  id?: number;
  bankName: string;
  creditCardName: string;
  isActive: boolean;
  createdOn: string;
};

type AddCardFormProps = {
  fetchCards: () => void;
  editingCard?: Card | null;
  setEditingCardId: (id: number | null) => void;
};

const AddCardForm: React.FC<AddCardFormProps> = ({ fetchCards, editingCard, setEditingCardId }) => {
  const [formData, setFormData] = useState<Card>({
    bankName: editingCard?.bankName || '',
    creditCardName: editingCard?.creditCardName || '',
    isActive: editingCard?.isActive || false,
    createdOn: editingCard?.createdOn || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCard && editingCard.id) {
        await axios.put('/api/cards', { ...formData, id: editingCard.id });
        setEditingCardId(null);
      } else {
        await axios.post('/api/cards', formData);
      }
      setFormData({ bankName: '', creditCardName: '', isActive: false, createdOn: '' });
      fetchCards();
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const bankOptions = [
    "Bank of America",
    "Chase",
    "Wells Fargo",
    "Citibank",
    "HSBC",
    "ICICI",
    "SBI",
    "HDFC",
    "AXIS"
    // Add more bank names here
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
          Bank Name
        </label>
        <select
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select a bank</option>
          {bankOptions.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="creditCardName" className="block text-sm font-medium text-gray-700">
          Credit Card Name
        </label>
        <input
          type="text"
          id="creditCardName"
          name="creditCardName"
          value={formData.creditCardName}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleInputChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Is Active
        </label>
      </div>

      <div>
        <label htmlFor="createdOn" className="block text-sm font-medium text-gray-700">
          Created On
        </label>
        <input
          type="date"
          id="createdOn"
          name="createdOn"
          value={formData.createdOn}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {editingCard ? 'Update Card' : 'Add Card'}
      </button>
    </form>
  );
};

export default AddCardForm;
