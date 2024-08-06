import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { getRecords, deleteRecord } from '../services/api';

function Records() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await getRecords();
      setRecords(response.data);
    };
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Records</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Operation</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Response</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record._id}>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.amount}</TableCell>
              <TableCell>{record.user_balance}</TableCell>
              <TableCell>{record.operation_response}</TableCell>
              <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(record._id)} color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Records;