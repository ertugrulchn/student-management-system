/* eslint-disable no-undef */
getAll = async (model) => {
    const dbQuery = await model.findAll();

    return dbQuery;
};

getById = async (model, id) => {
    const dbQuery = await model.findByPk(id);

    return dbQuery;
};

getOneByQuery = async (model, query) => {
    const dbQuery = await model.findOne({ where: query });

    return dbQuery;
};

getByQuery = async (model, query) => {
    const dbQuery = await model.findAll({ where: query });

    return dbQuery;
};

create = async (model, data) => {
    const dbQuery = await model.create(data);

    return dbQuery;
};

updateById = async (model, id, data) => {
    const dbQuery = await model.update(data, { where: { id: id } });

    return dbQuery;
};

updateByQuery = async (model, query, data) => {
    const dbQuery = await model.update(data, { where: query });

    return dbQuery;
};

deleteById = async (model, id) => {
    const dbQuery = await model.destroy({ where: { id: id } });

    return dbQuery;
};

deleteByQuery = async (model, query) => {
    const dbQuery = await model.destroy({ where: query });

    return dbQuery;
};

module.exports = {
    getAll,
    getById,
    getOneByQuery,
    getByQuery,
    create,
    updateById,
    updateByQuery,
    deleteById,
    deleteByQuery,
};
