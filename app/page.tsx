'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3001/entries'; // Adjust if backend runs on a different port

export default function Home() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);

  // const fetchEntries = async () => {
  //   const res = await axios.get(API);
  //   setEntries(res.data);
  // };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await axios.post(API, { text });
    setText('');
    fetchEntries();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API}/${id}`);
    fetchEntries();
  };
const fetchEntries = async () => {
    const res = await axios.get(API);
    setEntries(res.data);
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Entry Manager</h1>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter text"
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {entries.map((e: any) => (
          <li key={e.id}>
            {e.text}
            <button onClick={() => handleDelete(e.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
