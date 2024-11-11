// components/Feed.tsx
import React, { useEffect, useState } from 'react';
import ProfessionalCard from './ProfessionalCard';
import { getAllTherapist } from '@/services/apiService';
import { Professional } from '../../types/types';

interface FeedProps {
  filters: {
    esp: string;
    exp: number;
    city: string;
    min_price: number;
    max_price: number;
  };
}

export default function Feed( { filters }: FeedProps) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTherapist();
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-w-3/4">
      {professionals.map((professional) => (
        <ProfessionalCard key={professional.id} {...professional} />
      ))}
    </div>
  );
}
