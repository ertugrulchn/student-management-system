module.exports = async (message, isSuccess, type, res) => {
    return res.status(type).json({
        message: message,
        isSuccess: true,
    });
};
