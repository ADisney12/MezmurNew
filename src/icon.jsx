import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HomeIcon from '@mui/icons-material/Home';

export default function Icon(value){
    if (value == 0){
        return HomeIcon
    }
    if (value == 1){
        return PlaylistPlayIcon
    }
    if (value == 2){
        return LibraryMusicIcon
    }
    if (value == 3){
        return PersonSearchIcon
    }
}