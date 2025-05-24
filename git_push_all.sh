#!/bin/bash

# === CẤU HÌNH ===
REPO_NAME="myserver"
GITHUB_USERNAME="souncode"
REMOTE_URL="git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"

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
git remote add origin $REMOTE_URL

echo "☁️  Đang đẩy code lên GitHub..."
git push -u origin main

echo "✅ Đã push xong lên repo: $REPO_NAME"
