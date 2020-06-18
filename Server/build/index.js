"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const IndexRoute_1 = __importDefault(require("./routes/IndexRoute"));
const LoginRoute_1 = __importDefault(require("./routes/LoginRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const UserStatusRoute_1 = __importDefault(require("./routes/UserStatusRoute"));
const UserRoleRoute_1 = __importDefault(require("./routes/UserRoleRoute"));
const OfficeRoute_1 = __importDefault(require("./routes/OfficeRoute"));
const ClienteCompanyRoute_1 = __importDefault(require("./routes/ClienteCompanyRoute"));
const PhoneRoute_1 = __importDefault(require("./routes/PhoneRoute"));
const AddressRoute_1 = __importDefault(require("./routes/AddressRoute"));
const SnsRoute_1 = __importDefault(require("./routes/SnsRoute"));
const ClientTypeRoute_1 = __importDefault(require("./routes/ClientTypeRoute"));
const AppointmentRoute_1 = __importDefault(require("./routes/AppointmentRoute"));
const InvoiceRoute_1 = __importDefault(require("./routes/InvoiceRoute"));
const PersonalityTypeRoute_1 = __importDefault(require("./routes/PersonalityTypeRoute"));
const ProjectRoute_1 = __importDefault(require("./routes/ProjectRoute"));
const ProjectStatusRoute_1 = __importDefault(require("./routes/ProjectStatusRoute"));
const PromotionRoute_1 = __importDefault(require("./routes/PromotionRoute"));
const TaskRoute_1 = __importDefault(require("./routes/TaskRoute"));
const TaskStatusRoute_1 = __importDefault(require("./routes/TaskStatusRoute"));
const TeamLeaderRoute_1 = __importDefault(require("./routes/TeamLeaderRoute"));
const TeamRoute_1 = __importDefault(require("./routes/TeamRoute"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.port || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ' + this.app.get('port'));
        });
    }
    routes() {
        this.app.use('/', IndexRoute_1.default);
        this.app.use('/login', LoginRoute_1.default);
        this.app.use('/user', UserRoute_1.default);
        this.app.use('/userStatus', UserStatusRoute_1.default);
        this.app.use('/userRole', UserRoleRoute_1.default);
        this.app.use('/office', OfficeRoute_1.default);
        this.app.use('/client', ClienteCompanyRoute_1.default);
        this.app.use('/phone', PhoneRoute_1.default);
        this.app.use('/address', AddressRoute_1.default);
        this.app.use('/sns', SnsRoute_1.default);
        this.app.use('/clientType', ClientTypeRoute_1.default);
        this.app.use('/appointment', AppointmentRoute_1.default);
        this.app.use('/invoice', InvoiceRoute_1.default);
        this.app.use('/personalityType', PersonalityTypeRoute_1.default);
        this.app.use('/project', ProjectRoute_1.default);
        this.app.use('/projectStatus', ProjectStatusRoute_1.default);
        this.app.use('/promotion', PromotionRoute_1.default);
        this.app.use('/task', TaskRoute_1.default);
        this.app.use('/taskStatus', TaskStatusRoute_1.default);
        this.app.use('/teamLeader', TeamLeaderRoute_1.default);
        this.app.use('/team', TeamRoute_1.default);
    }
}
const server = new Server();
server.start();
