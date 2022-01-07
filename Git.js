const simpleGit = require("simple-git");
const git = simpleGit.default();
await git.checkout("test-branch");
const branch = await git.branch();

// logs "test-branch"
console.log(branch.current)
async function main() {
 try {
   const status = await git.status();

   if (!status.isClean()) {
     return;
    }

   await git.checkout("HOTFIX");
   await git.reset("hard", ["origin/HOTFIX"]);
   await git.pull();

   await git.checkout("STAGING");
   await git.reset("hard", ["origin/STAGING"]);
   await git.pull();

   await git.rebase(["HOTFIX"]);
   await git.push("origin", "STAGING", ["--force"]);
 } catch (error) {
   const status = await git.status();

  if (status.conflicted.length > 0) {
    return;
   }

    console.log(error);
   }
 }