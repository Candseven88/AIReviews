/**
 * IndexNow Submission Script
 * Automatically notify search engines about content updates
 */

const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2';
const SITE_URL = 'https://aireviews.wiki';

// URLs to submit to IndexNow
const URLS_TO_SUBMIT = [
    `${SITE_URL}/`,
    `${SITE_URL}/posts/ghostface-ai-review.html`,
    `${SITE_URL}/posts/horror-ai-tools-comparison.html`,
    `${SITE_URL}/posts/chatgpt-review.html`,
    `${SITE_URL}/posts/claude-review.html`,
    `${SITE_URL}/posts/midjourney-review.html`,
    `${SITE_URL}/posts/ourdream-review.html`,
    `${SITE_URL}/posts/tripo-review.html`,
    `${SITE_URL}/posts/2025-08-09-chatgpt-vs-claude.html`,
    `${SITE_URL}/posts/2025-08-09-midjourney-vs-stable-diffusion.html`,
    `${SITE_URL}/posts/2025-08-09-best-ai-chatbots-2025.html`,
    `${SITE_URL}/posts/2025-08-10-best-pixel-art-tools.html`,
    `${SITE_URL}/posts/2025-08-09-baby-saja-ai.html`,
    `${SITE_URL}/posts/ai-photo-editor-comprehensive-guide.html`
];

// IndexNow endpoints
const INDEXNOW_ENDPOINTS = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
];

/**
 * Submit URLs to IndexNow
 */
async function submitToIndexNow() {
    const payload = {
        host: 'aireviews.wiki',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/indexnow-key.txt`,
        urlList: URLS_TO_SUBMIT
    };

    console.log('🚀 Starting IndexNow submission...');
    console.log(`📝 Submitting ${URLS_TO_SUBMIT.length} URLs`);

    for (const endpoint of INDEXNOW_ENDPOINTS) {
        try {
            console.log(`📡 Submitting to: ${endpoint}`);
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'AIReviews-IndexNow/1.0'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`✅ Successfully submitted to ${endpoint}`);
                console.log(`📊 Status: ${response.status}`);
            } else {
                console.log(`❌ Failed to submit to ${endpoint}`);
                console.log(`📊 Status: ${response.status}`);
                console.log(`📝 Response: ${await response.text()}`);
            }
        } catch (error) {
            console.error(`❌ Error submitting to ${endpoint}:`, error.message);
        }
    }

    console.log('🎉 IndexNow submission completed!');
}

/**
 * Submit individual URL (for new content)
 */
async function submitSingleUrl(url) {
    const payload = {
        host: 'aireviews.wiki',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/indexnow-key.txt`,
        urlList: [url]
    };

    console.log(`🚀 Submitting single URL: ${url}`);

    for (const endpoint of INDEXNOW_ENDPOINTS) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'AIReviews-IndexNow/1.0'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`✅ Successfully submitted ${url} to ${endpoint}`);
            }
        } catch (error) {
            console.error(`❌ Error submitting ${url} to ${endpoint}:`, error.message);
        }
    }
}

// Export functions for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitToIndexNow,
        submitSingleUrl,
        URLS_TO_SUBMIT,
        INDEXNOW_KEY
    };
}

// Auto-run if called directly
if (typeof window === 'undefined' && require.main === module) {
    submitToIndexNow();
} 