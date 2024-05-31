import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../graphql/mutations/taskMutations";
import { GET_TASKS } from "../graphql/queries/taskQueries";
import { useNavigate } from "react-router-dom";
type Props = {
  id: number;
  userId: number;
};
const DeleteTask = ({ id, userId }: Props) => {
  const [deleteTask] = useMutation<{ deleteTask: number }>(DELETE_TASK);
  const navigate = useNavigate();
  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: {
          id,
        },
        refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          localStorage.removeItem("token");
          alert("再度サインインしてください。");
          navigate("/signIn");
          return;
        }
        alert("タスクの削除に失敗しました。");
      }
    }
  };
  return (
    <div>
      <Tooltip title={"削除"}>
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon color="action" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DeleteTask;
