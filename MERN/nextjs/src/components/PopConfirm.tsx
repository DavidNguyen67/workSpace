import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { MouseEventHandler, useCallback, useState } from 'react';

interface PopConfirmProps {
  buttonTriggerTitle: string;
  onClickConfirm: MouseEventHandler<HTMLButtonElement>;
  isLoadingDeleting: boolean;
}

function PopConfirm(props: PopConfirmProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { buttonTriggerTitle, onClickConfirm, isLoadingDeleting } = props;

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            mr={5}
            onClick={onToggle}
          >
            {buttonTriggerTitle}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter
            display="flex"
            justifyContent="flex-end"
          >
            <ButtonGroup size="sm">
              <Button
                variant="outline"
                onClick={onToggle}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onClickConfirm}
                isLoading={isLoadingDeleting}
              >
                Apply
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default PopConfirm;
