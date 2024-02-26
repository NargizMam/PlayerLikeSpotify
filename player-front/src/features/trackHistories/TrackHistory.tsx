import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTrackHistories} from "./trackHistorySlice.ts";
import {useEffect} from "react";
import {getTrackHistory} from "./trackHistoryThunk.ts";
import {selectUser} from "../users/usersSlice.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {ListItemIcon} from "@mui/material";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const trackHistoryList = useAppSelector(selectTrackHistories);
    const user = useAppSelector(selectUser);
    useEffect(() => {
        if(user){
            dispatch(getTrackHistory(user.token))
        }
    }, [dispatch]);




    return (
        <>
            <List sx={{ width: '100%',
                maxWidth: 900,
                bgcolor: 'background.paper',
                justifyContent: 'spaceBetween',
            }}>
                {trackHistoryList.map((value) => {
                    return (
                        <ListItem
                            sx={{border: '1px solid #000', margin: '5px'}}
                            key={value._id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                </IconButton>
                            }
                        >
                            <ListItemButton >
                                <ListItemText>
                                    <strong>{value.track.album.artist.name}</strong>
                                </ListItemText>
                                <ListItemText>
                                    {value.track.album.title}
                                </ListItemText>
                                <ListItemText>
                                    {value.track.title}
                                </ListItemText>
                                <ListItemIcon>
                                    {value.createdAt}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default TrackHistory;