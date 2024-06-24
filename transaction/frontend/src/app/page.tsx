'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAPhoto, getAllPhotos } from '@/service/axios.service';
import dynamic from 'next/dynamic';
import { Button, Popconfirm, Skeleton, message } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

const GeneratePhotoComponent = dynamic(
  () => import('@/components/GeneratePhotoComponent'),
  {
    loading: () => <Skeleton />,
  }
);

const TableOptimize = dynamic(() => import('@/components/TableOptimize'), {
  loading: () => <Skeleton />,
});

const Home = () => {
  const queryClient = useQueryClient();

  const [currentRecord, setCurrentRecord] = useState<Photo | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['photos'],
    queryFn: getAllPhotos,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => {
      abortControllerRef.current = new AbortController();
      return deleteAPhoto(id);
    },
    onMutate: (...something) => {
      console.log('Đang mutate', something);
    },
    onSuccess: (...someThingWhenSuccess) => {
      console.log('Thành công', someThingWhenSuccess);
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      message.success(`Xoá user với tên là: ${currentRecord?.name} thành công`);
      setCurrentRecord(null);
    },
    // Always refetch after error or success:
    onSettled: (...someThingWhenDone) => {
      console.log('All', someThingWhenDone);
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (someThingWhenError) => {
      console.log('Thất bại', someThingWhenError);
      message.error(`Xoá user với tên là: ${currentRecord?.name} thất bại`);
    },
  });

  const handleDelete = useCallback(
    (id: string) => {
      mutation.mutate(id);
    },
    [mutation]
  );

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <>
      <GeneratePhotoComponent />
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        'Khong co data'
      ) : (
        data &&
        data?.length > 0 && (
          <TableOptimize
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
            columns={[
              {
                dataIndex: 'id',
                title: 'STT',
                fixed: 'left',
                render: (_, record, index) => {
                  return index + 1;
                },
              },
              {
                dataIndex: 'name',
                title: 'name',
              },
              {
                dataIndex: 'description',
                title: 'description',
              },
              {
                dataIndex: 'action',
                title: 'action',
                render: (_, record) => {
                  return (
                    <Popconfirm
                      title='Are you sure to delete this user?'
                      onConfirm={() => handleDelete(record.id)}
                      okText='Yes'
                      cancelText='No'
                    >
                      <Button
                        danger
                        onClick={() => setCurrentRecord(record)}
                        icon={
                          record.id === currentRecord?.id &&
                          mutation.isPending ? (
                            <LoadingOutlined />
                          ) : (
                            <DeleteOutlined />
                          )
                        }
                      >
                        {mutation.isPending ? 'Cancel' : 'Delete'}
                      </Button>
                    </Popconfirm>
                  );
                },
              },
            ]}
          />
        )
      )}
    </>
  );
};

export default Home;
