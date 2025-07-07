
import axios from 'axios'; // Ou 'fetch'
import { LoginRequest, LoginResponse, ErrorResponse } from '../types/auth'; // Importe os tipos

const API_BASE_URL = 'http://localhost:3000/api'; // URL do seu backend

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    // Axios erros têm uma estrutura específica
    if (axios.isAxiosError(error) && error.response) {
      const errorData: ErrorResponse = error.response.data;
      throw new Error(errorData.message || 'Erro desconhecido ao fazer login.');
    }
    throw new Error('Erro de rede ou servidor não responde.');
  }
};

// frontend/src/components/LoginForm.tsx (Exemplo em React com TypeScript)
import React, { useState } from 'react';
import { loginUser } from '../services/authService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      console.log('Login bem-sucedido!', response.token);
      // Aqui você armazenaria o token (ex: localStorage.setItem('token', response.token))
      // E redirecionaria o usuário para uma área protegida
    } catch (err: any) {
      setError(err.message || 'Falha no login. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;