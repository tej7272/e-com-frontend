
import { useCallback, useState } from 'react';


const usePopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const onOpen = useCallback((e) => {
        setAnchorEl(e.currentTarget);
    },[])

    const onClose = useCallback(() => {
        setAnchorEl(null);
    },[])

    return {
        open: !!anchorEl,
        anchorEl,
        onOpen,
        onClose,
        setAnchorEl
    }
}

export default usePopover;