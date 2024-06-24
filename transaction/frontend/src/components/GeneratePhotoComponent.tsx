import { createAPhoto } from '@/service/axios.service';
import { faker } from '@faker-js/faker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, message } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const GeneratePhotoComponent = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Mutation
  const mutation = useMutation({
    mutationFn: (payload: Photo) => {
      abortControllerRef.current = new AbortController();
      return createAPhoto(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
    onError: (...someThingWhenError) => {
      message.error('Thêm thất bại');
      console.log(someThingWhenError);
    },
  });

  const handleCreatePhoto = useCallback(() => {
    const newPhoto = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      description: faker.lorem.sentence(),
    };
    mutation.mutate(newPhoto);
  }, [mutation]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <Button
      type='primary'
      icon={<PlusOutlined />}
      loading={mutation.isPending}
      onClick={handleCreatePhoto}
    >
      Bấm vào đây để tạo 1 record Photo bất kì
    </Button>
  );
};

export default GeneratePhotoComponent;
