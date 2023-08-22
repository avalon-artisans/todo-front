import { withSessionSsr } from '@/providers/auth/iron-session-config.provider';
import { UserSession } from '@/types/auth';
import ApplicationLayout from '@/components/ApplicationLayout';
import TodoForm from '@/components/todo/TodoForm';

interface NewTodoProps {
  user?: UserSession;
}

export default function NewTodo(props: NewTodoProps) {
  return (
    <>
      <div className="w-screen">
        <ApplicationLayout user={props.user}>
          <TodoForm />
        </ApplicationLayout>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.user,
      }
    };
  }
)