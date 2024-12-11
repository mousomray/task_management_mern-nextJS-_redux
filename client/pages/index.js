import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, TextField } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#f5f5f5' }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h3" component="h1" color="primary" gutterBottom>
              Welcome to Your Task Management App
            </Typography>
            <Typography variant="h6" component="p" color="textSecondary">
              Organize your tasks efficiently and never miss a deadline!
            </Typography>
          </Box>

          <Box textAlign="center" mb={4}>
            <Button
              variant="contained"
              component={Link}
              href="/add"
              color="primary"
              size="large"
              startIcon={<AddTaskIcon />}
              style={{ borderRadius: '20px', padding: '10px 20px' }}
            >
              Add New Task
            </Button>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#e3f2fd' }}>
                <Box textAlign="center">
                  <PendingActionsIcon color="primary" style={{ fontSize: '40px', marginBottom: '10px' }} />
                  <Typography variant="h5" color="primary" gutterBottom>
                    Pending Tasks
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Keep track of tasks that are yet to be completed.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#f1f8e9' }}>
                <Box textAlign="center">
                  <CheckCircleIcon color="success" style={{ fontSize: '40px', marginBottom: '10px' }} />
                  <Typography variant="h5" color="success" gutterBottom>
                    Completed Tasks
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Review tasks that you have successfully completed.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#fff3e0' }}>
                <Box textAlign="center">
                  <AddTaskIcon color="warning" style={{ fontSize: '40px', marginBottom: '10px' }} />
                  <Typography variant="h5" color="warning" gutterBottom>
                    All Tasks
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    View all tasks, categorized by their status.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default HomePage;
