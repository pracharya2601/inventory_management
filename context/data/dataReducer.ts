const data: any = {
  hello: {
    product: {
      order: {
        data: [],
        page: 0,
        pageCount: {}
      }

    }
  }
}
export const initialState: any = {
  data: {}
}


export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return {
        ...state,
        data: action.stateObj
      }
    case "ADD_DATA":
      console.log(action)
      return {
        ...state,
        data: {
          ...state.data,
          [action.companyId]: {
            ...state.data[action.companyId],
            [action.dataType]: {
              ...state.data[action.companyId][action.dataType],
              data: state.data.hello.product.data.concat(action.data),
              pageNumber: action.pageNumber,
              pageCache: {
                ...state.data[action.companyId][action.dataType].pageCache,
                [action.pageCache]: "cached"
              }
            }
          }
        }
      }
    case "ADD_SINGLE_DATA":
      const index = state.data[action.companyId][action.dataType].findIndex(item => item._id !== action.data._id);
      const newArrayData = state.data[action.companyId][action.dataType];
      newArrayData[index] = action.data;
      return {
        ...state,
        data: {
          ...state.data,
          [action.companyId]: {
            ...state.data[action.companyId],
            [action.dataType]: {
              ...state.data[action.companyId][action.dataType],
              data: newArrayData,
            }
          }
        }
      };

    case "DELETE_SINGLE_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.companyId]: {
            ...state.data[action.companyId],
            [action.dataType]: {
              ...state.data[action.companyId][action.dataType],
              data: state.data[action.companyId][action.dataType].filter(item => item._id !== action.dataId),
            }
          }
        }
      };
    default:
      return state;
  }
}