import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  // const [templates, setTemplates] = useState('');
  const [topText, setTopText] = useState();
  const [bottomText, setBottomText] = useState();
  const [memePath, setMemePath] = useState([]);
  const [memePics, setMemePics] = useState();
  const [url, setUrl] = useState(
    'https://api.memegen.link/images/aag/_/aliens.png',
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates');
        const json = await response.json();
        setMemePath(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(memePath);
  const chooseMeme = () => {
    setUrl(
      `https://api.memegen.link/images/${memePics}/${topText}/${bottomText}.png`,
    );
  };

  const topTextChange = (event) => {
    setTopText(event.target.value);
  };

  const bottomTextChange = (event) => {
    setBottomText(event.currentTarget.value);
  };
  const onChangeMemePics = (event) => {
    setMemePics(event.currentTarget.value);
  };
  return (
    <div className="App">
      <h1>Aidan's Meme Generator</h1>
      <button onClick={chooseMeme}>Generate</button>
      <select id="memePics" value={memePics} onChange={onChangeMemePics}>
        {memePath.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div>
        <input
          placeHolder="Top Text"
          value={topText}
          onChange={topTextChange}
        />
      </div>
      <div>
        <input
          placeHolder="Bottom Text"
          value={bottomText}
          onChange={bottomTextChange}
        />
      </div>
      <div>
        <img src={url} alt="" style={{ width: 500 }} />
      </div>
    </div>
  );
}
