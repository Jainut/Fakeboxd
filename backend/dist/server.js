"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const public_1 = __importDefault(require("./routes/public"));
const private_1 = __importDefault(require("./routes/private"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
const PORT = process.env.PORT || 3000;
const server = (0, http_1.createServer)(app);
app.use(express_1.default.json());
app.use('/', public_1.default);
app.use('/', private_1.default);
const selfPing = () => {
    setInterval(() => {
        fetch(`http://localhost:${PORT}/ping`)
            .then(() => console.log('Ping enviado com sucesso!'))
            .catch((error) => console.error('Erro ao enviar ping:', error));
    }, 60000); // Envia um ping a cada 60 segundos
};
server.listen(PORT, () => {
    console.log(`Rodando Fakeboxd na porta ${PORT}`);
    selfPing();
});
