"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("./index");
exports.connect = (url = index_1.serverConfig.mongoDbUrl, opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(url, Object.assign(Object.assign({}, opts), { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }));
        console.log('MongoDB Connected...');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
//# sourceMappingURL=db.js.map