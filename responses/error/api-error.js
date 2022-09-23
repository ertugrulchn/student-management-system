module.exports = async (message, type, res) => {
    return res.status(type).json({
        message: message,
        isSuccess: false,
    });
};
