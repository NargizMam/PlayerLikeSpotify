import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTrackHistories} from "./trackHistorySlice.ts";
import {useEffect} from "react";
import {getTrackHistory} from "./trackHistoryThunk.ts";
import {selectUser} from "../users/usersSlice.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const trackHistoryList = useAppSelector(selectTrackHistories);
    const user = useAppSelector(selectUser);
    console.log(trackHistoryList)
    useEffect(() => {
        if(user){
            dispatch(getTrackHistory(user.token))
        }
    }, [dispatch]);


    const handleToggle = (value: string) => () => {
        console.log(value)
    };

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {trackHistoryList.map((value) => {
                    const labelId = `checkbox-list-label-${value.track}`;

                    return (
                        <ListItem
                            key={value.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton >
                                <ListItemIcon>
                                    {labelId}
                                </ListItemIcon>
                                <ListItemText/>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default TrackHistory;