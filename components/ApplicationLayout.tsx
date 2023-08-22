import React, { useState } from 'react';
import {
  Navbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  SpeedDial,
  SpeedDialHandler,
  IconButton,
} from '@material-tailwind/react';
import {
  Bars3Icon,
  UserCircleIcon,
  PresentationChartBarIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/20/solid';
import AuthService from '@/services/auth.service';
import { useRouter } from 'next/router';
import {UserSession} from "@/types/auth";

interface ApplicationLayoutProps {
  children: React.ReactNode;
  user?: UserSession;
}

interface SidebarListItem {
  onClick: Function;
  icon: React.ReactNode;
  title: string;
}

/**
 * ApplicationLayout component
 * @author Kenneth Sumang
 */
export default function ApplicationLayout(props: ApplicationLayoutProps) {
  const [ isDrawerOpen, setDrawerOpen ] = useState(false);
  const router = useRouter();

  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  const routesWithoutCreateIcon: string[] = [
    '/todo/new',
  ];

  const sidebarListItems: SidebarListItem[] = [
    {
      title: 'Dashboard',
      icon: <PresentationChartBarIcon className="h-5" />,
      onClick: () => router.push('/dashboard'),
    },
    {
      title: 'Log Out',
      icon: <PowerIcon className="h-5 w-5" />,
      onClick: () => handleLogoutButtonClick(),
    },
  ];

  async function handleLogoutButtonClick() {
    const authService = new AuthService();
    await authService.processLogout();
    return router.push('/');
  }

  return (
    <>
      <Navbar
        color="blue"
        fullWidth={true}
        className="rounded-none mx-auto px-6 py-3"
      >
        <div className="flex flex-row justify-items-center">
          <Bars3Icon
            className="h-7"
            onClick={() => setDrawerOpen(true)}
          />
          <Typography
            variant="lead"
            className="ml-5"
          >
            Todo App
          </Typography>
        </div>
      </Navbar>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <div className="flex flex-row mt-5 mb-5">
          <div className="mx-5 flex flex-row">
            <UserCircleIcon className="h-12" />
            <div className="flex flex-col justify-items-center ml-3">
              <span>{props.user?.name}</span>
              <small>{props.user?.email}</small>
            </div>
          </div>
        </div>
        <hr />
        <List className="h-full">
          {
            sidebarListItems.map((item: SidebarListItem) => {
              return (
                <ListItem onClick={() => item.onClick()} key={item.title}>
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  {item.title}
                </ListItem>
              );
            })
          }
        </List>
      </Drawer>
      {
        (routesWithoutCreateIcon.includes(router.pathname))
          ? <></>
          : <div className="absolute bottom-5 right-5">
            <SpeedDial>
              <SpeedDialHandler>
                <IconButton
                  size="lg"
                  className="rounded-full"
                  onClick={() => router.push('/todo/new')}
                >
                  <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </IconButton>
              </SpeedDialHandler>
            </SpeedDial>
          </div>
      }

      <div className="m-5">
        { props.children }
      </div>
    </>
  );
}