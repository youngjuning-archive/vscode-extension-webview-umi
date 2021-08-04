import { useEffect, useState } from 'react';
import styles from './index.less';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
};

const IndexPage = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(v => {
        return v + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const cat = count % 2 ? 'Compiling Cat' : 'Coding Cat';
  return (
    <div>
      <h1 className={styles.title}>Page index {count}</h1>
      <img src={cats[cat]} width="300" alt="cat" />
    </div>
  );
};

export default IndexPage;
