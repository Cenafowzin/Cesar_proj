// Request Sheet

export async function saveBoard(newBoard) {
  const response = await fetch('http://127.0.0.1:8000/requestsheet', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
  });
  const data = await response.json();
};


