import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import { taskList, deleteTask } from '../function_folder/allfunction';
import Link from 'next/link';

const Index = () => {
    const dispatch = useDispatch();
    const { taskdata, totalpage, loading } = useSelector((state) => state.Showtask);// Data get from store
    const [currentPage, setCurrentPage] = useState(1); // Current page

    // Handle For Pagination
    const handleOnChange = (e, pageno) => {
        setCurrentPage(pageno);
    };

    // Handle For Delete
    const handleDelete = async (id) => {
        await deleteTask(id);
        dispatch(taskList({ page: currentPage, perpage: 10 })); // Substitute of refetch
    }

    useEffect(() => {
        dispatch(taskList({ page: currentPage, perpage: 10 }));
    }, [currentPage]);

    if (loading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>Loading...</h1>
    }

    return (
        <>
            <div style={{ marginTop: '100px', padding: '20px' }}>
                <Button
                    variant="contained"
                    component={Link}
                    href="/add"
                    sx={{
                        backgroundColor: '#9b4dca',
                        color: 'white',
                        mb: 2,
                        borderRadius: '20px',
                        padding: '6px 16px',
                    }}
                >
                    Add Task
                </Button>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskdata && taskdata.length > 0 ? (
                                taskdata.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value?.title}</td>
                                        <td>{value?.description}</td>
                                        <td>
                                            <span
                                                className={`badge ${value?.status === 'COMPLETED'
                                                    ? 'bg-success'
                                                    : value?.status === 'IN_PROGRESS'
                                                        ? 'bg-warning text-dark'
                                                        : 'bg-secondary'
                                                    }`}
                                            >
                                                {value?.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${value?.priority === 'HIGH'
                                                    ? 'bg-danger'
                                                    : value?.priority === 'MEDIUM'
                                                        ? 'bg-info text-dark'
                                                        : 'bg-primary'
                                                    }`}
                                            >
                                                {value?.priority}
                                            </span>
                                        </td>
                                        <td>{value?.dueDate ? new Date(value?.dueDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>
                                            <Link href={`/edit/${value?._id}`}>
                                                <button className="btn btn-sm btn-primary" style={{ fontWeight: 'bold' }}>
                                                    Update
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" style={{ fontWeight: 'bold' }} onClick={() => handleDelete(value?._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <Grid justifyContent="center">
                            {taskdata?.length !== 0 ? (
                                <Pagination
                                    count={totalpage}
                                    page={currentPage}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                    shape="rounded"
                                />
                            ) : null}
                        </Grid>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default Index;
