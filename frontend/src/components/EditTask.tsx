import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task.types";
import { z } from "zod";
import { UPDATE_TASK } from "../graphql/mutations/taskMutations";
import { GET_TASKS } from "../graphql/queries/taskQueries";

type Props = {
  task: Task;
  userId: number;
};

export default function EditTask({ task, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    name: task.name,
    dueDate: task.dueDate,
    status: task.status,
    description: task.description,
  });
  const [taskError, setTaskError] = useState<{ [key: string]: string }>({});
  const [updateTask] = useMutation<{ updateTask: Task }>(UPDATE_TASK);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTaskError({
      name: "",
      dueDate: "",
      status: "",
      description: "",
    });
    resetState()
    setOpen(false);
  };

  const resetState = () => {
    setTaskDetails({
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
      description: task.description,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
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
    status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  });

  const handleUpdateTask = async () => {
    const validationResult = taskSchema.safeParse(taskDetails);
    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message; // issue.path[0] はエラーが発生したフィールド名
      });
      setTaskError(newErrors);
      return;
    }

    const { name, dueDate, description, status } = validationResult.data;
    try {
      await updateTask({
        variables: { updateTaskInput: { id: task.id, name, dueDate, description, status } },
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
        console.log(error.message);
        alert("タスクの編集に失敗しました。");
      }
    }
  };

  return (
    <div>
      <Tooltip title={"編集"}>
        <IconButton onClick={handleClickOpen}>
          <EditIcon color="action" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} fullWidth={true} maxWidth={"sm"} onClose={handleClose}>
        <DialogTitle>Edit task</DialogTitle>
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
          <FormControl fullWidth={true} margin={"normal"}>
            <InputLabel id="task-status-label">Status</InputLabel>
            <Select
              labelId={"task-status-label"}
              id="task-status"
              name="status"
              label="status"
              value={taskDetails.status}
              onChange={handleSelectChange}
              error={!!taskError["status"]}
            >
              <MenuItem value={"NOT_STARTED"}>NOT_STARTED</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>IN_PROGRESS</MenuItem>
              <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
            </Select>
          </FormControl>
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
          <Button onClick={handleUpdateTask}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
