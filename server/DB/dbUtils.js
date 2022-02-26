const getFormatRes = (response) => {
  return response ? response.toObject() : null;
};
const rejectErr = (err) => Promise.reject(err);

const DB = (db) => {
  let insertOne = (dataObj) => {
    let data = new db(dataObj);
    return data.save().then(getFormatRes).catch(rejectErr);
  };

  let findOne = (query = {}, requirements = {}) => {
    return db.findOne(query, requirements).then(getFormatRes).catch(rejectErr);
  };

  let findMany = (query = {}, requirements = {}) => {
    return db
      .find(query, requirements)
      .then((dataList) => dataList)
      .catch(rejectErr);
  };

  let findByKeys = (query = [], requirements = {}) => {
    query = { $or: query };
    return db
      .findOne(query, requirements)
      .then((data) => getFormatRes(data) || false)
      .catch((err) => rejectErr(err));
  };

  let updateOne = (query = {}, updateData = {}) => {
    return db
      .findOneAndUpadate(query, updateData, {
        new: true,
        useFindAndModify: false,
      })
      .then(getFormatRes)
      .catch(rejectErr);
  };

  return Object.freeze({
    insertOne,
    findByKeys,
    findMany,
    findOne,
    updateOne,
  });
};

module.exports = DB;
