exports.getDay = () => {
    const d = new Date();
    const options = {
        weekday : "long", 
        month : "long",
        day : "numeric",
    };
    return d.toLocaleDateString("en-US", options);
}