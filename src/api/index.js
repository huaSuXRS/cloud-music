import request from '@/api/request.js'

// 获取推荐页面轮播图素材
export const getBannerAPI = function () {
  return request.get('/banner')
}

// 获取 热门推荐
export const getHotRecommenAPI = function (_limit) {
  return request.get('/personalized', {
    params: {
      limit: _limit
    }
  })
}

// 获取 新碟上架
// http://localhost:3000/album/newest
export const getNewAlbumAPI = function () {
  return request.get('/album/newest')
}

// 获取 新碟上架区域
// http://localhost:3000/top/album?offset=0&limit=30&year=2019&month=6
// 可选参数 :
// limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
// type : new:全部 hot:热门,默认为 new
// year : 年,默认本年
// month : 月,默认本月
export const getAlbumAPI = function (limit, offset, area, type) {
  return request.get('/top/album', {
    params: {
      limit,
      offset,
      area,
      type
    }
  })
}

// 获取 新碟具体音乐信息
// http://localhost:3000/album?id=32311
export const getAlbumDetailAPI = function (id) {
  return request.get('/album', {
    params: {
      id
    }
  })
}

// 获取 榜单
// http://localhost:3000/toplist?idx=6
export const getBillAPI = function () {
  return request.get('/toplist')
}

// 获取 歌单详情
// http://localhost:3000/playlist/detail?id=24381616
export const getPlayListAPI = function (_id) {
  return request.get('/playlist/detail', {
    params: {
      id: _id
    }
  })
}

// 获取 歌曲详情
// http://localhost:3000/comment/music?id=186016&limit=1
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
export const getMusicCommentAPI = function (_id, _limit, _offset) {
  return request.get('/comment/music', {
    params: {
      id: _id,
      limit: _limit,
      offset: _offset
    }
  })
}

// 获取 歌曲评论
// 必选参数 : `ids`: 音乐 id, 如 `ids=347230`,(支持多个 id, 用 `,` 隔开)
// http://localhost:3000/song/detail?ids=347230,347231
export const getSongListAPI = function (_ids) {
  return request.get('/song/detail', {
    params: {
      ids: _ids
    }
  })
}

// 获取音乐url
// http://localhost:3000/song/url?id=405998841,33894312
// 必选参数 : id : 音乐 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
export const getSongUrlAPI = function (_id) {
  return request.get('/song/url', {
    params: {
      id: _id
    }
  })
}

// 获取当前播放音乐的歌词
// http://localhost:3000/lyric?id=33894312
// 必选参数 : id : 音乐 id（传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )）
export const getLyricAPI = function (_id) {
  return request.get('/lyric', {
    params: {
      id: _id
    }
  })
}

// 获取入驻歌手
// http://localhost:3000/artist/list?cat=5001
// 必选参数 : cat : 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?cat=1001&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列
export const getArtistsAPI = function (_cat, _limit, _offset) {
  return request.get('/artist/list', {
    params: {
      cat: _cat,
      limit: _limit,
      offset: _offset
    }
  })
}

// 获取热门主播
// http://localhost:3000/dj/toplist/popular?limit=30
export const getHotDjAPI = function (_limit) {
  return request.get('/dj/toplist/popular', {
    params: {
      limit: _limit
    }
  })
}

// 获取二维码key
// http://localhost:3000/login/qr/key
export const getLoginQrKeyAPI = function () {
  return request.get('/login/qr/key')
}

// 二维码生成接口
// http://localhost:3000/login/qr/create/login/qr/create?key=xxxxxx
export const getLoginQrCreate = function (_key) {
  return request.get('/login/qr/create/login/qr/create', {
    params: {
      key: _key
    }
  })
}

// 二维码检测扫描状态接口
// http://localhost:3000/login/qr/check?key=xxxxxx
export const getLoginQrCheck = function (_key) {
  return request.get('/login/qr/check', {
    params: {
      key: _key
    }
  })
}

// 发送验证码给手机
// http://localhost:3000/captcha/sent?phone=
export const sentVCodeAPI = function (_phone) {
  return request.get('/captcha/sent', {
    params: {
      phone: _phone
    }
  })
}

