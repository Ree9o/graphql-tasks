import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Task } from "../types/task.types";
import { CREATE_TASK } from "../graphql/mutations/taskMutations";
import { GET_TASKS } from "../graphql/queries/taskQueries";
import { useNavigate } from "react-router-dom";

export default function AddTask({ userId }: { userId: number }) {
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    dueDate: "",
    description: "",
  });
  const [taskError, setTaskError] = useState<{ [key: string]: string }>({});
  const [createTask] = useMutation<{ createTask: Task }>(CREATE_TASK);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskError({
      name: "",
      dueDate: "",
      description: "",
    });
  };

  const resetState = () => {
    setTaskDetails({
      name: "",
      dueDate: "",
      description: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const taskSchema = z.object({
    name: z.string().min(1, "タスク名は必須です。"),
    dueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "日付は YYYY-MM-DD 形式である必要があります。")
      .optional(),
    description: z.string().optional(),
  });

  const handleAddTask = async () => {
    const validationResult = taskSchema.safeParse(taskDetails);
    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message; // issue.path[0] はエラーが発生したフィールド名
      });
      setTaskError(newErrors);
      return;
    }

    const { name, dueDate, description } = validationResult.data;
    try {
      await createTask({
        variables: { createTaskInput: { name, dueDate, description, userId } },
        refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
      });
      resetState();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          localStorage.removeItem("token");
          alert("再度サインインしてください。");
          navigate("/signIn");
          return;
        }
        alert("タスクの登録に失敗しました。");
      }
    }
  };

  return (
    <div>
      <Button variant={"contained"} sx={{ width: "270px" }} onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} fullWidth={true} maxWidth={"sm"} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            name="name"
            label="Task Name"
            type="text"
            value={taskDetails.name}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!taskError["name"]}
            helperText={taskError["name"] || ""}
          />
          <TextField
            autoFocus
            margin="normal"
            id="due-date"
            label="Due Date"
            type="text"
            name="dueDate"
            placeholder="yyyy-mm-dd"
            value={taskDetails.dueDate}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!taskError["dueDate"]}
            helperText={taskError["dueDate"] || ""}
          />
          <TextField
            autoFocus
            margin="normal"
            id="description"
            label="Description"
            type="text"
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
