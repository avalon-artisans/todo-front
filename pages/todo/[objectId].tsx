import { useRouter } from 'next/router';
import {withSessionSsr} from '@/providers/auth/iron-session-config.provider';
import ApplicationLayout from '@/components/ApplicationLayout';
import { UserSession } from '@/types/auth';
import TodoService from '@/services/todo.service';
import { TodoItem } from '@/types/todo';
import ShowTodoItem from '@/components/todo/ShowTodoItem';

interface SpecificTodoProps {
  user?: UserSession;
  todo?: TodoItem;
}

export default function TodoItem(props: SpecificTodoProps) {
  const router = useRouter();

  return (
    <>
      <ApplicationLayout user={props.user}>
        <ShowTodoItem todo={props.todo} />
      </ApplicationLayout>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const { objectId } = query;
    const headers = req.headers;

    if (!objectId || objectId.length === 0) {
      return {
        props: {
          redirect: {
            url: '/dashboard',
            permanent: true,
          },
          user: req.session.user
        }
      };
    }

    const todoService = new TodoService();
    const response = await todoService.fetchSpecificTodo(objectId as string, headers);

    if (!response.success) {
      return {
        props: {
          redirect: {
            url: '/dashboard',
            permanent: true,
          },
          user: req.session.user
        }
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