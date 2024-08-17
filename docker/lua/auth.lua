local jwt = require "resty.jwt"

local jwt_secret = os.getenv("JWT_SECRET")
if not jwt_secret then
    ngx.log(ngx.ERR, "JWT_SECRET environment variable not set")
    return ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
end

local auth_header = ngx.req.get_headers()["Authorization"]
if not auth_header then
    ngx.status = ngx.HTTP_UNAUTHORIZED
    ngx.header.content_type = "application/json"
    ngx.say('{"error":"Missing Authorization header"}')
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

local _, _, token = string.find(auth_header, "Bearer%s+(.+)")

if not token then
    ngx.status = ngx.HTTP_UNAUTHORIZED
    ngx.header.content_type = "application/json"
    ngx.say('{"error":"Invalid Authorization header format"}')
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

local jwt_obj = jwt:verify(jwt_secret, token)
if not jwt_obj.verified then
    ngx.status = ngx.HTTP_UNAUTHORIZED
    ngx.header.content_type = "application/json"
    ngx.say('{"error":"Invalid token"}')
    return ngx.exit(ngx.HTTP_UNAUTHORIZED)
end

-- If we get here, the token is valid
-- You can add additional checks here if needed, e.g., checking specific claims

-- Store the decoded token payload in ngx.ctx for later use if needed
ngx.ctx.jwt_payload = jwt_obj.payload