import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { performOperation, getOperations } from '../services/api';

function Calculator() {
  const [type, setType] = useState('');
  const [args, setArgs] = useState([]);
  const [result, setResult] = useState('');
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      const response = await getOperations();
      setOperations(response.data);
    };
    fetchOperations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await performOperation(type, args);
      setResult(response.data.result);
    } catch (error) {
      console.error('Operation failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Calculator</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Operation</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            {operations.map((operation) => (
              <MenuItem key={operation._id} value={operation.type}>
                {operation.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Arguments (comma separated)"
          fullWidth
          margin="normal"
          value={args}
          onChange={(e) => setArgs(e.target.value.split(',').map(Number))}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Calculate
        </Button>
      </form>
      {result && (
        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Result: {result}
        </Typography>
      )}
    </Container>
  );
}

export default Calculator;