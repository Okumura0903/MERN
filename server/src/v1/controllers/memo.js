const Memo = require('../models/memo');

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
