export const initializeState = (data: any) => ({
    type: 'INITIALIZE_STATE',
    stateObj: data,
});

export const addData = (companyId, dataType, data, pageNumber) => ({
    type: 'ADD_DATA',
    companyId: companyId,
    dataType: dataType,
    data: data,
    pageNumber: pageNumber,
});

export const addSingleData = (companyId, dataType, data) => ({
    type: 'ADD_SINGLE_DATA',
    companyId: companyId,
    dataType: dataType,
    data: data,
});

export const deleteSingleData = (companyId, dataType, dataId) => ({
    type: 'DELETE_SINGLE_DATA',
    companyId: companyId,
    dataType: dataType,
    dataId: dataId,
});
