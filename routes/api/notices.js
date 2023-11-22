const express = require("express");
const {
  validationMiddleware,
  uploadMiddleware,
  authenticate,
} = require("../../middleware");
const schema = require("../../schemas/notice");
const ctrlNotice = require("../../controllers/notices");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notices
 *   description: Notice management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notice:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The notice's title
 *         category:
 *           type: string
 *           description: The notice's category
 *         name:
 *           type: string
 *           description: The notice's name
 *         date:
 *           type: string
 *           description: The notice's date
 *         type:
 *           type: string
 *           description: The notice's type
 *         sex:
 *           type: string
 *           description: The notice's sex
 *         location:
 *           type: string
 *           description: The notice's location
 *         price:
 *           type: string
 *           description: The notice's price
 *         comments:
 *           type: string
 *           description: Comments about the notice
 *         avatarURL:
 *           type: string
 *           description: URL of the notice's avatar
 *         owner:
 *           type: string
 *           description: Owner's ID
 */

/**
 * @swagger
 * /api/notices:
 *   get:
 *     summary: Get all notices
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 *       500:
 *         description: Server error
 */

router.get("/", wrapper(ctrlNotice.listNotices));

/**
 * @swagger
 * /api/notices/addNotice:
 *   post:
 *     summary: Add a new notice
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               type:
 *                 type: string
 *               sex:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: string
 *               comments:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Notice added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       404:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */

router.post(
  "/addNotice",
  authenticate,
  uploadMiddleware.single("image"),
  validationMiddleware(schema.addNotice),
  wrapper(ctrlNotice.addNotice)
);

/**
 * @swagger
 * /api/notices/deleteNotice/{noticeId}:
 *   delete:
 *     summary: Delete a notice
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noticeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notice to be deleted
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       403:
 *         description: Not authorized to delete this notice
 *       404:
 *         description: Notice not found
 *       500:
 *         description: Server error
 */

router.delete(
  "/deleteNotice/:noticeId",
  authenticate,
  wrapper(ctrlNotice.deleteNotice)
);
/**
 * @swagger
 * /api/notices/in-good-hands:
 *   get:
 *     summary: Get notices in good hands
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: A list of notices in good hands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 *       500:
 *         description: Server error
 */
router.get("/in-good-hands", wrapper(ctrlNotice.listInGoodHands));

/**
 * @swagger
 * /api/notices/sell:
 *   get:
 *     summary: Get notices for sale
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: A list of notices for sale
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 *       500:
 *         description: Server error
 */
router.get("/sell", wrapper(ctrlNotice.listSell));
/**
 * @swagger
 * /api/notices/lost-found:
 *   get:
 *     summary: Get lost and found notices
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: A list of lost and found notices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 *       500:
 *         description: Server error
 */
router.get("/lost-found", wrapper(ctrlNotice.listLostFound));
/**
 * @swagger
 * /api/notices/getOne/{noticeId}:
 *   get:
 *     summary: Get a single notice by ID
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: noticeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notice to retrieve
 *     responses:
 *       200:
 *         description: A single notice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       404:
 *         description: Notice not found
 *       500:
 *         description: Server error
 */
router.get("/getOne/:noticeId", wrapper(ctrlNotice.getOne));
/**
 * @swagger
 * /api/notices/myNotices:
 *   get:
 *     summary: Get user's notices
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user's notices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 *       500:
 *         description: Server error
 */

router.get("/myNotices", authenticate, wrapper(ctrlNotice.listMyNotices));

module.exports = router;
