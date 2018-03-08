export default class Song{
	//duration 歌曲时长 以秒计算
	constructor ({id,mid,singer,name,album,duration,image,url}){
		this.id=id
		this.mid=mid
		this.singer=singer
		this.name=name
		this.album=album
		this.duration=duration
		this.image=image
		this.url=url
	}
}


export function creatSong(musicData){
	/*url  音乐器的播放源---待问（如何查找）https://thirdparty.gtimg.com/${musicdata.songid}.m4a?formtag=38*/
	return new Song({
		id: musicData.songid,
	    mid: musicData.songmid,
	    singer: filterSinger(musicData.singer),
	    name: musicData.songname,
	    album: musicData.albumname,
	    duration: musicData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${musicData.album}.jpg?max_age=2592000`,
		url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
	})
}


function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
