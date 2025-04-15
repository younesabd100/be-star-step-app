exports.dataConvert = (dataObject) => {
  const stringifyDate = JSON.stringify(dataObject);
  const shortData = stringifyDate.slice(1, 11);
  const arrData = shortData.split("-");
  const correctDataFormat = arrData[2] + "-" + arrData[1] + "-" + arrData[0];
  return correctDataFormat;
};
