import { getOneWorkPlace } from 'db/workplace';

export const getBusiness = async ({ session, db, user, query, productCatagory, ...rest }) => {
    let company = null;
    const { workplaces } = user;
    const businessId = query && (query.businessId || query.id[0]);
    const renderWorkplace = user && workplaces.length > 0 && workplaces.find((item) => item.workplaceId === businessId);
    const position = renderWorkplace.positionLabel;
    const compdata = JSON.parse(await getOneWorkPlace(db, query.businessId, position, user._id));
    company = compdata ? compdata[0] : null;
    return {
        session,
        query,
        db,
        company: { ...company, productCatagory },
        user,
        productCatagory: [...productCatagory],
        ...rest,
    };
};
