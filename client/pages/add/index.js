import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { addTask } from '../function_folder/allfunction';
import { useRouter } from 'next/router';

const defaultTheme = createTheme();

const AddTaskForm = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const reg = {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate
        };
        try {
            const response = await addTask(reg)
            console.log("Resssponse addtask", response);
            if (response && response?.status === 201) {
                reset()
                router.push('/tasks')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }

    const priorities = ["LOW", "MEDIUM", "HIGH"];
    const statuses = ["TODO", "IN_PROGRESS", "COMPLETED"];

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddTaskIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New Task
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Task Title"
                                    {...register("title")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="description"
                                    label="Task Description"
                                    {...register("description")}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="status"
                                    label="Status"
                                    defaultValue="TODO"
                                    {...register("status", { required: "Status is required" })}
                                >
                                    {statuses.map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status.replace('_', ' ')}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="priority"
                                    label="Priority"
                                    defaultValue="MEDIUM"
                                    {...register("priority")}
                                >
                                    {priorities.map((priority) => (
                                        <MenuItem key={priority} value={priority}>
                                            {priority}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dueDate"
                                    label="Due Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    {...register("dueDate")}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#1976d2', color: '#ffffff' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Add Task"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AddTaskForm;
