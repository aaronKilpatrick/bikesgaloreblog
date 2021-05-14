
exports.getDate = () => {
    const date = new Date();

    const options = {
        month: 'long',
        day: 'numeric'
    };

    return date.toLocaleDateString('en-us', options);
}