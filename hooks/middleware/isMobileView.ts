export const isMobileView = (req: Request) => {
    return Boolean(
        (req ? req.headers['user-agent'] : navigator.userAgent).match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
        ),
    );
};
