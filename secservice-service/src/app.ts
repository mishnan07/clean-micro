import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { Database } from './config/database';
import { errorHandler } from './presentation/middlewares/errorHandler';

// Repositories
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { BankDetailRepository } from './infrastructure/repositories/BankDetailRepository';

// Use Cases
import { CreateUser } from './application/use-cases/CreateUser';
import { LoginUser } from './application/use-cases/LoginUser';
import { GetUserProfile } from './application/use-cases/GetUserProfile';
import { UpdateUserProfile } from './application/use-cases/UpdateUserProfile';
import { CreateBankDetail } from './application/use-cases/CreateBankDetail';
import { GetBankDetails } from './application/use-cases/GetBankDetails';
import { UpdateBankDetail } from './application/use-cases/UpdateBankDetail';
import { DeleteBankDetail } from './application/use-cases/DeleteBankDetail';

// Controllers
import { AuthController } from './presentation/controllers/AuthController';
import { BankDetailController } from './presentation/controllers/BankDetailController';

// Routes
import { createAuthRoutes } from './presentation/routes/authRoutes';
import { createBankDetailRoutes } from './presentation/routes/bankDetailRoutes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private async initializeDatabase(): Promise<void> {
    await Database.connect();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Dependency Injection
    const userRepository = new UserRepository();
    const bankDetailRepository = new BankDetailRepository();

    // Use Cases
    const createUser = new CreateUser(userRepository);
    const loginUser = new LoginUser(userRepository);
    const getUserProfile = new GetUserProfile(userRepository);
    const updateUserProfile = new UpdateUserProfile(userRepository);
    const createBankDetail = new CreateBankDetail(bankDetailRepository);
    const getBankDetails = new GetBankDetails(bankDetailRepository);
    const updateBankDetail = new UpdateBankDetail(bankDetailRepository);
    const deleteBankDetail = new DeleteBankDetail(bankDetailRepository);

    // Controllers
    const authController = new AuthController(createUser, loginUser, getUserProfile, updateUserProfile);
    const bankDetailController = new BankDetailController(createBankDetail, getBankDetails, updateBankDetail, deleteBankDetail);

    // Routes
    this.app.use('/api/auth', createAuthRoutes(authController));
    this.app.use('/api/bank-details', createBankDetailRoutes(bankDetailController));

    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ success: true, message: 'SecService is running', timestamp: new Date().toISOString() });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(config.port, () => {
      console.log(`SecService running on port ${config.port}`);
    });
  }
}

const app = new App();
app.listen();

export default app;