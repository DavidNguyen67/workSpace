import { useCallback, useEffect } from 'react';
import { ItemCommodity } from '.';
import { Carousel, Row } from 'antd';
import { useRouter } from 'next/navigation';

interface SimilarCommoditiesProps {
  productTag: string;
  chunkedItems: Commodity[][];
}

function SimilarCommodities({
  productTag,
  chunkedItems,
}: Readonly<SimilarCommoditiesProps>) {
  const router = useRouter();

  const handleFetchProductTags = useCallback(async () => {
    console.log('productTag:', productTag);
  }, [productTag]);

  useEffect(() => {
    handleFetchProductTags();

    return () => {};
  }, []);

  return (
    <>
      <Carousel
        autoplay
        arrows
      >
        {chunkedItems.map((group, index) => (
          <div key={index}>
            <Row
              gutter={[8, 8]}
              style={{ marginBottom: '8px' }}
            >
              {group.map((item, _index) => (
                <ItemCommodity
                  item={item}
                  key={item.id}
                  isShowTile={false}
                  isShowTags={false}
                  isShowInfoShip={false}
                  suffixCurrency='đ'
                  currencyFontSize='0.8rem'
                  descriptionFontSize='0.6rem'
                  groupLength={group.length}
                  onClick={() => router.push(`/item/${_index}`)}
                />
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default SimilarCommodities;