// 校验验证码
// http://localhost:3000/captcha/verify?phone=?captcha=?
export const getVerifyAPI = function (_phone, _captcha) {
  return request.get('/captcha/verify', {
    params: {
      phone: _phone,
      captcha: _captcha
    }
  })
}
// 手机登录（验证码）
// http://localhost:3000/login/cellphone?phone=&captcha=
export const getLoginByVCodeAPI = function (_phone, _captcha) {
  return request.get('/login/cellphone', {
    params: {
      phone: _phone,
      captcha: _captcha
    }
  })
}

// 手机登录（密码）
// http://localhost:3000/login/cellphone?phone=&password=
export const getLoginByPasswordAPI = function (_phone, _password) {
  return request.get('/login/cellphone', {
    params: {
      phone: _phone,
      password: _password
    }
  })
}

// 获取账号信息
// http://localhost:3000/user/account?cookie=xxxxxxx
export const getAccountAPI = function (_cookie) {
  return request.get('/user/account', {
    params: {
      cookie: _cookie
    }
  })
}

// 获取用户信息
// http://localhost:3000/user/detail
export const getUserInfoAPI = function (_uid, _cookie) {
  return request.get('/user/detail', {
    params: {
      uid: _uid,
      cookie: _cookie
    }
  })
}

// 退出登录
// http://localhost:3000/logout
export const getLoginOutAPI = function () {
  return request.get('/logout')
}

// 获取所有榜单
// http://localhost:3000/toplist
export const getTopListAPI = function () {
  return request.get('/toplist')
}

// 获取歌单评论 /comment/playlist?id=705123491
// http://localhost:3000/comment/playlist?id=705123491,limit=20,offset=0
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
export const getPlayListCommentAPI = function (_id, _limit, _offset) {
  return request.get('/comment/playlist', {
    params: {
      id: _id,
      limit: _limit,
      offset: _offset
    }
  })
}

// 获取歌单(网友精选碟)
// http://localhost:3000/top/playlist?limit=10&order=new&cat=全部
// order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
export const getPlayListCatAPI = function (_limit, _order, _cat, _offset) {
  return request.get('/top/playlist', {
    params: {
      limit: _limit,
      order: _order,
      cat: _cat,
      offset: _offset
    }
  })
}

// 获取歌单分类
// http://localhost:3000/playlist/catlist
export const getCatListAPI = function () {
  return request.get('/playlist/catlist')
}

// 获取电台分类 /dj/catelist
// http://localhost:3000/dj/catelist
export const getCateList = function () {
  return request.get('/dj/catelist')
}

// 获取推荐电台节目 /program/recommend
// http://localhost:3000/program/recommend
export const getPorgramRecomAPI = function () {
  return request.get('/program/recommend')
}

// 获取电台节目排行榜
// http://localhost:3000/dj/program/toplist?limit=1
// order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
export const getPorgramTopAPI = function (_limit) {
  return request.get('/dj/program/toplist', {
    params: {
      limit: _limit
    }
  })
}

// 获取电台 - 类别热门电台
// http://localhost:3000/dj/radio/hot?cateId=2001
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// cateId: 类别 id,可通过 /dj/category/recommend 接口获取
export const getDjRadioHotAPI = function (_cateId, _limit, _offset) {
  return request.get('/dj/radio/hot', {
    params: {
      cateId: _cateId,
      limit: _limit,
      offset: _offset
    }
  })
}

// 热门歌手
// http://localhost:3000/top/artists?offset=0&limit=30
export const getArtistListAPI = function (limit) {
  return request.get('/top/artists', {
    params: {
      limit
    }
  })
}

// 歌手分类列表
// http://localhost:3000/artist/list?type=-1,area=-1,initial=-1,limit=30,offset=0
// type=-1,area=-1,initial=-1,limit=30,offset=0
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
// type 取值:
export const getArtistTypeAPI = function (type, area, initial, limit, offset) {
  return request.get('/artist/list', {
    params: {
      type,
      area,
      initial,
      limit,
      offset
    }
  })
}

// 搜索 /cloudsearch
// export const reqCloudSearch = (keywords, type, limit = 30, offset = 0) => request({ url: `/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`, method: 'GET' })
// http://localhost:3000/cloudsearch?keywords="海阔天空"
export const getCloudSearchAPI = function (keywords) {
  return request.get('/cloudsearch', {
    params: {
      keywords
    }
  })
}

// 搜索建议
// http://localhost:3000/search/suggest?keywords="Home"
export const getSearchSugAPI = function (keywords) {
  return request.get('/search/suggest', {
    params: {
      keywords
    }
  })
}
