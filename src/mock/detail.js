// 模拟详情数据
export const mockDetailData = (id) => {
  const dataMap = {
    1: {
      id: 1,
      title: '京剧艺术精粹',
      author: '国家京剧院',
      publishTime: '2024-03-01',
      cover: '/static/recommend/item1.jpg',
      content: `<p>京剧作为中国国粹，融合唱、念、做、打等多种表演形式...</p>
               <p>经典剧目《霸王别姬》展现了中国传统戏曲的独特魅力...</p>`,
      images: [
        '/static/recommend/item1.jpg'
      ]
    },
    2: {
      id: 2,
      title: '非遗剪纸技艺',
      author: '民间艺术协会',
      publishTime: '2024-02-10',
      cover: '/static/recommend/item2.jpg',
      content: `<p>中国传统剪纸艺术已有1500年历史，常见于节庆装饰...</p>
               <p>技法包含阴刻、阳刻、刺孔等，纹样寓意吉祥...</p>`,
      // images: [
      //   '/static/detail/img2-1.jpg',
      //   '/static/detail/img2-2.jpg'
      // ]
    },
    3: {
      id: 3,
      title: '中国茶道文化',
      author: '茶文化研究会',
      publishTime: '2024-01-25',
      cover: '/static/recommend/item3.jpg',
      content: `<p>茶道包含茶艺、茶德、茶礼、茶理等核心内涵...</p>
               <p>六大茶类冲泡各有讲究，体现天人合一哲学思想...</p>`,
      // images: [
      //   '/static/detail/img3-1.jpg',
      //   '/static/detail/img3-2.jpg'
      // ]
    }
  }
  return new Promise(resolve => {
    setTimeout(() => resolve(dataMap[id] || dataMap[1]), 500)
  })
} 