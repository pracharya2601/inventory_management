type LooseObj = {
  [key: string]: any
}

export function productFormValidation(data) {
  let error: LooseObj = {};
  if (data.name === '') {
    error.name = 'Must have Item name.'
  }
  if (data.description === '') {
    error.description = 'Must have description'
  }
  if (data.images.length === 0) {
    error.images = 'Must upload image. Minumun of 1'
  }
  data.skus.forEach(({ color, size, count }) => {
    if (color && size && count > 0) {
      console.log('')
    } else {
      error.skus = 'Variant must include size, color and count. '
    }
  })
  if (Object.keys(error).length === 0) {
    return null;
  }
  return error;
}

export function createWorkplaceFormValidation(data) {
  let error: LooseObj = {};
  if (data.workplaceData.workplaceName === '') {
    error.workplaceName = 'Must have Workplace Name';
  }
  if (data.workplaceData.workplaceCode) {
    if (data.workplaceData.workplaceCode.length > 4) {
      error.workplaceCode = 'Code Must be more than 4 digit.';
    }
  } else {
    error.workplaceCode = 'Must have Workplace Code';
  }
  const stafferror = staffFormError(data.workplaceData.staffs);

  if (Object.keys(error).length === 0) {
    return null;
  }
  return { ...error, ...stafferror };

}

export function staffFormError(data) {
  let error: LooseObj = {};
  data.forEach((staff) => {
    for (const key in staff) {
      if (staff[key] === '') {
        error.staffs = 'Staffs form need name email and position.'
      }
    }
  })
  if (Object.keys(error).length === 0) {
    return null;
  }
  return error;
}