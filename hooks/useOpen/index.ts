import { useState } from 'react';

export const useOpen = () => {
    const [open, setOpen] = useState(false);

    return { open, setOpen };
};
