// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Initialize Instagram Feed if container exists
    const instagramContainer = document.getElementById('instagram-feed-container');
    if (instagramContainer) {
        loadInstagramFeed();
    }
});

// Instagram Feed Integration
// Note: This is a placeholder implementation. For production, you'll need to:
// 1. Use Instagram Basic Display API with proper authentication
// 2. Or use a third-party service like Juicer, SnapWidget, or similar
// 3. Or embed Instagram's official widget

function loadInstagramFeed() {
    const feedContainer = document.querySelector('.instagram-grid');
    
    // OPTION 1: Using Instagram's official embed (recommended for simplicity)
    // You can get this code from instagram.com/embed
    // Just replace the placeholder with actual embed code
    
    // OPTION 2: Using Instagram Basic Display API (requires setup)
    // This would require OAuth, Access Token, etc.
    // Example implementation below is simplified
    
    // OPTION 3: Third-party widget (easiest for non-developers)
    // Services like SnapWidget, Juicer, or EmbedSocial provide simple embed codes
    
    // For this demo, we'll show how to structure it with placeholder data
    // In production, replace this with actual API calls or embed code
    
    const placeholderPosts = [
        {
            id: '1',
            image: 'https://via.placeholder.com/400x400/1a237e/ffffff?text=Training+Session',
            caption: 'Morning training session',
            permalink: '#'
        },
        {
            id: '2',
            image: 'https://via.placeholder.com/400x400/1a237e/ffffff?text=Technique+Practice',
            caption: 'Practicing irimi nage',
            permalink: '#'
        },
        {
            id: '3',
            image: 'https://via.placeholder.com/400x400/1a237e/ffffff?text=Seminar',
            caption: 'Special seminar with visiting sensei',
            permalink: '#'
        },
        {
            id: '4',
            image: 'https://via.placeholder.com/400x400/1a237e/ffffff?text=Kids+Class',
            caption: 'Youth aikido class',
            permalink: '#'
        },
        {
            id: '5',
            image: 'https://via.placeholder.com/400x400/1a237e/ffffff?text=Weapons+Training',
            caption: 'Bokken training',
            permalink: '#'
        },
        {
            id: '6',
            image: 'https://via.placeholder.com/400x400/1a237e/ffffff?text=Testing',
            caption: 'Promotion testing day',
            permalink: '#'
        }
    ];
    
    // Clear placeholder
    feedContainer.innerHTML = '';
    
    // Render posts
    placeholderPosts.forEach(post => {
        const postElement = createInstagramPost(post);
        feedContainer.appendChild(postElement);
    });
}

function createInstagramPost(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'instagram-post';
    
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.caption;
    img.loading = 'lazy';
    
    const link = document.createElement('a');
    link.href = post.permalink;
    link.target = '_blank';
    link.rel = 'noopener';
    link.appendChild(img);
    
    postDiv.appendChild(link);
    
    return postDiv;
}

// Smooth scroll for hero scroll indicator
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class (you can add this class to elements in HTML)
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


/* =========================================================================
   INSTAGRAM FEED INTEGRATION GUIDE
   =========================================================================
   
   To integrate a real Instagram feed, you have several options:
   
   OPTION 1: Instagram Basic Display API (Free, but requires technical setup)
   -------------------------------------------------------------------------
   1. Create a Facebook Developer account
   2. Create an App and add Instagram Basic Display product
   3. Generate a User Access Token
   4. Use the token to fetch media from the API endpoint:
      https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token={token}
   5. Replace the loadInstagramFeed() function with actual API calls
   
   Example fetch code:
   
   async function loadInstagramFeed() {
       const accessToken = 'YOUR_ACCESS_TOKEN';
       const userId = 'YOUR_USER_ID';
       const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`;
       
       try {
           const response = await fetch(url);
           const data = await response.json();
           const feedContainer = document.querySelector('.instagram-grid');
           feedContainer.innerHTML = '';
           
           data.data.slice(0, 6).forEach(post => {
               const postElement = createInstagramPost({
                   id: post.id,
                   image: post.media_url,
                   caption: post.caption || '',
                   permalink: post.permalink
               });
               feedContainer.appendChild(postElement);
           });
       } catch (error) {
           console.error('Error loading Instagram feed:', error);
       }
   }
   
   
   OPTION 2: Third-Party Embed Services (Easiest, may have costs)
   ---------------------------------------------------------------
   These services provide simple embed codes:
   
   - SnapWidget (https://snapwidget.com/) - Free tier available
   - Juicer (https://www.juicer.io/) - Free tier available
   - EmbedSocial (https://embedsocial.com/) - Paid
   - Behold (https://behold.so/) - Paid
   
   Steps:
   1. Sign up for the service
   2. Connect your Instagram account
   3. Customize the widget appearance
   4. Copy the embed code
   5. Replace the instagram-grid content with the embed code
   
   
   OPTION 3: Instagram Official Embed Widget (Simplest)
   -----------------------------------------------------
   1. Go to instagram.com
   2. Find a post you want to embed
   3. Click the "..." menu and select "Embed"
   4. Copy the embed code
   5. Add multiple embeds to your page
   
   For a feed-like display, you'd need multiple embed codes or use Option 1 or 2.
   
   
   RECOMMENDED FOR YOUR USE CASE:
   Since you want automatic updates from your public Instagram, I recommend
   either SnapWidget or Juicer (both have free tiers) or implementing the
   Instagram Basic Display API if you're comfortable with the technical setup.
   
   ======================================================================== */

// Gallery filter button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        // Hover effects
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '#E63946';
                this.style.borderColor = '#E63946';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = 'white';
                this.style.borderColor = 'white';
            }
        });
        
        // Click effects
        btn.addEventListener('click', function() {
            // Reset all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.color = 'white';
                b.style.borderColor = 'white';
            });
            
            // Set active button
            this.classList.add('active');
            this.style.color = '#E63946';
            this.style.borderColor = '#E63946';
        });
    });
});
