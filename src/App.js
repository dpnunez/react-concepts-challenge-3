import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Daniel paladino'
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const filteredRepos = repositories.filter(repo => repo.id !== id)
      setRepositories(filteredRepos)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button type='button' onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button type='button' onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
