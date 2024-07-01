import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Card, CardContent, makeStyles } from '@mui/material';


const UserList: React.FC<{ users: any[]; onEdit: (user: any) => void; onDelete: (id: number) => void }> = ({ users, onEdit, onDelete }) => {
  
  return (
    <Card>
      <CardContent>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => onEdit(user)} variant="contained" color="primary" size="small" className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(user.id)} variant="contained" color="secondary" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserList;
