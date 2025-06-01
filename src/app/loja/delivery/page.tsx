'use client';
import HomePageDelivery from '@/templates/delivery/homepage';
import PromocionalSlider from '@/components/Promocional';

export default function DeliveryPage() {
  return (
    <div className='grid grid-cols-1 gap-4'>
      
      <PromocionalSlider />
      <HomePageDelivery />
    </div>
  );
}