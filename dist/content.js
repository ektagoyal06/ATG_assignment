// content.js
function autoReactAndComment(likeCount, commentCount) {
  const genericComment = "CFBR";
  const likeButtons = Array.from(document.querySelectorAll('button[aria-label*="Like"], button[aria-label*="like"]'));
  const commentAreas = Array.from(document.querySelectorAll('div.comments-comment-box__editor, div.feed-shared-update-v2__comments-container'));

  const likedPosts = [];
  const commentedPosts = [];

  for (let i = 0; i < Math.min(likeCount, likeButtons.length); i++) {
    const btn = likeButtons[i];
    if (btn && !btn.classList.contains("reacted")) {
      btn.click();
      likedPosts.push(btn.closest("div.feed-shared-update-v2")?.querySelector("a[href*='/posts/']")?.href || "Unknown post");
      btn.classList.add("reacted");
    }
  }

  for (let i = 0; i < Math.min(commentCount, commentAreas.length); i++) {
    const area = commentAreas[i];
    if (area) {
      const input = area.querySelector("textarea");
      const submitBtn = area.querySelector("button");

      if (input && submitBtn) {
        input.value = genericComment;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        submitBtn.click();
        commentedPosts.push(area.closest("div.feed-shared-update-v2")?.querySelector("a[href*='/posts/']")?.href || "Unknown post");
      }
    }
  }

  console.log("✅ Liked posts:", likedPosts);
  console.log("✅ Commented posts:", commentedPosts);
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "reactAndComment") {
    autoReactAndComment(request.likeCount, request.commentCount);
    sendResponse({ status: "done" });
  }
});
