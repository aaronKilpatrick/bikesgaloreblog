
exports.getDate = () => {
    const date = new Date();

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    return date.toLocaleDateString('en-us', options);
}