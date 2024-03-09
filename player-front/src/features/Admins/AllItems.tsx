import {Paper, Table, TableContainer} from "@mui/material";
import AllItemsArtist from "./AllItemsArtist.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getAdminsAlbumsList} from "./adminsThunk.tsx";
import {selectList} from "./adminsSlice.tsx";

const AllItems = () => {
    const dispatch = useAppDispatch();
    const artistList = useAppSelector(selectList);
    console.log(artistList)
    useEffect(() => {
        dispatch(getAdminsAlbumsList());
    }, [dispatch]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {artistList.map(artistList => (
                        <AllItemsArtist key={artistList._id}
                                        list={artistList}
                                        artist={artistList[0].artist}
                        />
                    ))}
                </Table>
            </TableContainer>
                </>
    );
};

export default AllItems;