export const endpoints = {
    crud: {
        addtask: "post/tasks",
        tasklist: "get/tasks",
        edittask: "put/tasks",
        deletetask: "delete/tasks"
    }
}

export const myendpoints = [
    endpoints.crud.addtask, // Index 0
    endpoints.crud.tasklist, // Index 1 
    endpoints.crud.edittask, // Index 2
    endpoints.crud.deletetask // Index 3
]