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
exports.db = void 0;
const mockDatabase = {
    vlogs: [],
    comments: [],
    users: [],
};
exports.db = {
    insert(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = `${Date.now()}`;
            const newData = Object.assign({ id }, data);
            mockDatabase[table].push(newData);
            return newData;
        });
    },
    findOne(table, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return mockDatabase[table].find((item) => Object.keys(query).every((key) => item[key] === query[key]));
        });
    },
    update(table, query, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.findOne(table, query);
            if (item) {
                Object.assign(item, updates);
            }
            return item;
        });
    },
};
