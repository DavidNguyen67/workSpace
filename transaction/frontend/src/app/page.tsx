'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAPhoto, getAllPhotos } from '@/service/axios.service';
import dynamic from 'next/dynamic';
import { Button, Popconfirm, Skeleton, Table, message } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

const GeneratePhotoComponent = dynamic(
  () => import('@/components/GeneratePhotoComponent'),
  {
    loading: () => <Skeleton />,
  }
);

const Home = () => {
  const queryClient = useQueryClient();

  const [currentRecord, setCurrentRecord] = useState<Photo | null>(null);

  const abortCtrlRef = useRef<AbortController[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['photos'],
    queryFn: getAllPhotos,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => {
      abortCtrlRef.current.forEach((ctrl) => ctrl.abort());
      abortCtrlRef.current = [];
      abortCtrlRef.current.push(new AbortController());
      return deleteAPhoto(id, { signal: abortCtrlRef.current[0].signal });
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

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error) => {
      if (error.name === 'CanceledError') {
        message.warning(
          `Xoá user với tên là: ${currentRecord?.name} bị hủy bởi người dùng`
        );
        return;
      }
      if (error.message.includes('timeout')) {
        message.warning(
          `Xoá user với tên là: ${currentRecord?.name} bị hủy do timeout`
        );
        return;
      }
      console.log(error);

      return message.error(
        `Xoá user với tên là: ${currentRecord?.name} thất bại`
      );
    },
  });

  const handleDelete = useCallback(
    (id: string) => {
      mutation.mutate(id);
    },
    [mutation]
  );

  const handleCancelDelete = useCallback(() => {
    abortCtrlRef.current.forEach((ctrl) => ctrl.abort());
    abortCtrlRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      abortCtrlRef.current.forEach((c) => c.abort());
    };
  }, []);

  return (
    <>
      {/* Button thực hiện hành đồng generate photo */}
      <GeneratePhotoComponent />
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        'Khong co data'
      ) : (
        data &&
        data?.length > 0 && (
          <Table
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
                      title={
                        mutation.isPending
                          ? 'Are you sure to cancel this action'
                          : 'Are you sure to delete this user?'
                      }
                      onConfirm={() => {
                        mutation.isPending
                          ? handleCancelDelete()
                          : handleDelete(record.id);
                      }}
                      okText='Yes'
                      cancelText='No'
                      onCancel={handleCancelDelete}
                    >
                      {mutation.isPending && currentRecord?.id === record.id ? (
                        <Button
                          danger
                          icon={<LoadingOutlined />}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          danger
                          onClick={() => setCurrentRecord(record)}
                          icon={<DeleteOutlined />}
                        >
                          Delete
                        </Button>
                      )}
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
