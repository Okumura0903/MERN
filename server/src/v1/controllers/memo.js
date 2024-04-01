const Memo = require('../models/memo');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    //メモの新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    return res.status(201).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const userId = req.user._id;
    //メモの取得
    const memos = await Memo.find({
      user: userId,
    }).sort('-position');
    return res.status(200).json(memos);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getMemo = async (req, res) => {
  try {
    const memoId = req.params.memoId;
    //メモの取得
    const memo = await Memo.findOne({
      user: req.user._id,
      _id: memoId,
    });
    // if (!memo) {
    //   return res.status(404).json();
    // }
    return res.status(200).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const memoId = req.params.memoId;
    if (req.body.title === '') {
      req.body.title = '無題';
    }
    if (req.body.description === '') {
      req.body.description = 'ここに自由に記入してください';
    }
    //メモの更新
    const memo = await Memo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: memoId,
      },
      {
        // title: req.body.title,
        // description: req.body.description,
        // $set: req.body,
        $set: {
          title: req.body.title,
          description: req.body.description,
          icon: req.body.icon,
          favorite: req.body.favorite,
        },
      }
    );
    return res.status(200).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const memoId = req.params.memoId;
    const deletedMemo = await Memo.findOne({
      user: req.user._id,
      _id: memoId,
    });
    //メモの削除
    await Memo.deleteOne({
      user: req.user._id,
      _id: memoId,
    });
    const updatedMemo = await Memo.updateMany(
      {
        user: req.user._id,
        position: {
          $gt: deletedMemo.position,
        },
      },
      { $inc: { position: -1 } }
    );

    return res.status(200).json();
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
};

exports.sort = async (req, res) => {
  try {
    req.body.forEach(async (memo) => {
      await Memo.findOneAndUpdate(
        {
          user: req.user._id,
          _id: memo._id,
        },
        {
          $set: {
            position: memo.position,
          },
        }
      );
    });
    const userId = req.user._id;
    //メモの取得
    const memos = await Memo.find({
      user: userId,
    }).sort('-position');

    return res.status(200).json(memos);
  } catch (err) {
    return res.status(500).json(err);
  }
};
