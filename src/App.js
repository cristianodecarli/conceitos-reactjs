import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => { fetchRepositories() }, []);

  async function fetchRepositories() {
    const response = await api.get('repositories');

    if (response && response.data)
      setRepositories(response.data)
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS`
    });

    if (response && response.data) {
      const repository = response.data;
      setRepositories([...repositories, repository]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response) {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories([...newRepositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
