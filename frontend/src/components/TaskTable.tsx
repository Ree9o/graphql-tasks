import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Task } from "../types/task.types";
import { TableRow } from "@mui/material";
import EditTask from "./EditTask";

type Props = {
  tasks: Task[] | undefined;
  userId: number;
};

export default function TaskTable({ tasks, userId }: Props) {
  return (
    <TableContainer component={Paper} sx={{ width: "80%", m: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow key={task.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="task">
                {task.name}
              </TableCell>
              <TableCell align="right">{task.name}</TableCell>
              <TableCell align="right">{task.dueDate}</TableCell>
              <TableCell align="right">{task.status}</TableCell>
              <TableCell align="right">
                <EditTask task={task} userId={userId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
