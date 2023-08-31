import Dashboard from '@/components/dashboard/Dashboard';
import ApplicationLayout from '@/components/ApplicationLayout';
import {withSessionSsr} from '@/providers/auth/iron-session-config.provider';
import type { UserSession } from '@/types/auth';
import TodoService from "@/services/todo.service";
import {TodoItem} from "@/types/todo";

interface DashboardProps {
  user?: UserSession;
  todos?: TodoItem[];
}

/**
 * Dashboard page component
 * @author Kenneth Sumang
 * @since  2023.05.18
 */
export default function DashboardPage(props: DashboardProps) {
  return (
    <>
      <div className="w-screen">
        <ApplicationLayout user={props.user}>
          <Dashboard todos={props.todos} />
        </ApplicationLayout>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const headers = req.headers;

    const todoService = new TodoService();
    const response = await todoService.fetchTodos(headers);

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
        todos: response.data,
      }
    };
  }
)