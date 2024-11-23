const admin = require('./firebase')

exports.sendMessage = async ({
    body = '',
    title = '',
    subtitle = '',
    tokens = ['trynotify'],
    user,
    imageUrl = 'https://res.cloudinary.com/dgneiaky7/image/upload/v1728010631/products/pstnuskit4hycbl81dlb.png'
}) => {
    // Fetch the tokens from an external datastore (e.g. database)
    // const tokens = await getTokensFromDatastore();

    // Send a message to devices with the registered tokens
    await admin.messaging().sendEachForMulticast({
        tokens: tokens,
        data: {
            // userId: user._id.toString(),
        },
        notification: {
            title: title,
            body: body,
            imageUrl: imageUrl
        }
    });
}