// components/CardManager.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCardForm from '../components/addCard';
import Modal from '../components/Modal';
import Pagination from '../components/pagination'; // Import Pagination component
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

type Card = {
  id?: number;
  bankName: string;
  creditCardName: string;
  isActive: boolean;
  createdOn: string;
};

const CardManager: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(5); // Number of cards per page
  const router = useRouter();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('/api/cards');
      const data = response.data as Card[];
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddCardClick = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setEditingCardId(card.id!);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete('/api/cards', { data: { id } });
      fetchCards();
      router.push('/path-to-cardmanager');
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Calculate the current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="flex justify-end h-full">
        <button
          onClick={handleAddCardClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Card
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCardForm
          fetchCards={fetchCards}
          editingCard={editingCard}
          setEditingCardId={setEditingCardId}
        />
      </Modal>
      <h2 className="text-xl font-bold mb-4">Card List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Bank Name</th>
            <th className="py-2 px-4 border-b">Credit Card Name</th>
            <th className="py-2 px-4 border-b">Is Active</th>
            <th className="py-2 px-4 border-b">Created On</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCards.map((card) => (
            <tr key={card.id} className="border-t">
              <td className="py-2 px-4">{card.bankName}</td>
              <td className="py-2 px-4">{card.creditCardName}</td>
              <td className="py-2 px-4">{card.isActive ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4">{new Date(card.createdOn).toLocaleDateString()}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id!)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(cards.length / cardsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default CardManager;
