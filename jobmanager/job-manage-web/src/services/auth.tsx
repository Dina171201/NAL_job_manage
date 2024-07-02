import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export  async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://localhost:3000/job/create', req.body, {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`,
        },
      });
      res.status(200).json(response.data);
    } catch (error:any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export  async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', req.body);
        res.status(200).json(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          res.status(error.response?.status || 500).json({ error: error.message });
        } else if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }

  export  async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', req.body);
        res.status(200).json(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          res.status(error.response?.status || 500).json({ error: error.message });
        } else if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }