module.exports = function(req, res, next) {
    res.set('Content-Type', 'text/html');
    // res.setStatus('404');
    setTimeout(function () {
        res.json({
            "url": "http://www.androidpolice.com/wp-content/uploads/2014/07/nexusae0_OnePlus_logo_thumb.png"
        });    
    }, 2000);
};