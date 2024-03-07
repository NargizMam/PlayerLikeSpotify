// import React, {useState} from 'react';
// import { Grid, MenuItem, TextField} from '@mui/material';
// import FileInput from './UI/FileInput/FileInput.tsx';
// import {ArtistMutation, NewItemMutation} from "../types";
// import {useAppSelector} from "../app/hooks.ts";
// import {selectAlbumsList} from "../features/ albums/albumsSlice.ts";
// import {selectArtistsList} from "../features/artists/artistsSlice.ts";
// import {LoadingButton} from '@mui/lab';
//
// interface Props {
//     onSubmit: (mutation: NewItemMutation | ArtistMutation) => void;
//     model: string,
//     loading: boolean
// }
//
// const initialState = {
//     title: '',
//     description: '',
//     image: null,
// }
//
// const Form: React.FC<Props> = ({onSubmit, model, loading}) => {
//     const selectedAlbum = useAppSelector(selectAlbumsList);
//     const selectedArtist = useAppSelector(selectArtistsList);
//
//     const [state, setState] = useState<NewItemMutation>(initialState);
//     let extraInput;
//
//     const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const {name, value} = e.target;
//
//         setState(prevState => {
//             return {...prevState, [name]: value};
//         });
//     };
//     switch (model) {
//         case'albums':
//             return extraInput = (
//                 <>
//                     <Grid item xs>
//                         <TextField
//                             select
//                             id="artist" label="Выберите исполнителя"
//                             value={state?.artist}
//                             onChange={inputChangeHandler}
//                             name="artist"
//                             required
//                         >
//                             <MenuItem value="" disabled>Please select a artist</MenuItem>
//                             {selectedArtist.map(artist => (
//                                 <MenuItem key={artist._id} value={artist._id}>
//                                     {artist.title}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item xs>
//                         <TextField
//                             id="title" label="Title"
//                             value={state?.issueDate}
//                             onChange={inputChangeHandler}
//                             name="title"
//                             required
//                         />
//                     </Grid>
//                 </>
//             );
//         case'tracks':
//             return extraInput = (
//                 <>
//                     <Grid item xs>
//                         <TextField
//                             select
//                             id="artist" label="Выберите исполнителя"
//                             value={state?.artist}
//                             onChange={inputChangeHandler}
//                             name="artist"
//                             required
//                         >
//                             <MenuItem value="" disabled>Please select a artist</MenuItem>
//                             {selectedArtist.map(artist => (
//                                 <MenuItem key={artist._id} value={artist._id}>
//                                     {artist.title}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item xs>
//                         <TextField
//                             select
//                             id="album" label="Выберите альбом"
//                             value={state?.album}
//                             onChange={inputChangeHandler}
//                             name="artist"
//                             required
//                         >
//                             <MenuItem value="" disabled>Please select a artist</MenuItem>
//                             {selectedAlbum.map(album => (
//                                 <MenuItem key={album._id} value={album._id}>
//                                     {album.title}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>
//                     <Grid item xs>
//                         <TextField
//                             id="title" label="Title"
//                             value={state?.album}
//                             onChange={inputChangeHandler}
//                             name="title"
//                             required
//                         />
//                     </Grid>
//                     <Grid item xs>
//                         <TextField
//                             id="title" label="Title"
//                             value={state?.issueDate}
//                             onChange={inputChangeHandler}
//                             name="title"
//                             required
//                         />
//                     </Grid>
//                 </>
//             )
//     }
//
//
//     const submitFormHandler = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(state);
//     };
//
//
//     const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const {name, files} = e.target;
//         if (files) {
//             setState(prevState => ({
//                 ...prevState, [name]: files[0]
//             }));
//         }
//     };
//
//     return (
//         <form
//             autoComplete="off"
//             onSubmit={submitFormHandler}
//         >
//             <Grid container direction="column" spacing={2}>
//                 {extraInput && extraInput}
//                 <Grid item xs>
//                     <TextField
//                         id="title" label="Title"
//                         value={state.title}
//                         onChange={inputChangeHandler}
//                         name="title"
//                         required
//                     />
//                 </Grid>
//                 <Grid item xs>
//                     <TextField
//                         multiline rows={3}
//                         id="description" label="Description"
//                         value={state.description}
//                         onChange={inputChangeHandler}
//                         name="description"
//                     />
//                 </Grid>
//                 {model === 'track' ? null :
//                     (<Grid item xs>
//                         <FileInput
//                             label="Image"
//                             name="image"
//                             onChange={fileInputChangeHandler}
//                         />
//                     </Grid>)
//                 }
//                 <Grid item xs>
//                     <LoadingButton
//                         loading={loading}
//                         type="submit"
//                         color="primary"
//                         variant="contained">Create</LoadingButton>
//                 </Grid>
//             </Grid>
//         </form>
//     );
// };
//
// export default Form;
