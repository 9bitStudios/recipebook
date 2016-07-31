exports.AppendPageInfo = function(request, response, next) {

    response.pageInfo = { };
    next();

}