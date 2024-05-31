import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import TaskTable from "./TaskTable";
import { Payload } from "../types/payload.types";
import { useQuery } from "@apollo/client";
import { Task } from "../types/task.types";
import { GET_TASKS } from "../graphql/queries/taskQueries";
import Loading from "./Loading";
import { Stack, Typography } from "@mui/material";
import AddTask from "./AddTask";

function Main() {
  const token = localStorage.getItem("token");
  const decordedToken = jwtDecode<Payload>(token!);
  const userId = decordedToken.sub;

  const { loading, data, error } = useQuery<{ getTasks: Task[] }>(GET_TASKS, {
    variables: { userId },
  });
  return (
    <>
      <Header />
      <Stack spacing={4} direction={"column"} m={8} alignItems={"center"}>
        {loading && <Loading />}
        {error && <Typography color={"red"}>エラーが発生しました</Typography>}
        {!loading && !error && (
          <>
            <AddTask userId={userId} />
            <TaskTable tasks={data?.getTasks} userId={userId} />
          </>
        )}
      </Stack>
    </>
  );
}

export default Main;
