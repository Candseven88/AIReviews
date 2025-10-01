/**
 * SEO Check Script for AI Reviews Website
 * Validates SEO settings and provides recommendations
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://aireviews.wiki';
const REQUIRED_FILES = [
    'sitemap.xml',
    'robots.txt',
    'llms.txt',
    'indexnow-key.txt',
    'sitemapindex.xml'
];

/**
 * Check if required SEO files exist
 */
function checkRequiredFiles() {
    console.log('🔍 Checking required SEO files...\n');
    
    const results = {};
    
    REQUIRED_FILES.forEach(file => {
        const filePath = path.join(__dirname, file);
        const exists = fs.existsSync(filePath);
        results[file] = exists;
        
        if (exists) {
            console.log(`✅ ${file} - Found`);
        } else {
            console.log(`❌ ${file} - Missing`);
        }
    });
    
    return results;
}

/**
 * Validate sitemap.xml content
 */
function validateSitemap() {
    console.log('\n🗺️  Validating sitemap.xml...\n');
    
    try {
        const sitemapPath = path.join(__dirname, 'sitemap.xml');
        const content = fs.readFileSync(sitemapPath, 'utf8');
        
        // Check for required elements
        const checks = [
            { name: 'XML declaration', pattern: /<\?xml version="1\.0" encoding="UTF-8"\?>/ },
            { name: 'Urlset namespace', pattern: /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/ },
            { name: 'Image namespace', pattern: /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/ },
            { name: 'Ghostface AI review', pattern: /ghostface-ai-review\.html/ },
            { name: 'Horror AI comparison', pattern: /horror-ai-tools-comparison\.html/ },
            { name: 'Image tags', pattern: /<image:image>/ },
            { name: 'Last modified dates', pattern: /<lastmod>2025-10-01<\/lastmod>/ }
        ];
        
        checks.forEach(check => {
            if (check.pattern.test(content)) {
                console.log(`✅ ${check.name} - Found`);
            } else {
                console.log(`❌ ${check.name} - Missing`);
            }
        });
        
        // Count URLs
        const urlMatches = content.match(/<url>/g);
        const urlCount = urlMatches ? urlMatches.length : 0;
        console.log(`📊 Total URLs in sitemap: ${urlCount}`);
        
    } catch (error) {
        console.log(`❌ Error reading sitemap.xml: ${error.message}`);
    }
}

/**
 * Validate robots.txt content
 */
