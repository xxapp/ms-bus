module.exports = function(req, res, next) {
    res.set('Content-Type', 'text/html');
    // res.setStatus('404');
    setTimeout(function () {
        res.json({
            "url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        });    
    }, 500);
};