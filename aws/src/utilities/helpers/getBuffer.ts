interface Buffer {
  data: number[];
  reset: () => void;
  addData: (raw: number[]) => number[];
  getData: () => number[];
}

export const getBuffer = (): Buffer => {
  let buffer: number[] = [];

  function add(raw: number[]): number[] {
    buffer = buffer.concat(...raw);
    return buffer;
  }

  /**
   * reset buffer
   */
  function newBuffer(): void {
    buffer = [];
  }

  return {
    reset: function (): void {
      newBuffer();
    },
    addData: function (raw: number[]): number[] {
      return add(raw);
    },
    getData: function (): number[] {
      return buffer;
    },
  };
};