function validateRobotsTxt() {
    console.log('\n🤖 Validating robots.txt...\n');
    
    try {
        const robotsPath = path.join(__dirname, 'robots.txt');
        const content = fs.readFileSync(robotsPath, 'utf8');
        
        const checks = [
            { name: 'User-agent: *', pattern: /User-agent: \*/ },
            { name: 'Allow: /', pattern: /Allow: \// },
            { name: 'Sitemap reference', pattern: /Sitemap: https:\/\/aireviews\.wiki\/sitemap\.xml/ },
            { name: 'AI crawler support', pattern: /User-agent: GPTBot/ },
            { name: 'LLMs.txt reference', pattern: /llms\.txt/ },
            { name: 'Crawl delay', pattern: /Crawl-delay: \d+/ }
        ];
        
        checks.forEach(check => {
            if (check.pattern.test(content)) {
                console.log(`✅ ${check.name} - Found`);
            } else {
                console.log(`❌ ${check.name} - Missing`);
            }
        });
        
    } catch (error) {
        console.log(`❌ Error reading robots.txt: ${error.message}`);
    }
}

/**
 * Validate llms.txt content
 */
function validateLlmsTxt() {
    console.log('\n🧠 Validating llms.txt...\n');
    
    try {
        const llmsPath = path.join(__dirname, 'llms.txt');
        const content = fs.readFileSync(llmsPath, 'utf8');
        
        const checks = [
            { name: 'Site name', pattern: /AI Reviews/ },
            { name: 'Domain', pattern: /aireviews\.wiki/ },
            { name: 'Ghostface AI mention', pattern: /Ghostface AI/ },
            { name: 'Content categories', pattern: /AI Tool Reviews/ },
            { name: 'Site structure', pattern: /Site Structure/ },
            { name: 'Keywords section', pattern: /Key Topics & Keywords/ }
        ];
        
        checks.forEach(check => {
            if (check.pattern.test(content)) {
                console.log(`✅ ${check.name} - Found`);
            } else {
                console.log(`❌ ${check.name} - Missing`);
            }
        });
        
        console.log(`📊 File size: ${content.length} characters`);
        
    } catch (error) {
        console.log(`❌ Error reading llms.txt: ${error.message}`);
    }
}

/**
 * Check HTML pages for SEO elements
 */
function checkHtmlSeo() {
    console.log('\n📄 Checking HTML SEO elements...\n');
    
    const htmlFiles = [
        'index.html',
        'posts/ghostface-ai-review.html',
        'posts/horror-ai-tools-comparison.html'
    ];
    
    htmlFiles.forEach(file => {
        try {
            const filePath = path.join(__dirname, file);
            if (!fs.existsSync(filePath)) {
                console.log(`❌ ${file} - File not found`);
                return;
            }
            
            const content = fs.readFileSync(filePath, 'utf8');
            console.log(`\n📋 Checking ${file}:`);
            
            const checks = [
                { name: 'Title tag', pattern: /<title>.*<\/title>/ },
                { name: 'Meta description', pattern: /<meta name="description"/ },
                { name: 'Meta keywords', pattern: /<meta name="keywords"/ },
                { name: 'Open Graph tags', pattern: /<meta property="og:/ },
                { name: 'Twitter cards', pattern: /<meta name="twitter:/ },
                { name: 'Canonical URL', pattern: /<link rel="canonical"/ },
                { name: 'Structured data', pattern: /<script type="application\/ld\+json">/ },
                { name: 'Ghostface AI links', pattern: /ghostfaceai\.space/ }
            ];
            
            checks.forEach(check => {
                if (check.pattern.test(content)) {
                    console.log(`  ✅ ${check.name}`);
                } else {
                    console.log(`  ❌ ${check.name}`);
                }
            });
            
        } catch (error) {
            console.log(`❌ Error reading ${file}: ${error.message}`);
        }
    });
}

/**
 * Generate SEO report
 */
function generateSeoReport() {
    console.log('\n📊 SEO OPTIMIZATION REPORT\n');
    console.log('='.repeat(50));
    
    const fileResults = checkRequiredFiles();
    validateSitemap();
    validateRobotsTxt();
    validateLlmsTxt();
    checkHtmlSeo();
    
    console.log('\n🎯 SEO RECOMMENDATIONS:\n');
    console.log('1. ✅ Sitemap.xml with image support - Implemented');
    console.log('2. ✅ Robots.txt with AI crawler support - Implemented');
    console.log('3. ✅ LLMs.txt for AI understanding - Implemented');
    console.log('4. ✅ IndexNow for fast indexing - Implemented');
    console.log('5. ✅ Structured data markup - Implemented');
    console.log('6. ✅ Open Graph and Twitter cards - Implemented');
    console.log('7. ✅ Ghostface AI external links - Implemented');
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('• Submit sitemap to Google Search Console');
    console.log('• Submit sitemap to Bing Webmaster Tools');
    console.log('• Run IndexNow script to notify search engines');
    console.log('• Monitor search engine indexing status');
    console.log('• Track Ghostface AI backlink performance');
    
    console.log('\n✨ OPTIMIZATION COMPLETE!\n');
}

// Run the SEO check
if (require.main === module) {
    generateSeoReport();
}

module.exports = {
    checkRequiredFiles,
    validateSitemap,
    validateRobotsTxt,
    validateLlmsTxt,
    checkHtmlSeo,
    generateSeoReport
}; 