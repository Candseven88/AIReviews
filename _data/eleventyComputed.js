module.exports = {
  // 将日期格式化为ISO格式
  dateIso: (data) => {
    return data.date ? new Date(data.date).toISOString() : '';
  },
  
  // 将日期格式化为显示格式
  dateDisplay: (data) => {
    if (!data.date) return '';
    
    const date = new Date(data.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
  },
  
  // 为每篇文章生成永久链接
  permalink: (data) => {
    if (data.permalink) return data.permalink;
    
    // 如果是文章页面，生成永久链接
    if (data.layout === 'post.njk' && data.page.filePathStem.startsWith('/posts/')) {
      const pathArray = data.page.filePathStem.split('/');
      const fileName = pathArray[pathArray.length - 1];
      
      // 从文件名中提取日期和标题
      const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
      if (match) {
        const slug = match[2];
        return `/${data.page.filePathStem.split('/')[1]}/${slug}/index.html`;
      }
    }
    
    return data.page.filePathStem + '.html';
  }
}; 