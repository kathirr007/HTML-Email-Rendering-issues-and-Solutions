#!/bin/bash

GH_REF="github.com/${TRAVIS_REPO_SLUG}"
GH_REPO="github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git"

FULL_REPO="https://$GH_TOKEN$GH_REPO"

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"


# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
# git clone https://${GH_TOKEN}@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git out
# cd out
# cd builds/development
# git init
# git config --global user.email "travis@travis-ci.org"
# git config --global user.name "Travis"
# git status
# git add .
# git status
# git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
# git status
# git push -ufq https://${GH_TOKEN}@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git master:gh-pages > /dev/null 2>&1

# git config --global user.email "travis@travis-ci.org"
# git config --global user.name "Travis CI"

# git status
# git add .
# git status
# git commit -m "deployed to github pages"
# git remote add origin-pages https://${GH_TOKEN}@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git > /dev/null 2>&1
# git push --force --quiet https://${GH_TOKEN}@${GH_REPO} master
# git status

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"
gulp deploy

# git status
# git add "./builds/development/**/*"
# git status
# git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
# git status

# git remote add origin https://${GH_TOKEN}@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git > /dev/null 2>&1
# git push -ufq https://${GH_TOKEN}@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git master:gh-pages


# #!/bin/bash
# rm -rf out || exit 0;
# mkdir out; 
# node build.js
# ( cd out
#  git init
#  git config user.name "Travis-CI"
#  git config user.email "kathirr007@gmail.com"
#  # cp ../CNAME ./CNAME
#  # cp ../countryiso.js ./countryiso.js
#  git add .
#  git commit -m "Deployed to Github Pages"
#  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
# )
