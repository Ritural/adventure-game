import * as React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div className=''>
    <h1>Home</h1>
    <Link to='/game'>
      Game
    </Link>
  </div>
);
