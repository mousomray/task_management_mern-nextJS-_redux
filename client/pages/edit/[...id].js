import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { editTask, singletask } from '../function_folder/allfunction';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const defaultTheme = createTheme();

const EditTaskForm = () => {

    const router = useRouter();
    const { id } = router.query
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
    const [loading, setLoading] = useState(false);


    // Get task For Single Value (Start)
    const getTask = async () => {
        try {
            const response = await singletask(id);
            console.log("Single response...", response);
            console.log("Dattt", response?.dueDate);

            const reg = {
                title: response?.title,
                description: response?.description,
                status: response?.status,
                priority: response?.priority,
                dueDate: response?.dueDate?.split('T')[0] // Ensure date format is YYYY-MM-DD
            };
            reset(reg)
            return response
        } catch (error) {
            console.log(error);
        }
    };

    const { data: singledata } = useQuery({ queryFn: getTask, queryKey: ['singletask', id] }) // 
    // Get product For Single Value (End)

    console.log("My single data...",singledata);

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
            const response = await editTask({ data: reg, id })
            console.log("Resssponse edittask", response);
            if (response && response?.status === 200) {
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
                        Edit Existing Task
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Task Title"
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
                                    {...register("description")}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Controller
                                        name="status"
                                        control={control} // Use control from React Hook Form
                                        defaultValue={singledata?.status || ''} // Default brand value
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="status-label"
                                                id="status"
                                                label="Status"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'rgba(25, 118, 210, 0.5)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#1976d2',
                                                        }
                                                    }
                                                }}
                                            >
                                                <MenuItem value="TODO">TODO</MenuItem>
                                                <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                                                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel id="priority-label">Priority</InputLabel>
                                    <Controller
                                        name="priority"
                                        control={control} // Use control from React Hook Form
                                        defaultValue={singledata?.priority || ''} // Default brand value
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="priority-label"
                                                id="priority"
                                                label="Priority"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'rgba(25, 118, 210, 0.5)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#1976d2',
                                                        }
                                                    }
                                                }}
                                            >
                                                <MenuItem value="HIGH">HIGH</MenuItem>
                                                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                                                <MenuItem value="LOW">LOW</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
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
                            {loading ? <CircularProgress size={24} /> : "Edit Task"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default EditTaskForm;
