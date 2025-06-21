import Header from '../../components/Header/Header'
import CardList from '../../components/CardList/CardList'
import './Home.css'

import { useState } from 'react';

const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CardList searchTerm={searchTerm} />
    </>
  )
}

export default Home