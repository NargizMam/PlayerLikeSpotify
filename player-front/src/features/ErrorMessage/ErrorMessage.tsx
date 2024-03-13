import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {openSnackBar, selectShowSnackBar} from "./errorMessageSlice.ts";


interface Props {
    errorMessage: string;
}
const  ErrorMessage: React.FC<Props> = ({errorMessage}) => {
    const dispatch = useAppDispatch();
    const showErrorMessage = useAppSelector(selectShowSnackBar);

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={showErrorMessage}
                    autoHideDuration={6000}
                    onClose={() => dispatch(openSnackBar())}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{errorMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="warning"
                            onClick={() => dispatch(openSnackBar())}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    };

export default ErrorMessage;