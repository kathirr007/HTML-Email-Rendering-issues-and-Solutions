#!/bin/bash

rm -rf out || exit 0;
mkdir out;

GH_REPO="@github.com/kathirr007/HTML-Email-Rendering-issues-and-Solutions.git"

FULL_REPO="https://$GH_TOKEN$GH_REPO"

# for files in '*.tar.gz'; do
#         tar xfz $files
# done

cd out
git init
git config user.email "kathirr007@gmail.com"
git config user.name "kathirr007"

# cp ../categoryCompare/inst/doc/categoryCompare_vignette.html index.html

git add .
git commit -m "deployed to github pages"
git push --force --quiet $FULL_REPO master:gh-pages

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