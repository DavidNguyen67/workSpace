'use client';
import React, { useCallback, useMemo } from 'react';
import { Col, Carousel, Row, Card, Divider, Select } from 'antd';
import { BOOK_TYPES, SUPPLIERS } from '@/utilities/seeds';
import { chunkArray } from '@/utilities/functions/array';
import { useRouter } from 'next/navigation';
import FilterSectionComponent from '@/components/app/Category';

interface HeaderProps {
  data: any[];
}

const Header = ({ data }: Readonly<HeaderProps>) => {
  const chunkedItems = useMemo(() => chunkArray(data, 8), [data]);

  const router = useRouter();

  const handleClickItem = useCallback(
    (item: any) => {
      router.push(item.link);
    },
    [router]
  );

  return (
    <Col xs={24}>
      <Carousel
        autoplay
        arrows
        dots
      >
        {chunkedItems.map((group, index) => (
          <div key={index}>
            <Row gutter={[8, 8]}>
              {group.map((item, _index) => (
                <Col
                  key={_index}
                  xs={24}
                  sm={12}
                  lg={6}
                >
                  <Card
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleClickItem(item);
                    }}
                    hoverable
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.icon}
                      <div
                        style={{
                          marginLeft: 8,
                        }}
                      >
                        {item.description}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </Col>
  );
};

interface CategoryItemProps {}

function CategoryItem({}: Readonly<CategoryItemProps>) {
  const data = useMemo(() => BOOK_TYPES, []);

  return (
    <>
      <Divider>Khám phá theo danh mục</Divider>
      <Header data={data} />
      <Divider>Tất cả sản phẩm</Divider>
      <FilterSectionComponent />
    </>
  );
}

export default CategoryItem;
