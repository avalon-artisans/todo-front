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
  SpeedDialContent,
  SpeedDialAction
} from '@material-tailwind/react';
import {
  Bars3Icon,
  UserCircleIcon,
  PresentationChartBarIcon,
  HomeIcon
} from '@heroicons/react/24/solid';
import {PlusIcon} from "@heroicons/react/20/solid";

/**
 * ApplicationLayout component
 * @author Kenneth Sumang
 */
export default function ApplicationLayout({ children }: React.PropsWithChildren) {
  const [ isDrawerOpen, setDrawerOpen ] = useState(false);

  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

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
              <span>Example User</span>
              <small>admin@example.com</small>
            </div>
          </div>
        </div>
        <hr />
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </List>
      </Drawer>
        <div className="absolute bottom-5 right-5">
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction className="relative">
                <HomeIcon className="h-5 w-5" />
                <Typography {...labelProps}>Home</Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      <div className="m-5">
        { children }
      </div>
    </>
  );
}