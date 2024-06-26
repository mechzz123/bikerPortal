const ForumController = {};
const ForumService = require("../services/forum.service.js");
const ChatsService = require("../services/chats.service.js");

const db = require('../models/index.js');
const { where } = require("sequelize");

ForumController.add = async (req, res) => {
      try {
            req.body.userId = req.userId;
            const post = await ForumService.insertOrUpdate(req.body);
            res.status(200).send({
                  code: 200,
                  message: "Post created Successfully",
                  data: post,
            });
      } catch (error) {
            console.log("error", error);
            return res.status(500).send(error);
      }
};

ForumController.getAll = async (req, res) => {
      try {
            const post = await ForumService.getAll({
                  include: {
                    model: db.User,
                    attributes: ['name'], // Specify the attributes you want to retrieve from the User model
                  },
                  order: [['createdAt', 'DESC']],
                });
            res.status(200).send({
                  code: 200,
                  message: "Post retrieve Successfully",
                  data: post,
            });
      } catch (error) {
            console.log("error", error);
            return res.status(500).send(error);
      }
};

ForumController.get = async (req, res) => {
      try {
            const post = await ForumService.getOne({
                 where:{
                  id:req.body.id.id
                 }
                });
            res.status(200).send({
                  code: 200,
                  message: "Post retrieve Successfully",
                  data: post,
            });
      } catch (error) {
            console.log("error", error);
            return res.status(500).send(error);
      }
};


ForumController.addComment = async (req, res) => {
      try {
            req.body.forumId = req.query.conversationId;
            const post = await ChatsService.insertOrUpdate(req.body);
            res.status(200).send({
                  code: 200,
                  message: "Comment Added  Successfully",
                  data: post,
            });
      } catch (error) {
            console.log("error", error);
            return res.status(500).send(error);
      }
};
ForumController.getAllChats = async (req, res) => {
      try {
            const post = await ChatsService.getAll({
                  where:{
                        forumId:req.body.id.id
                  }
            });
            res.status(200).send({
                  code: 200,
                  message: "Comment Added  Successfully",
                  data: post,
            });
      } catch (error) {
            console.log("error", error);
            return res.status(500).send(error);
      }
};

module.exports = ForumController;
