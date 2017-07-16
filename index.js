#! /usr/bin/env node

const userArgs = process.argv.slice(2);
const packageJson = require('package-json');
// console.log("This is the userArgs[0]: " + userArgs[0]);
// console.log("This is the userArgs[1]: " + userArgs[1]);
// console.log("This is the userArgs[2]: " + userArgs[3]);
/**
 * This needs work, currently the returned packages from 
 * packageJSON are sorted by publish date, getLatest will return
 * the latest published version, and not the highest numerical version 
 * for the given pattern
 */
exports.getLatest = function(desiredPackage, versions, prerelease){
	return packageJson(desiredPackage, {allVersions:true})
		.then((packages) => {
			var allVersions = Object.keys(packages.versions);
			var alphaVersions = [];
			for(var position in allVersions) {
				if(allVersions[position].includes(versions) && 
				   allVersions[position].includes(prerelease)){
					alphaVersions.push(allVersions[position]);
				}
			}
			if(alphaVersions.length > 1){
				return alphaVersions[alphaVersions.length-1]
			}
			return alphaVersions[0];
		}).catch((error) => {

			return "";
		});
}

// this.getLatest("crapexample", "1.0.0", "alpha")
// 	.then((result) => {
// 		console.log(result);
// 		return result;

// 	})
// 	.catch((error) => {
// 		return error;
// 	});

this.getLatest(userArgs[0], userArgs[1], userArgs[2])
	.then((result) => {
		console.log(result);
		return result;

	})
	.catch((error) => {
		return error;
	});