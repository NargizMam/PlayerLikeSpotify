import {TableCell, TableRow} from "@mui/material";
import {AlbumsApi} from "../../types";
import React from "react";

interface Props {
    album: AlbumsApi | null;
}
const AllItemsAlbum: React.FC<Props> = ({album}) => {

    return (
        <>
                <TableRow>
                    <TableCell align="center" colSpan={2}>
                        {album?.title}
                        {/*{selectTrackList.map(selectTrack => (*/}
                        {/*    <TableRow>*/}
                        {/*        <TableCell>{selectTrack.title}</TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*))}*/}
                    </TableCell>
                </TableRow>
            {/*{fetchError &&*/}
            {/*    <TableRow>*/}
            {/*    <TableCell align="center" colSpan={2}>*/}
            {/*        {fetchError}*/}
            {/*        /!*{selectTrackList.map(selectTrack => (*!/*/}
            {/*        /!*    <TableRow>*!/*/}
            {/*        /!*        <TableCell>{selectTrack.title}</TableCell>*!/*/}
            {/*        /!*    </TableRow>*!/*/}
            {/*        /!*))}*!/*/}
            {/*    </TableCell>*/}
            {/*</TableRow>}*/}



        </>
    );
};

export default AllItemsAlbum;