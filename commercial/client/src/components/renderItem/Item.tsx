import React from 'react';
import { Card, Col } from 'antd';
import Image from 'next/image';

const { Meta } = Card;

interface ItemCardProps {
  onClick?: () => void;
  imageSrc?: string;
  description?: string;
}

function ItemCard({ onClick, imageSrc, description }: Readonly<ItemCardProps>) {
  return (
    <>
      <Card
        hoverable
        onClick={onClick}
        cover={
          <Image
            src={imageSrc || ''}
            alt={''}
          />
        }
      >
        <Meta
          title="Europe Street beat"
          description={description}
        />
      </Card>
    </>
  );
}

export default ItemCard;
