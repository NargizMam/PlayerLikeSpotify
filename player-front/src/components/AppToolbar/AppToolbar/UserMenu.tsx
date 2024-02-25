import React, {useState} from 'react';
import {User} from "../../../types";
import { Button, Menu, MenuItem } from '@mui/material';
import {useAppDispatch} from "../../../app/hooks.ts";
import {logOutUser} from "../../../features/users/usersSlice.ts";
import {NavLink} from "react-router-dom";

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const logOuted = () => {
    dispatch(logOutUser());
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <>
      <Button color="inherit" onClick={handleClick}>Hello, {user.username}</Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          <MenuItem component={NavLink} to="/albums">All albums</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={logOuted}>Log out</MenuItem>
        </Menu>
    </>
  );
};

export default UserMenu;