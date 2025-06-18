// auth spotify controller

const OAuth = async (req, res) => {
    const { token, input } = req.headers;
    console.log("Input Value:", input);
    console.log("Token Value:", token);

    res.status(200).json({
        success: true,
        message: `Valid tokens and input.`
    })
};

module.exports = {
    OAuth
}