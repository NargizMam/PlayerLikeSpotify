import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTrackHistories, selectTrackHistoryFetching} from "./trackHistorySlice.ts";
import {useEffect} from "react";
import {getTrackHistory} from "./trackHistoryThunk.ts";
import {selectUser} from "../users/usersSlice.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {ListItemIcon} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/UI/Spinner/Loading.tsx";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const trackHistoryList = useAppSelector(selectTrackHistories);
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectTrackHistoryFetching);

    useEffect(() => {
        if(user){
            dispatch(getTrackHistory(user.token));
        }
        navigate('/');

    }, [dispatch]);


    return (
        <>
            {loading && <Loading/>}
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