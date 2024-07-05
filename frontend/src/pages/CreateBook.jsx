import React, { useState } from 'react'
import BackButton from '../component/BackButton';
import Spinner from '../component/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
      const data = {
        title,
        author,
        publishYear,
      };
      setLoading(true);
      axios
        .post('http://localhost:3000/books/${id}')
  }
  return (
    <div>CreateBook</div>
  )
}

export default CreateBook