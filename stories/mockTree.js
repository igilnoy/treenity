import randomWords from 'random-words';

export default [
  {
    id: '1',
    label: randomWords(),
    children: [
      {
        id: '1-1',
        label: randomWords(),
        children: [
          {
            id: '1-1-1',
            label: randomWords(),
            children: [
              { id: '1-1-1-1', label: randomWords() },
              { id: '1-1-1-2', label: randomWords() },
              { id: '1-1-1-3', label: randomWords() },
            ],
          },
          {
            id: '1-1-2',
            label: randomWords(),
            children: [
              { id: '1-1-2-1', label: randomWords() },
              { id: '1-1-2-2', label: randomWords() },
              { id: '1-1-2-3', label: randomWords() },
            ],
          },
          {
            label: randomWords(),
            id: '1-1-3',
            children: [
              { id: '1-1-3-1', label: randomWords() },
              { id: '1-1-3-2', label: randomWords() },
              { id: '1-1-3-3', label: randomWords() },
            ],
          },
        ],
      },
      { id: '1-2', label: randomWords() },
      { id: '1-3', label: randomWords() },
      { id: '1-4', label: randomWords() },
      {
        id: '1-5',
        label: randomWords(),
        children: [
          {
            id: '1-5-1',
            label: randomWords(),
            children: [
              { id: '1-5-1-1', label: randomWords() },
              { id: '1-5-1-2', label: randomWords() },
              { id: '1-5-1-3', label: randomWords() },
            ],
          },
          {
            id: '1-5-2',
            label: randomWords(),
            children: [
              { id: '1-5-2-1', label: randomWords() },
              { id: '1-5-2-2', label: randomWords() },
              { id: '1-5-2-3', label: randomWords() },
            ],
          },
          { id: '1-5-3', label: randomWords() },
        ],
      },
    ],
  },
];
