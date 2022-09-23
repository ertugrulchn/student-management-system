module.exports = async (message, datas, isSuccess, type, res) => {
    return res.status(type).json({
        message: message,
        data: datas,
        isSuccess: true,
    });
};
