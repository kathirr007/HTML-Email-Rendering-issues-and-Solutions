#!/bin/sh

GH_REPO="github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git"

FULL_REPO="https://$GH_TOKEN$GH_REPO"

# git config --global user.email "travis@travis-ci.org"
# git config --global user.name "Travis CI"

# git status
# git add .
# git status
# git commit -m "deployed to github pages"
# git remote add origin-pages https://${GH_TOKEN}@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git > /dev/null 2>&1
# git push --force --quiet https://${GH_TOKEN}@${GH_REPO} master
# git status


setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout -b gh-pages
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git status
}

upload_files() {
  git remote add origin-pages https://${GH_TOKEN}@{GH_REPO} > /dev/null 2>&1
  git push --quiet --set-upstream origin-pages gh-pages
}

setup_git
commit_website_files
upload_files



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
