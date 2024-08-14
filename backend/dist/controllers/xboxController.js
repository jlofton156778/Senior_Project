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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserXboxAchievements = void 0;
const users_1 = __importDefault(require("../models/users"));
const xboxService_1 = require("../services/xboxService");
const getUserXboxAchievements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield users_1.default.findById(userId);
        if (!user || !user.xboxId) {
            return res.status(404).send('User or Xbox ID not found');
        }
        const achievements = yield (0, xboxService_1.getXboxAchievements)(user.xboxId);
        yield user.save();
        res.json(achievements);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getUserXboxAchievements = getUserXboxAchievements;
