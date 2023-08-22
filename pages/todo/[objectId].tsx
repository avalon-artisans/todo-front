import { useRouter } from 'next/router';
import {withSessionSsr} from "@/providers/auth/iron-session-config.provider";
import ApplicationLayout from "@/components/ApplicationLayout";
import {UserSession} from "@/types/auth";
import TodoService from "@/services/todo.service";
import {TodoItem} from "@/types/todo";
import {useEffect} from "react";

interface SpecificTodoProps {
  user?: UserSession;
  todo?: TodoItem;
}

export default function TodoItem(props: SpecificTodoProps) {
  const router = useRouter();

  useEffect(() => {
    if (!props.todo) {
      router.push('/dashboard');
    }
  }, [props.todo]);

  return (
    <>
      <ApplicationLayout user={props.user}>
        <></>
      </ApplicationLayout>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const { objectId } = query;
    if (!objectId || objectId.length === 0) {
      return {
        props: { user: req.session.user }
      };
    }

    const todoService = new TodoService();
    const response = await todoService.fetchSpecificTodo(objectId as string);

    if (!response.success) {
      return {
        props: { user: req.session.user }
      };
    }

    return {
      props: {
        user: req.session.user,
        todo: response.data,
      }
    };
  }
)