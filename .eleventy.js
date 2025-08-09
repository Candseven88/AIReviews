module.exports = function(eleventyConfig) {
  // 复制静态资源到输出目录
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  // Add date filters
  eleventyConfig.addFilter("dateIso", date => {
    return date.toISOString();
  });

  eleventyConfig.addFilter("dateDisplay", date => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // 设置输出目录
  return {
    // 允许通过环境变量覆盖路径前缀，便于 Pages 子路径部署
    pathPrefix: process.env.PATH_PREFIX || '/',
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    // 默认模板引擎为Liquid
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 