"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.AuthUser = common_1.createParamDecorator((data, req) => {
    const token = req.headers('Authorization');
    if (token)
        try {
            req.user = jwt.verify(token, "nestapisecretjwtkey");
            return req.user;
        }
        catch (error) {
            throw new common_1.HttpException('Auth failed', common_1.HttpStatus.UNAUTHORIZED);
        }
    throw new common_1.HttpException('Auth failed', common_1.HttpStatus.UNAUTHORIZED);
});
//# sourceMappingURL=authUser.decorator.js.map