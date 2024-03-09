import React, {useState} from 'react';
import {User} from "../../../types";
import {Button, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from "../../../app/hooks.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {logout} from "../../../features/users/usersThunk.ts";
import {getArtistsList} from "../../../features/artists/artistsThunk.ts";

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const logOuted = async () => {
    await dispatch(logout()).unwrap();
    dispatch(getArtistsList());
    navigate('/');
  };
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
          {user?.role === 'admin' && (
              <MenuItem component={NavLink} to="/allItems">Вся информация</MenuItem>
          )}
          <MenuItem component={NavLink} to="/tracksHistory">История </MenuItem>
          <MenuItem component={NavLink} to="/new-artist">Добавить исполнителя</MenuItem>
          <MenuItem component={NavLink} to="/new-album">Добавить альбом</MenuItem>
          <MenuItem component={NavLink} to="/new-track">Добавить трек</MenuItem>
          <MenuItem onClick={logOuted}>Log out</MenuItem>
        </Menu>
    </>
  );
};

export default UserMenu;