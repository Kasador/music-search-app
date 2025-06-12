// auth spotify controller

const OAuth = async (req, res) => {
    res.status(200).json({
        message: `My name is ${req.user}`
    })
};

module.exports = {
    OAuth
}