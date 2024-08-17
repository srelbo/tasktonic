local redis = require "resty.redis"
local red = redis:new()

red:set_timeout(1000) -- 1 second

local ok, err = red:connect("redis", 6379)
if not ok then
    ngx.say("Failed to connect to Redis: ", err)
    return
end

local method = ngx.var.redis_op
local key = ngx.var.redis_key

-- Use the authenticated user's ID as part of the Redis key
local user_id = ngx.ctx.jwt_payload.user_id
local full_key = user_id .. ":" .. key

if method == "GET" then
    local res, err = red:get(full_key)
    if not res then
        ngx.say("Failed to get Redis key: ", err)
        return
    end

    ngx.say(res)
elseif method == "SET" then
    local value = ngx.var.arg_value
    local res, err = red:set(full_key, value)
    if not res then
        ngx.say("Failed to set Redis key: ", err)
        return
    end

    ngx.say("OK")
else
    ngx.say("Unsupported Redis operation")
end

red:set_keepalive(10000, 100)