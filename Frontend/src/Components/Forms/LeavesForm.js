// SimpleForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isValidUser } from '../Util/Helper';

const defaultData = {
  email: '',
  casualLeave: 0,
  sickLeave: 0,
  privilegedLeave: 0,
  maternityLeave: 0,
  parentalLeave: 0,
};

export default function LeavesForm() {
  const API_PORT = 3001;
  const [formData, setFormData] = useState(defaultData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const userHasLeaves = async(email) => {
      const response = await fetch(`http://localhost:${API_PORT}/leaves/leaves/${email}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!isValidUser(response)) {
        return [];
      }
      return await response.json();
    };

    const userLeaves = await userHasLeaves(formData.email);

    console.log(userLeaves);

    const addLeaves = async(data) => {
      const response = await fetch(`http://localhost:${API_PORT}/leaves/add-leaves`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      console.log(response);

      if (response.ok) {
        setFormData(defaultData);
        navigate('/admin');
      }
    };

    try {
      if (userLeaves.length === 0) {
        addLeaves(formData);
      }
    } catch(err) {
      console.log(err);
    }

  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add User Leaves
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="User Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Casual leaves"
          name="casualLeave"
          type="number" // Use type "tel" for phone numbers
          value={formData.casualLeave}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sick leaves"
          name="sickLeave"
          type="number" // Use type "tel" for phone numbers
          value={formData.sickLeave}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Privileged leaves"
          name="privilegedLeave"
          type="number" // Use type "tel" for phone numbers
          value={formData.privilegedLeave}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Maternity leaves"
          name="maternityLeave"
          type="number" // Use type "tel" for phone numbers
          value={formData.maternityLeave}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Parental leaves"
          name="parentalLeave"
          type="number" // Use type "tel" for phone numbers
          value={formData.parentalLeave}
          onChange={handleChange}
          margin="normal"
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
