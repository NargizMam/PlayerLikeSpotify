import {Button, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import AllItemsAlbum from "./AllItemsAlbum.tsx";
import {NavLink} from "react-router-dom";
import {v4} from 'uuid';
import {AdminsAlbumsApi} from "../../types";

interface Props {
    list: AdminsAlbumsApi[];
    artist: string;
}
const AllItemsArtist: React.FC<Props> = ({list, artist}) => {


    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell align="left"
                               colSpan={2}
                    >
                        <strong>{artist}</strong>
                    </TableCell>
                    <TableCell  align="left" colSpan={2}>
                        <Button component={NavLink} to='/'>Удалить</Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map(selectAlbum => (
                    <AllItemsAlbum key={v4()}
                                   album={selectAlbum ? selectAlbum : null}
                    />))}
            </TableBody>
        </>
    );
};

export default AllItemsArtist;