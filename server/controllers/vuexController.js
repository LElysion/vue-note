
var db = global.db

var vuexController = db.collection('vuex_todo')
var vuexIdController = db.collection('ids')

export var addText = async (req, res) => { // 添加文本， 返回新的文本列表
  var text = req.body['text']
  var id = req.body['id']
  var data = {}
  if (text) {
    data.text = text
    console.log(text)
    try {
      if (id !== 0 && id !== '0') {
        data.id = id
        await vuexController.update({id: parseInt(id)}, {$set: {text: text}})
      } else {
        var _todos = await vuexIdController.find({name: 'vuex_todo_id'}).toArray()
        if (_todos.length === 0) {
          await vuexIdController.insert({name: 'vuex_todo_id', 'ids': 1})
          data.id = 1
          await vuexIdController.update({name: 'vuex_todo_id'}, {$set: {ids: 2}})
        } else {
          var ids = await vuexIdController.find({name: 'vuex_todo_id'}).toArray() // 添加id
          data.id = ids[0].ids
          var nextid = ids[0].ids + 1
          await vuexIdController.update({name: 'vuex_todo_id'}, {$set: {ids: nextid}})
        }
        await vuexController.insert(data)
      }
    } catch (err) {
      return res.json({ success: false, error: '添加失败' + err })
    }
  }

  try {
    var todos = await vuexController.find({}).toArray()
  } catch (err) {
    return res.json({ success: false, error: err })
  }
  data = {}
  data.res = { 'type': 'addText' }
  data.list = todos
  return res.json({ success: true, data: data })
}

export var getTextList = async (req, res) => { // 返回新的文本列表
  var data = {}

  try {
    var todos = await vuexController.find({}).toArray()
  } catch (err) {
    return res.json({ success: false, error: err })
  }
  data = {}
  data.res = { 'type': 'getTextList' }
  data.list = todos
  return res.json({ success: true, data: data })
}

export var getText = async (req, res) => {
  var _id = parseInt(req.body['id'])
  var data = {}
  try {
    var todos = await vuexController.find({'id': _id}).toArray()
    data.res = { 'type': 'getText' }
    data.text = todos[0]
    return res.json({ success: true, data: data })
  } catch (err) {
    return res.json({ success: false, error: err })
  }
}

export var delText = async (req, res) => {
  var _id = parseInt(req.body['id'])
  console.log(_id)
  var data = {}
  try {
    await vuexController.remove({'id': _id})
    return res.json({ success: true, data: data })
  } catch (err) {
    return res.json({ success: false, error: err })
  }
}

module.exports = {
  addText,
  getTextList,
  getText,
  delText
}
