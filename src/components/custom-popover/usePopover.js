import { useCallback, useState } from 'react';

const usePopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const onOpen = useCallback((e) => {
        setAnchorEl(e.currentTarget);
    }, []);

    const onClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const onCloseWithCallback = useCallback((callback) => {
        setAnchorEl(null);
        setTimeout(callback, 0);
    }, []);

    return {
        open: !!anchorEl,
        anchorEl,
        onOpen,
        onClose,
        onCloseWithCallback,
        setAnchorEl
    };
};

export default usePopover;