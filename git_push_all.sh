#!/bin/bash

# === CẤU HÌNH ===
REPO_NAME="myserver"
GITHUB_USERNAME="souncode"
REMOTE_URL="git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"
SSH_KEY_PATH="$HOME/.ssh/id_ed25519"  # Hoặc key khác nếu bạn đặt tên khác

# === KIỂM TRA SSH KEY ===
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "❌ Không tìm thấy SSH key tại: $SSH_KEY_PATH"
    echo "👉 Hãy tạo key bằng: ssh-keygen -t ed25519 -C \"youremail@example.com\""
    exit 1
fi

# === THÊM KEY VÀO SSH-AGENT (NẾU CẦN) ===
eval "$(ssh-agent -s)"
ssh-add "$SSH_KEY_PATH"

# === KIỂM TRA GIT ===
if [ ! -d ".git" ]; then
    echo "⚙️  Chưa có Git repo, đang khởi tạo..."
    git init
fi

# === GIT ADD, COMMIT, PUSH ===
echo "📦 Đang thêm toàn bộ file Flutter..."
git add .

echo "📝 Nhập nội dung commit:"
read COMMIT_MSG

git commit -m "$COMMIT_MSG"
git branch -M main || echo "Đã có branch main"
git remote remove origin 2> /dev/null
git remote add origin "$REMOTE_URL"

echo "☁️  Đang đẩy code lên GitHub..."
git push -u origin main

echo "✅ Đã push xong lên repo: $REPO_NAME"
