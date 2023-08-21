import Dashboard from '@/components/dashboard/Dashboard';
import ApplicationLayout from '@/components/ApplicationLayout';
import {withSessionSsr} from '@/providers/auth/iron-session-config.provider';
import type { UserSession } from '@/types/auth';

interface DashboardProps {
  user?: UserSession;
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
          <Dashboard />
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