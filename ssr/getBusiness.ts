import { getOneWorkPlace } from 'db/workplace';

export const getBusiness = async ({ session, db, user, query, ...rest }) => {
    let company = null;
    const { workplaces } = user;
    const renderWorkplace =
        user && workplaces.length > 0 && workplaces.find((item) => item.workplaceId === query.businessId);
    const position = renderWorkplace.positionLabel;
    const compdata = JSON.parse(await getOneWorkPlace(db, query.businessId, position, user._id));
    company = compdata ? compdata[0] : null;
    return {
        session,
        query,
        db,
        company,
        user,
        ...rest,
    };
};
