import express from 'express';
import { folderCreateHandler, fileUploadHandler, userCrateHandler, userListingHandler, uploadFileRender, readStreamHandler, readTextStreamHandler } from '../controller/userCreate.controller.js';
import { errorHandler } from '../middleware/errorHandler.middleware.js';
import { detailLogger } from '../middleware/detailLogger.middleware.js';
import { globalTestingMiddleware } from '../middleware/globalTesting.middleware.js';
import { uploadFile } from '../controller/userCreate.controller.js';
const router = express.Router();

router.use(errorHandler); //error handling middleware for all routes in this router
router.use(globalTestingMiddleware); //global testing middleware for all routes in this router



router.post('/createUser', userCrateHandler)
.get('/',detailLogger ,userListingHandler)
.get('/uploadFile', uploadFileRender)
.get('/createFolder', folderCreateHandler)
.get('/readStream', readStreamHandler)
.get('/readTextStream', readTextStreamHandler)
.post('/uploadFile',uploadFile.single('file') , fileUploadHandler)

;

export default router;