#!/bin/bash

# This script creates a GitHub repository under an organization and sets up a pull request

# Set organization and repo names
ORG_NAME="successivedigitalog"  # Corrected organization name
REPO_NAME="online-delivery"
BRANCH_NAME="main"
PR_BRANCH_NAME="feature/initial-setup"

echo "Enter your GitHub Personal Access Token with repo and org permissions:"
read -s TOKEN

# Create the repository in the organization
echo "Creating repository $ORG_NAME/$REPO_NAME..."
curl -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/orgs/$ORG_NAME/repos" \
  -d '{
    "name": "'"$REPO_NAME"'",
    "description": "Online Pizza Delivery Application",
    "private": false,
    "auto_init": false
  }'

# Check if repository was created successfully
if [ $? -eq 0 ]; then
    echo "Repository created successfully!"

    # Configure git remote
    git init
    git remote add origin "https://github.com/$ORG_NAME/$REPO_NAME.git"
    
    # Create and switch to a new branch for the PR
    git checkout -b "$PR_BRANCH_NAME"
    
    # Add all files
    git add .
    
    # Commit changes
    git commit -m "Initial commit for online pizza delivery application"
    
    # Set up git with token for push
    REMOTE_URL="https://$TOKEN@github.com/$ORG_NAME/$REPO_NAME.git"
    git remote set-url origin "$REMOTE_URL"
    
    # Push to the remote repository
    git push -u origin "$PR_BRANCH_NAME"
    
    # Create default branch on GitHub
    curl -X POST \
      -H "Authorization: token $TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/$ORG_NAME/$REPO_NAME/git/refs" \
      -d '{
        "ref": "refs/heads/'"$BRANCH_NAME"'",
        "sha": "'$(git rev-parse HEAD)'"
      }'
    
    # Create pull request
    curl -X POST \
      -H "Authorization: token $TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/$ORG_NAME/$REPO_NAME/pulls" \
      -d '{
        "title": "Initial setup for online delivery application",
        "body": "This PR contains the initial setup for the online pizza delivery application.",
        "head": "'"$PR_BRANCH_NAME"'",
        "base": "'"$BRANCH_NAME"'"
      }'
    
    echo "Pull request created successfully!"
else
    echo "Failed to create repository. Please check your token and organization name."
fi
